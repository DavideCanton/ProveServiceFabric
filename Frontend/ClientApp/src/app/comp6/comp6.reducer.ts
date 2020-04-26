import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { addData, editData, removeData, pause, resume } from 'app/comp6/comp6.actions';
import { constant } from 'lodash';

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
    on(addData, (state, { start, end }) =>
    {
        const id = state.length + 1;
        return [
            ...state,
            { id, start, end }
        ];
    }),
    on(editData, (state, { id, start, end }) =>
    {
        const index = state.findIndex(d => d.id === id);
        if(index >= 0)
        {
            const newState = [...state];
            newState[index] = { id, start, end };
            return newState;
        }
        else
            return [...state];
    }),
    on(removeData, (state, { id }) =>
    {
        const index = state.findIndex(d => d.id === id);
        if(index >= 0)
            return [...state].splice(index, 1);
        else
            return [...state];
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
