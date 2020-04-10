import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { downloadCompleted, downloadProgress, startDownload } from 'app/comp3/comp3.actions';
import { combineLatest, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class Comp3Effects
{
    download$ = createEffect(() => this.actions$.pipe(
        ofType(startDownload),
        mergeMap(payload =>
        {
            return combineLatest(
                of(payload),
                this.http.get(payload.path, {
                    reportProgress: true,
                    observe: 'events',
                    responseType: 'blob'
                })
            );
        }),
        mergeMap(([payload, event]) =>
        {
            if (event.type === HttpEventType.DownloadProgress)
                return of(downloadProgress({ id: payload.id, progress: Math.round(event.loaded / event.total * 100) }));
            else if (event.type === HttpEventType.Response)
            {
                return new Observable<Action>(subscriber =>
                {
                    let content = '';
                    const reader = new FileReader();
                    reader.addEventListener('load', () =>
                    {
                        content = reader.result as string;
                        subscriber.next(downloadCompleted({ id: payload.id, content: content }));
                        subscriber.complete();
                    });
                    reader.readAsDataURL(event.body);
                });
            }
        })
    ));

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) { }
}
