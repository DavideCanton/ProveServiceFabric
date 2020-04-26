import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addData, pause, resume } from 'app/comp6/comp6.actions';
import * as moment from 'moment';
import { EMPTY, interval, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class Comp6Effects
{

    add$ = createEffect(() => this.actions$.pipe(
        ofType(
            pause,
            resume
        ),
        switchMap(action =>
        {
            if(action.type === pause.type)
                return EMPTY;
            else
                return interval(100);
        }),
        switchMap(() =>
        {
            const startN = Math.floor(Math.random() * 400 + 1);
            const endN = Math.floor(Math.random() * 400 + 1);
            const start = moment().add(startN, 'days');
            const end = moment().add(endN, 'days');

            if(start.isBefore(end))
            {
                return of(addData({
                    start: start.toISOString(),
                    end: end.toISOString()
                }));
            }
            else
                return EMPTY;
        })
    ));

    constructor(private actions$: Actions) { }

}
