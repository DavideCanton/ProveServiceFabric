import { ActionReducerMap, createReducer, createSelector, on, createFeatureSelector } from '@ngrx/store';
import { Article } from 'app/comp1/article.service';
import { articlesLoaded, clearArticles, decrement, increment, reset } from 'app/comp1/comp1.component.actions';
import { chain, uniqWith } from 'lodash';

export const comp1FeatureKey = 'comp1';

export const comp1FeatureSelector = createFeatureSelector<Comp1State>(comp1FeatureKey);

export interface Comp1State
{
    value: number;
    articles: Article[];
}

export const loadedUsers = createSelector(
    comp1FeatureSelector,
    (s: Comp1State) => chain(s.articles).map(b => b.userId).uniq().value()
);

const valueReducer = createReducer(
    0,
    on(increment, state => state + 1),
    on(decrement, state => state > 0 ? state - 1 : 0),
    on(reset, () => 0),
);

const articlesReducer = createReducer(
    [] as Article[],
    on(articlesLoaded, (state, { articles }) => uniqWith([...state, ...articles], (a, b) => a.id === b.id && a.userId === b.userId)),
    on(clearArticles, () => [])
);

export const reducers: ActionReducerMap<Comp1State> = {
    value: valueReducer,
    articles: articlesReducer,
};