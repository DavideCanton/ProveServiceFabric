import { HttpClient, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { clearStore, downloadCompleted, downloadProgress, fillStore, initEffect, requestedDownload, startDownload, storeCleared } from 'app/comp3/comp3.actions';
import { existFileSelector } from 'app/comp3/comp3.selectors';
import { FileCacheService } from 'app/comp3/db/file-cache.service';
import { Item } from 'app/comp3/db/interfaces';
import { State } from 'app/reducers';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { second, readFile } from 'app/utils';

@Injectable()
export class Comp3Effects implements OnInitEffects
{

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<State>,
        private dbService: FileCacheService
    ) { }

    init$ = createEffect(() => this.actions$.pipe(
        ofType(initEffect),
        exhaustMap(() => this.dbService.getAll()),
        map(items => fillStore({ items })),
        catchError(() => of(fillStore({ items: [] })))
    ));

    clear$ = createEffect(() => this.actions$.pipe(
        ofType(clearStore),
        concatMap(() => this.dbService.clear()),
        map(() => storeCleared())
    ));

    requestedDownload$ = createEffect(() => this.actions$.pipe(
        ofType(requestedDownload),
        mergeMap(({ name, url }) => this.insertOrStop(name, url)),
        map(item => startDownload({ item }))
    ));

    startDownload$ = createEffect(() => this.actions$.pipe(
        ofType(startDownload),
        mergeMap(({ item }) => this.startDownload(item))
    ));

    store$ = createEffect(() => this.actions$.pipe(
        ofType(downloadCompleted),
        mergeMap(({ id, content }) =>
        {
            return this.dbService.getFileById(id).pipe(
                mergeMap(item =>
                {
                    const newItem = { ...item, src: content, progress: 100 };
                    return this.dbService.update(newItem);
                })
            );
        })), { dispatch: false });

    private static emitProgress(item: Item, event: HttpProgressEvent): Observable<Action>
    {
        return of(downloadProgress({ id: item.id, progress: Math.round(event.loaded / event.total * 100) }));
    }

    ngrxOnInitEffects(): Action
    {
        return initEffect();
    }

    private insertOrStop(name: string, url: string): Observable<Item>
    {
        return of(name).pipe(
            withLatestFrom(
                this.store.select(existFileSelector, { name }),
                second
            ),
            mergeMap(exists =>
            {
                if(exists)
                    return EMPTY;
                else
                  return this.dbService.insert({
                      name,
                      path: url,
                      progress: 0,
                      src: ''
                  });
            }));
    }

    private startDownload(item: Item): Observable<Action>
    {
        return this.http.get(item.path, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob'
        }).pipe(
          filter(event => event.type === HttpEventType.DownloadProgress || event.type === HttpEventType.Response),
          mergeMap(event =>
          {
              if(event.type === HttpEventType.DownloadProgress)
                  return Comp3Effects.emitProgress(item, event);
              else if(event.type === HttpEventType.Response)
                  return this.convertFile(item, event);
          })
        );
    }

    private convertFile(item: Item, event: HttpResponse<Blob>): Observable<Action>
    {
        return readFile(event.body, (r, b) => r.readAsDataURL(b)).pipe(
            map((content: string) => downloadCompleted({ id: item.id, content }))
        );
    }
}
