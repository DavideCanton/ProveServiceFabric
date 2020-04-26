import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { addData, pause, resume } from 'app/comp6/comp6.actions';
import { Comp6State, Data } from 'app/comp6/comp6.reducer';
import { countsSelector, dataSelector, isRunningSelector } from 'app/comp6/comp6.selectors';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
    selector: 'app-comp6',
    templateUrl: './comp6.component.html',
    styleUrls: ['./comp6.component.css']
})
export class Comp6Component implements OnInit
{
    grp: FormGroup;

    data$: Observable<Data[]>;
    counts$: Observable<{ [i: number]: number; }>;

    sub: Subscription | null = null;
    max$: Observable<number>;
    keys$: Observable<number[]>;
    running$: Observable<boolean>;

    constructor(
        private store: Store<Comp6State>,
        private fb: FormBuilder
    )
    {
        this.data$ = store.pipe(select(dataSelector));
        this.counts$ = store.pipe(select(countsSelector));
        this.max$ = this.counts$.pipe(
            map(counts => _.max(_.values(counts)) || 1)
        );
        this.keys$ = this.counts$.pipe(
            map(counts =>
                _(counts)
                    .keys()
                    .map(_.toInteger)
                    .orderBy()
                    .value()
            )
        );
        this.running$ = store.pipe(select(isRunningSelector));
    }

    ngOnInit(): void
    {
        this.grp = this.fb.group({
            start: [new Date, Validators.required],
            end: [0, Validators.required],
        }, {
            validators: [
                grp =>
                {
                    const { start, end } = grp.value;
                    return start > 0 && end > start ? null : { inv: '' };
                }
            ]
        });

        this.toggle();
    }

    toggle()
    {
        this.running$.pipe(take(1)).subscribe(isRunning =>
        {
            if(isRunning)
                this.store.dispatch(pause());
            else
                this.store.dispatch(resume());
        });
    }

    getPercent(value: number, max: number): number
    {
        return Math.round(value / max * 100);
    }

    add()
    {
        const { start, end } = this.grp.value;
        this.store.dispatch(addData({
            start: (start as Date).toISOString(),
            end: (end as Date).toISOString()
        }));
    }
}
