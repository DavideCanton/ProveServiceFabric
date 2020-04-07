import { ActionReducerMap, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { clearAreaInDay, clearAreas, setAreaInDay } from 'app/comp2/comp2.component.actions';
import { includes, mapValues, range, uniq, values } from 'lodash';

export const comp2FeatureKey = 'comp2';

export const comp2FeatureSelector = createFeatureSelector<Comp2State>(comp2FeatureKey);

export interface DaysState
{
    [day: number]: string | null;
}

export interface Comp2State
{
    days: DaysState;
}

const daysReducer = createReducer(
    {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null
    },
    on(setAreaInDay, (state, { day, area }) =>
    {
        if (!includes(range(1, 6), day)) throw new Error();

        const v = uniq(values(state));
        if (v.length > 1 || v[0] !== null)
            return ({ ...state, [day]: area });
        else
            return mapValues(state, () => area);
    }),
    on(clearAreaInDay, (state, { day }) => ({ ...state, [day]: null })),
    on(clearAreas, state => mapValues(state, () => null))
);

export const reducers: ActionReducerMap<Comp2State> = {
    days: daysReducer,
};
