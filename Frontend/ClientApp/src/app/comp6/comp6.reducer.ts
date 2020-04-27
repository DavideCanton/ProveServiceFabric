import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { addData, editData, pause, removeData, resume } from 'app/comp6/comp6.actions';
import { constant, find, remove } from 'lodash';
import { createMutableReducer, mutableOn } from 'ngrx-etc';

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


const dataReducer = createMutableReducer(
    [] as Data[],
    mutableOn(addData, (draftState, { start, end }) =>
    {
        const id = draftState.length + 1;
        draftState.push({ id, start, end });
    }),
    mutableOn(editData, (draftState, { id, start, end }) =>
    {
        const item = find(draftState, d => d.id === id);
        if(item)
        {
            item.start = start;
            item.end = end;
        }
    }),
    mutableOn(removeData, (draftState, { id }) => 
    {
        remove(draftState, i => i.id === id);
    })
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
