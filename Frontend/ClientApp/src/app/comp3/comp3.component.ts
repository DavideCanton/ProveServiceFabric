import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BackendService } from 'app/comp3/backend.service';
import { clearStore, requestedDownload } from 'app/comp3/comp3.actions';
import { filesSelector, initStore } from 'app/comp3/comp3.selectors';
import { Item } from 'app/comp3/db/interfaces';
import { State } from 'app/reducers';
import { Observable } from 'rxjs';
import { filter, mergeAll, switchMap, take } from 'rxjs/operators';

@Component({
    selector: 'app-comp3',
    templateUrl: './comp3.component.html',
    styleUrls: ['./comp3.component.css']
})
export class Comp3Component
{
    files$: Observable<Item[]>;
    init$: Observable<boolean>;

    constructor(
        private store: Store<State>,
        private backendService: BackendService,
    )
    {
        this.files$ = this.store.pipe(select(filesSelector));
        this.init$ = this.store.pipe(select(initStore));
    }

    reload()
    {
        this.init$.pipe(
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
        this.backendService.getAllFiles().pipe(
            switchMap(names => this.backendService.getAllUrls(names)),
            mergeAll()
        ).subscribe(url =>
        {
            const name = url.match(/.*\/(.*)$/)[1];
            this.store.dispatch(requestedDownload({ url, name }));
        });
    }
}
