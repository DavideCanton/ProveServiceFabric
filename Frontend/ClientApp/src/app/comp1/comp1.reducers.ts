import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { Article } from 'app/comp1/article.service';
import { articlesLoaded, clearArticles, decrement, increment, reset } from 'app/comp1/comp1.actions';
import { uniqWith } from 'lodash';

export const comp1FeatureKey = 'comp1';

export interface Comp1State
{
    value: number;
    articles: Article[];
}

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
