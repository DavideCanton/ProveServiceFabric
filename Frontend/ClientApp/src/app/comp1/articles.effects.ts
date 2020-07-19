import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ArticleService } from 'app/comp1/article.service';
import { articlesLoaded, loadArticle } from 'app/comp1/comp1.actions';
import { State } from 'app/reducers';
import { includes, has } from 'lodash';
import { EMPTY } from 'rxjs';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { loadedArticles } from 'app/comp1/comp1.selectors';

@Injectable()
export class ArticlesEffects
{
    loadArticles$ = createEffect(() => this.actions$.pipe(
        ofType(loadArticle),
        withLatestFrom(this.store.select(loadedArticles)),
        filter(([a, cache]) => !has(a, 'id') || !has(cache, a.userId) || !includes(cache[a.userId], a.id)),
        map(([a, _u]) => a),
        mergeMap(({ userId, id }) =>
        {
            return this.svc.loadArticle(userId, id)
                .pipe(
                    map(articles => articlesLoaded({ articles })),
                    catchError(() => EMPTY)
                );
        })
    ));

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private svc: ArticleService
    ) { }

}
