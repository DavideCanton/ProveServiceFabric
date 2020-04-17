import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { BackendService } from 'app/comp3/backend.service';
import { clearStore, requestedDownload } from 'app/comp3/comp3.actions';
import { IStoreItem } from 'app/comp3/comp3.reducers';
import { filesSelector, initStore } from 'app/comp3/comp3.selectors';
import { FileCacheService } from 'app/comp3/db/file-cache.service';
import { State } from 'app/reducers';
import { getFileName } from 'app/utils';
import { Observable } from 'rxjs';
import { filter, mergeAll, switchMap, take } from 'rxjs/operators';

@Component({
    selector: 'app-comp3',
    templateUrl: './comp3.component.html',
    styleUrls: ['./comp3.component.css'],
    animations: [
        trigger('img', [
            transition(':enter', [
                style({ height: 0 }),
                animate('300ms', style({ height: '*' })),
            ])
        ]),
    ]
})
export class Comp3Component
{
    files$: Observable<IStoreItem[]>;
    init$: Observable<boolean>;

    constructor(
        private store: Store<State>,
        private backendService: BackendService,
        private sanitizer: DomSanitizer,
        private dbService: FileCacheService
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

    sanitize(url: string)
    {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    private start()
    {
        this.backendService.getAllFiles().pipe(
            switchMap(names => this.backendService.getAllUrls(names)),
            mergeAll()
        ).subscribe(url =>
        {
            const name = getFileName(url);
            this.store.dispatch(requestedDownload({ url, name }));
        });
    }
}
