import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { clearAreaInDay, clearAreas, setAreaInDay } from 'app/comp2/comp2.component.actions';
import { produce, produceWithPatches } from 'immer';
import { constant, includes, mapValues, range, uniq, values } from 'lodash';

export const comp2FeatureKey = 'comp2';

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
    } as DaysState,
    on(setAreaInDay, (state, { day, area }) => produce(state, draftState =>
    {
        if(!includes(range(1, 6), day))
            throw new Error();
        const areasAlreadyPresent = uniq(values(draftState));
        const daysToUpdate = new Array<number>();
        if(areasAlreadyPresent.length > 1 || areasAlreadyPresent[0] !== null)
            daysToUpdate.push(day);
        else
            daysToUpdate.push(1, 2, 3, 4, 5);
        daysToUpdate.forEach(d => draftState[d] = area);
    })),
    on(clearAreaInDay, (state, { day }) => produce(state, draftState =>
    {
        draftState[day] = null;
    })),
    on(clearAreas, state => mapValues(state, constant(null)))
);

export const reducers: ActionReducerMap<Comp2State> = {
    days: daysReducer,
};
