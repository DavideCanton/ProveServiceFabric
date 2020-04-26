import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { addData, editData, removeData } from 'app/comp6/comp6.actions';

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

export const reducers: ActionReducerMap<Comp6State> = {
    data: dataReducer
};
