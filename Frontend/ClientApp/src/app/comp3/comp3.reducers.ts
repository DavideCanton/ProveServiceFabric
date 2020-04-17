import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { clearStore, downloadCompleted, downloadProgress, fillStore, startDownload } from 'app/comp3/comp3.actions';
import { findIndex } from 'lodash';

export const comp3FeatureKey = 'comp3';

export interface IStoreItem
{
    name: string;
    progress: number;
    src: string;
}

export interface Comp3State
{
    items: IStoreItem[];
    init: boolean;
}

const itemsReducer = createReducer(
    [] as IStoreItem[],
    on(fillStore, (_state, { items }) => [...items]),
    on(startDownload, (state, { name }) =>
    {
        const newState = [...state];
        newState.push({ name, progress: 0, src: '' });
        return newState;
    }),
    on(downloadProgress, (state, { name, progress }) =>
    {
        const newState = [...state];
        const index = findIndex(newState, i => i.name === name);
        if(index >= 0)
            newState[index] = { ...newState[index], progress };
        return newState;
    }),
    on(downloadCompleted, (state, { name , uri}) =>
    {
        const newState = [...state];
        const index = findIndex(newState, i => i.name === name);
        if(index >= 0)
            newState[index] = { ...newState[index], progress: 100, src: uri };
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
