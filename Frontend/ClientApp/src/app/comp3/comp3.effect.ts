import { HttpClient, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import
{
    clearStore,
    downloadCompleted,
    downloadProgress,
    fillStore,
    initEffect,
    requestedDownload,
    startDownload,
    storeCleared
} from 'app/comp3/comp3.actions';
import { existFileSelector, filesSelector } from 'app/comp3/comp3.selectors';
import { FileCacheService } from 'app/comp3/db/file-cache.service';
import { Item, ItemNoId } from 'app/comp3/db/interfaces';
import { State } from 'app/reducers';
import { second } from 'app/utils';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class Comp3Effects implements OnInitEffects
{

    init$ = createEffect(() => this.actions$.pipe(
        ofType(initEffect),
        exhaustMap(() => this.dbService.getAll()),
        map(items => fillStore({
            items: items.map(i => ({
                name: i.name,
                progress: 100,
                src: URL.createObjectURL(i.blob)
            }))
        })),
        catchError(() => of(fillStore({ items: [] })))
    ));
    clear$ = createEffect(() => this.actions$.pipe(
        ofType(clearStore),
        withLatestFrom(this.store.pipe(select(filesSelector))),
        tap(([_unused, items]) => items.forEach(i => URL.revokeObjectURL(i.src))),
        concatMap(() => this.dbService.clear()),
        map(() => storeCleared())
    ));
    requestedDownload$ = createEffect(() => this.actions$.pipe(
        ofType(requestedDownload),
        mergeMap(({ name, url }) => this.insertOrStop(name).pipe(map(item => ({ name: item.name, url })))),
        map(p => startDownload(p))
    ));
    startDownload$ = createEffect(() => this.actions$.pipe(
        ofType(startDownload),
        mergeMap(({ name, url }) => this.startDownload(name, url))
    ));

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<State>,
        private dbService: FileCacheService
    )
    {
    }

    private static emitProgress(name: string, event: HttpProgressEvent): Observable<Action>
    {
        return of(downloadProgress({
            name,
            progress: Math.round(event.loaded / event.total! * 100)
        }));
    }

    private convertFile(name: string, event: HttpResponse<Blob>): Observable<Action>
    {
        return this.dbService.getFileById(name).pipe(
            filter(item => !!item),
            mergeMap((item: Item) =>
            {
                const newItem = { ...item, blob: event.body || undefined };
                return this.dbService.update(newItem);
            }),
            map(() =>
            {
                return downloadCompleted({ name, uri: URL.createObjectURL(event.body) });
            })
        );
    }

    ngrxOnInitEffects(): Action
    {
        return initEffect();
    }

    private insertOrStop(name: string): Observable<Item>
    {
        const item: ItemNoId = { name };

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
                    return this.dbService.insert(item);
            }));
    }

    private startDownload(name: string, url: string): Observable<Action>
    {
        return this.http.get(url, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob'
        }).pipe(
            filter(event => event.type === HttpEventType.DownloadProgress || event.type === HttpEventType.Response),
            mergeMap(event =>
            {
                if(event.type === HttpEventType.DownloadProgress)
                    return Comp3Effects.emitProgress(name, event);
                else if(event.type === HttpEventType.Response)
                    return this.convertFile(name, event);
                else
                    return EMPTY;
            })
        );
    }
}
