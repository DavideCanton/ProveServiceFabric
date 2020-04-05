import { ActionReducerMap, createReducer, createSelector, on } from '@ngrx/store';
import { Article } from 'app/article.service';
import { articlesLoaded, clearArticles, decrement, increment, reset } from 'app/comp1/comp1.component.actions';
import { setAreaInDay, clearAreaInDay, clearAreas } from 'app/comp2/comp2.component.actions';
import { chain, includes, mapValues, range, uniq, uniqWith, values } from 'lodash';

export interface DaysState
{
    [day: number]: string | null;
}

export interface State
{
    value: number;
    articles: Article[];
    days: DaysState;
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
    on(articlesLoaded, (state, { articles }) => uniqWith([...state, ...articles], (a, b) => a.id === b.id && a.userId === b.userId)),
    on(clearArticles, () => [])
);

const daysReducer = createReducer(
    {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null
    },
    on(setAreaInDay, (state, { day, area }) =>
    {
        if(!includes(range(1, 6), day)) throw new Error();

        const v = uniq(values(state));
        if(v.length > 1 || v[0] !== null)
            return ({ ...state, [day]: area });
        else
            return mapValues(state, () => area);
    }),
    on(clearAreaInDay, (state, { day }) => ({ ...state, [day]: null })),
    on(clearAreas, state => mapValues(state, () => null))
);

export const reducers: ActionReducerMap<State> = {
    value: valueReducer,
    articles: articlesReducer,
    days: daysReducer
};