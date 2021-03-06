import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from 'app/comp1/article.service';
import { clearArticles, decrement, increment, loadArticle, reset } from 'app/comp1/comp1.actions';
import { articleSelect, valueCount } from 'app/comp1/comp1.selectors';
import { State } from 'app/reducers';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    styleUrls: ['./comp1.component.css'],
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
