import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ArticleService } from 'app/comp1/article.service';
import { articlesLoaded, loadArticle } from 'app/comp1/comp1.actions';
import { loadedUsers } from 'app/comp1/comp1.selectors';
import { State } from 'app/reducers';
import { includes } from 'lodash';
import { EMPTY } from 'rxjs';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class ArticlesEffects
{
    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(loadArticle),
        withLatestFrom(this.store.select(loadedUsers)),
        filter(([a, users]) => !includes(users, a.userId)),
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
