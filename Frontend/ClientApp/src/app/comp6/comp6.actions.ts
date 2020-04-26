import { createAction, props } from '@ngrx/store';


export const resume = createAction(
    'Resume'
);

export const pause = createAction(
    'Pause'
);


export const addData = createAction(
    'Add action',
    props<{ start: string, end: string }>()
);

export const removeData = createAction(
    'Remove action',
    props<{ id: number }>()
);

export const editData = createAction(
    'Edit action',
    props<{ id: number, start: string, end: string }>()
);
