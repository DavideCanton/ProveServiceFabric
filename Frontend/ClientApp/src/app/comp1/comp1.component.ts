import { Component } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { identity } from 'lodash';
import { Observable } from 'rxjs';
import { Article } from 'app/article.service';
import { decrement, increment, loadArticle, reset, clearArticles } from 'app/comp1/comp1.component.actions';
import { State } from 'app/reducers';

export const valueCount = createSelector(
    (state: State) => state.value,
    identity
);

export const articleSelect = createSelector(
    (state: State) => state.articles,
    identity
);

@Component({
    templateUrl: './comp1.component.html'
})
export class Comp1Component
{
    value$: Observable<number>;
    articles$: Observable<Article[]>;

    constructor(private store: Store<State>)
    {
        this.value$ = store.select(valueCount);
        this.articles$ = store.select(articleSelect);

        this.value$.subscribe(userId =>
        {
            if(userId > 0)
                this.store.dispatch(loadArticle({ userId }));
        }); 
    }

    increment()
    {
        this.store.dispatch(increment());
    }

    decrement()
    {
        this.store.dispatch(decrement());
    }

    reset()
    {
        this.store.dispatch(reset());
    }

    clear() {
        this.store.dispatch(clearArticles());
    }
}
