import { createAction, props } from '@ngrx/store';

import { Article } from './article.service';

export const increment = createAction(
    '[AppComponent] Increment'
);

export const decrement = createAction(
    '[AppComponent] Decrement'
);

export const reset = createAction(
    '[AppComponent] Reset'
);

export const loadArticle = createAction(
    '[AppComponent] Load Article',
    props<{ id?: number, userId: number }>()
);

export const articlesLoaded = createAction(
    '[Effect] Articles Loaded',
    props<{ articles: Article[] }>()
);