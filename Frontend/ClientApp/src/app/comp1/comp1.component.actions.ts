import { createAction, props } from '@ngrx/store';

import { Article } from 'app/article.service';

export const increment = createAction(
    '[Comp1] Increment'
);

export const decrement = createAction(
    '[Comp1] Decrement'
);

export const reset = createAction(
    '[Comp1] Reset'
);

export const loadArticle = createAction(
    '[Comp1] Load Article',
    props<{ id?: number, userId: number }>()
);

export const clearArticles = createAction(
    '[Comp1] Clear Articles'
);

export const articlesLoaded = createAction(
    '[Effect] Articles Loaded',
    props<{ articles: Article[] }>()
);