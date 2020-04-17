import { createAction, props } from '@ngrx/store';
import { IStoreItem } from 'app/comp3/comp3.reducers';

export const initEffect = createAction(
    '[Init] Init effect'
);

export const clearStore = createAction(
    '[Comp3] Clear store'
);

export const storeCleared = createAction(
    '[Effect] Store cleared'
);

export const fillStore = createAction(
    '[Init] Load data from db',
    props<{ items: IStoreItem[] }>()
);

export const downloadProgress = createAction(
    '[Effect] Download progress',
    props<{ name: string, progress: number }>()
);

export const downloadCompleted = createAction(
    '[Effect] Download completed',
    props<{ name: string, blob: Blob, uri: string }>()
);

export const requestedDownload = createAction(
    '[Comp3] Requested download',
    props<{ url: string, name: string }>()
);

export const startDownload = createAction(
    '[Effect] Start download',
    props<{ name: string, url: string }>()
);
