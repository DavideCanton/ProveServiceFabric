import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { clearStore, downloadCompleted, downloadProgress, fillStore, startDownload } from 'app/comp3/comp3.actions';
import { findIndex, find, constant } from 'lodash';
import { produce } from 'immer';

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
    on(startDownload, (state, { name }) => produce(state, draftState =>
    {
        draftState.push({ name, progress: 0, src: '' });
    })),
    on(downloadProgress, (state, { name, progress }) => produce(state, draftState =>
    {
        const item = find(draftState, i => i.name === name);
        if(item)
            item.progress = progress;
    })),
    on(downloadCompleted, (state, { name, uri }) => produce(state, draftState =>
    {
        const item = find(draftState, i => i.name === name);
        if(item)
        {
            item.progress = 100;
            item.src = uri;
        }
    })),
    on(clearStore, constant([]))
);

export const initReducer = createReducer(
    false,
    on(fillStore, constant(true))
);

export const reducers: ActionReducerMap<Comp3State> = {
    items: itemsReducer,
    init: initReducer
};
