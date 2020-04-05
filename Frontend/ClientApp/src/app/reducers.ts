import { ActionReducerMap, createReducer, createSelector, on } from '@ngrx/store';
import { chain, uniqWith } from 'lodash';
import { Article } from 'src/app/article.service';
import { articlesLoaded, decrement, increment, reset } from 'src/app/app.component.actions';

export interface State
{
    value: number;
    articles: Article[];
}

export const loadedUsers = createSelector(
    (s: State) => s.articles,
    a => chain(a).map(a => a.userId).uniq().value()
);

const valueReducer = createReducer(
    0,
    on(increment, state => state + 1),
    on(decrement, state => state > 0 ? state - 1 : 0),
    on(reset, () => 0),
);

const articlesReducer = createReducer(
    [] as Article[],
    on(articlesLoaded, (state, { articles }) => uniqWith([...state, ...articles], (a, b) => a.id === b.id && a.userId === b.userId))
);

export const reducers: ActionReducerMap<State> = {
    value: valueReducer,
    articles: articlesReducer
};