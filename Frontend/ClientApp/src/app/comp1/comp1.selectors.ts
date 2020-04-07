import { createFeatureSelector, createSelector } from '@ngrx/store';
import { comp1FeatureKey, Comp1State } from 'app/comp1/comp1.reducers';
import { chain } from 'lodash';

export const comp1FeatureSelector = createFeatureSelector<Comp1State>(comp1FeatureKey);

export const loadedUsers = createSelector(
    comp1FeatureSelector,
    (s: Comp1State) => chain(s.articles).map(b => b.userId).uniq().orderBy().value()
);
