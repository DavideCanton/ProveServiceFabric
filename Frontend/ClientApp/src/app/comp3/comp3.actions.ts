import { createAction, props } from '@ngrx/store';


export const downloadProgress = createAction(
    '[Comp3] Download progress',
    props<{ id: number, progress: number }>()
);

export const downloadCompleted = createAction(
    '[Comp3] Download completed',
    props<{ id: number, content: string }>()
);

export const startDownload = createAction(
    '[Comp3] Start download',
    props<{ path: string, id: number }>()
);
