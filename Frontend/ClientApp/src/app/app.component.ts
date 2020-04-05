import { Component } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { identity } from 'lodash';
import { Observable } from 'rxjs';

import { decrement, increment, loadArticle, reset } from './app.component.actions';
import { Article } from './article.service';
import { State } from './reducers';

export const valueCount = createSelector(
    (state: State) => state.value,
    identity
);

export const articleSelect = createSelector(
    (state: State) => state.articles,
    identity
);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent
{
    title = 'app';
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
}
