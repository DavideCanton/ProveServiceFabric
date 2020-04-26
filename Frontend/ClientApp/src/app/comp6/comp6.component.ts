import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Comp6State, Data } from 'app/comp6/comp6.reducer';
import { dataSelector, countsSelector } from 'app/comp6/comp6.selectors';
import { Observable, interval, Subscription, identity } from 'rxjs';
import { addData } from 'app/comp6/comp6.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as moment from 'moment';

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

        this.start();
    }

    start()
    {
        this.end();
        this.sub = interval(100).subscribe(() =>
        {
            const startN = Math.floor(Math.random() * 400 + 1);
            const endN = Math.floor(Math.random() * 400 + 1);
            const start = moment().add(startN, 'days');
            const end = moment().add(endN, 'days');
            if(start.isBefore(end))
            {
                this.grp.patchValue({
                    start: start.toDate(),
                    end: end.toDate()
                });
                this.add();
            }
        });
    }

    end()
    {
        this.sub?.unsubscribe();
        this.sub = null;
    }

    getPercent(value: number, max: number): number
    {
        return Math.round(value / max * 100);
    }

    get isRunning(): boolean
    {
        return !!this.sub;
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
