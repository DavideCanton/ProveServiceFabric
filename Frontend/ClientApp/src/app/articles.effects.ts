import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { includes } from 'lodash';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ArticleService } from 'app/article.service';
import { loadedUsers, State } from 'app/reducers';

import { articlesLoaded, loadArticle } from 'app/comp1/comp1.component.actions';

@Injectable()
export class ArticlesEffects
{

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(loadArticle.type),
        withLatestFrom<{ userId: number, id: number }, Observable<number[]>>(this.store.select(loadedUsers)),
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
    )
    );

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private svc: ArticleService
    ) { }

}
