import { createAction, props } from '@ngrx/store';

export const setAreaInDay = createAction(
    '[Comp2] Set Area In Day',
    props<{ day: number, area: string }>()
);

export const clearAreaInDay = createAction(
    '[Comp2] Clear Area In Day',
    props<{ day: number }>()
);

export const clearAreas = createAction(
    '[Comp2] Clear Areas'
);