import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { clearStore, downloadCompleted, downloadProgress, fillStore, startDownload } from 'app/comp3/comp3.actions';
import { Item } from 'app/comp3/db/interfaces';
import { findIndex } from 'lodash';

export const comp3FeatureKey = 'comp3';

export interface Comp3State
{
    items: Item[];
    init: boolean;
}

const itemsReducer = createReducer(
    [] as Item[],
    on(fillStore, (_state, { items }) =>
    {
        return [...items];
    }),
    on(startDownload, (state, { item }) =>
    {
        const newState = [...state];
        newState.push(item);
        return newState;
    }),
    on(downloadProgress, (state, { id, progress }) =>
    {
        const newState = [...state];
        const index = findIndex(newState, i => i.id === id);
        if(index >= 0)
            newState[index] = { ...newState[index], progress };
        return newState;
    }),
    on(downloadCompleted, (state, { id, content }) =>
    {
        const newState = [...state];
        const index = findIndex(newState, i => i.id === id);
        if(index >= 0)
            newState[index] = { ...newState[index], src: content, progress: 100 };
        return newState;
    }),
    on(clearStore, (_state) => [])
);

export const initReducer = createReducer(
    false,
    on(fillStore, (_state) => true)
);

export const reducers: ActionReducerMap<Comp3State> = {
    items: itemsReducer,
    init: initReducer
};
