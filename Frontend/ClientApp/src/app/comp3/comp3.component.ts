import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { requestedDownload, clearStore } from 'app/comp3/comp3.actions';
import { filesSelector, initStore } from 'app/comp3/comp3.selectors';
import { FileCacheService } from 'app/comp3/db/file-cache.service';
import { Item } from 'app/comp3/db/interfaces';
import { State } from 'app/reducers';
import { Observable, of } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
    selector: 'app-comp3',
    templateUrl: './comp3.component.html',
    styleUrls: ['./comp3.component.css']
})
export class Comp3Component
{
    urls = [
        'http://localhost:4200/assets/img/death_knight_post.jpg',
        'http://localhost:4200/assets/img/haskell.png',
        'http://localhost:4200/assets/img/integ.png',
    ];

    parsed$: Observable<Item[]>;

    constructor(
        private store: Store<State>
    )
    {
        this.parsed$ = this.store.pipe(select(filesSelector));
    }

    reload()
    {
        this.store.pipe(select(initStore)).pipe(
            filter(v => !!v),
            take(1)
        ).subscribe(() => this.start());
    }

    clear()
    {
        this.store.dispatch(clearStore());
    }

    private start()
    {
        of(...this.urls).subscribe(url =>
        {
            const name = url.match(/.*\/(.*)$/)[1];
            this.store.dispatch(requestedDownload({ url, name }));
        });
    }
}
