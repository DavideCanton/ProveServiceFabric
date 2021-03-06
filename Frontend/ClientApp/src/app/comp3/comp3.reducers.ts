import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { clearStore, downloadCompleted, downloadProgress, fillStore, startDownload } from 'app/comp3/comp3.actions';
import { constant, find } from 'lodash';
import { createMutableReducer, mutableOn } from 'ngrx-etc';

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

const itemsReducer = createMutableReducer(
    [] as IStoreItem[],
    on(fillStore, (_state, { items }) => [...items]),
    mutableOn(startDownload, (draftState, { name }) =>
    {
        draftState.push({ name, progress: 0, src: '' });
    }),
    mutableOn(downloadProgress, (draftState, { name, progress }) =>
    {
        const item = find(draftState, i => i.name === name);
        if(item)
            item.progress = progress;
    }),
    mutableOn(downloadCompleted, (draftState, { name, uri }) =>
    {
        const item = find(draftState, i => i.name === name);
        if(item)
        {
            item.progress = 100;
            item.src = uri;
        }
    }),
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
