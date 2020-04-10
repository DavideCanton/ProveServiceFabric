import { createFeatureSelector, createSelector } from '@ngrx/store';
import { comp3FeatureKey, Comp3State } from 'app/comp3/comp3.reducers';

export const comp3Selector = createFeatureSelector<Comp3State>(comp3FeatureKey);

export const filesSelector = createSelector(
    comp3Selector,
    state => state.items
);
