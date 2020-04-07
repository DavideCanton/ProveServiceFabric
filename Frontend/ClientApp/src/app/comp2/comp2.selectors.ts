import { createFeatureSelector } from '@ngrx/store';
import { comp2FeatureKey, Comp2State } from 'app/comp2/comp2.reducers';

export const comp2FeatureSelector = createFeatureSelector<Comp2State>(comp2FeatureKey);
