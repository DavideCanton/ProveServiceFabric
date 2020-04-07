import { Component } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Article } from 'app/comp1/article.service';
import { clearArticles, decrement, increment, loadArticle, reset } from 'app/comp1/comp1.actions';
import { Comp1State } from 'app/comp1/comp1.reducers';
import { comp1FeatureSelector } from 'app/comp1/comp1.selectors';
import { State } from 'app/reducers';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export const valueCount = createSelector(
    comp1FeatureSelector,
    (state: Comp1State) => state.value
);

export const articleSelect = createSelector(
    comp1FeatureSelector,
    (state: Comp1State) => state.articles
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

        this.value$.pipe(
            filter(userId => userId > 0)
        )
            .subscribe(userId => this.store.dispatch(loadArticle({ userId })));
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

    clear()
    {
        this.store.dispatch(clearArticles());
    }
}
