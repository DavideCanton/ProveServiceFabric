import { createFeatureSelector, createSelector } from '@ngrx/store';
import { comp3FeatureKey, Comp3State } from 'app/comp3/comp3.reducers';
import { map, some } from 'lodash';

export const comp3Selector = createFeatureSelector<Comp3State>(comp3FeatureKey);

export const filesSelector = createSelector(
    comp3Selector,
    state => state.items
);

export const existFileSelector = createSelector(
    comp3Selector,
    (state: Comp3State, props: { name: string }) => some(state.items, item => item.name === props.name && item.progress === 100)
);

export const initStore = createSelector(
    comp3Selector,
    state => state.init
);
