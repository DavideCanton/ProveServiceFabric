import { Component } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { clearAreaInDay, clearAreas, setAreaInDay } from 'app/comp2/comp2.component.actions';
import { Comp2State } from 'app/comp2/comp2.reducers';
import { comp2FeatureSelector } from 'app/comp2/comp2.selectors';
import { State } from 'app/reducers';
import { Observable } from 'rxjs';

export const daySelector = createSelector(
    comp2FeatureSelector,
    (state: Comp2State, props: { day: number }) => state.days[props.day]
);

@Component({
    templateUrl: './comp2.component.html',
    styleUrls: ['./comp2.component.css']
})
export class Comp2Component
{
    dayName = [
        'Lunedì',
        'Martedì',
        'Mercoledì',
        'Giovedì',
        'Venerdì',
    ];
    selectors$: Observable<string>[];

    constructor(private store: Store<State>)
    {
        this.selectors$ = [1, 2, 3, 4, 5].map(day => this.store.pipe(select(daySelector, { day })));
    }

    reset(index: number)
    {
        this.store.dispatch(clearAreaInDay({ day: index + 1 }));
    }

    resetAll()
    {
        this.store.dispatch(clearAreas());
    }

    dropped({ data }, index: number)
    {
        this.store.dispatch(setAreaInDay({
            area: data,
            day: index + 1
        }));
    }
}
