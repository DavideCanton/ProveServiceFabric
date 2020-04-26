import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { addData, editData, pause, removeData, resume } from 'app/comp6/comp6.actions';
import { produce } from 'immer';
import { constant, find, remove } from 'lodash';

export const comp6FeatureKey = 'comp6';

export interface Data
{
    id: number;
    start: string;
    end: string;
}

export interface Comp6State
{
    data: Data[];
    running: boolean;
}

const dataReducer = createReducer(
    [] as Data[],
    on(addData, (state, { start, end }) => produce(state, draftState =>
    {
        const id = draftState.length + 1;
        draftState.push({ id, start, end });
    })),
    on(editData, (state, { id, start, end }) => produce(state, draftState =>
    {
        const item = find(draftState, d => d.id === id);
        if(item)
        {
            item.start = start;
            item.end = end;
        }
    })),
    on(removeData, (state, { id }) => produce(state, draftState =>
    {
        remove(draftState, i => i.id === id);
    }))
);

const runningReducer = createReducer(
    false,
    on(pause, constant(false)),
    on(resume, constant(true)),
);

export const reducers: ActionReducerMap<Comp6State> = {
    data: dataReducer,
    running: runningReducer
};
