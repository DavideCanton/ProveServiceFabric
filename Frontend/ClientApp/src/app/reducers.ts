import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface State
{
    router: RouterReducerState<any>;
}

export const selectRouter = createFeatureSelector<State, RouterReducerState<any>>('router');

export const reducers: ActionReducerMap<State> = {
    router: routerReducer
};
