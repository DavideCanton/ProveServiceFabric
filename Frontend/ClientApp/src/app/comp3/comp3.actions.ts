import { createAction, props } from '@ngrx/store';
import { Item } from 'app/comp3/db/interfaces';

export const initEffect = createAction(
    '[Init] Init effect'
);

export const clearStore = createAction(
    '[Comp3] Clear store'
);

export const storeCleared = createAction(
    '[Comp3] Store cleared'
);

export const fillStore = createAction(
    '[Init] Load data from db',
    props<{ items: Item[] }>()
);

export const downloadProgress = createAction(
    '[Comp3] Download progress',
    props<{ id: number, progress: number }>()
);

export const downloadCompleted = createAction(
    '[Comp3] Download completed',
    props<{ id: number, content: string }>()
);

export const requestedDownload = createAction(
    '[Comp3] Requested download',
    props<{ url: string, name: string }>()
);

export const startDownload = createAction(
    '[Comp3] Start download',
    props<{ item: Item }>()
);
