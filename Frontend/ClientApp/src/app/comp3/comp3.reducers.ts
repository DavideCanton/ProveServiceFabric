import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { downloadProgress, downloadCompleted } from 'app/comp3/comp3.actions';
import { Item } from 'app/comp3/db/interfaces';
import { findIndex } from 'lodash';

export const comp3FeatureKey = 'comp3';

export interface Comp3State
{
    items: Item[];
}

const itemsReducer = createReducer(
    [] as Item[],
    on(downloadProgress, (state, { id, progress }) =>
    {
        const newState = [...state];
        const index = findIndex(newState, i => i.id === id);
        newState[index] = { ...newState[index], progress };
        return newState;
    }),
    on(downloadCompleted, (state, { id, content }) =>
    {
        const newState = [...state];
        const index = findIndex(newState, i => i.id === id);
        newState[index] = { ...newState[index], src: content };
        return newState;
    }),
);

export const reducers: ActionReducerMap<Comp3State> = {
    items: itemsReducer,
};
