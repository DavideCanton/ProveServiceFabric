import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BackendService } from 'app/comp3/backend.service';
import { Comp3State } from 'app/comp3/comp3.reducers';
import { FileCacheService } from 'app/comp3/db/file-cache.service';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';

import { Comp3Component } from './comp3.component';

describe('Comp3Component', () =>
{
    let component: Comp3Component;
    let fixture: ComponentFixture<Comp3Component>;
    let mock: NgxIndexedDBService = {

    } as any;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [Comp3Component],
            imports: [
                ProgressbarModule.forRoot(),
                NgxIndexedDBModule.forRoot({
                    migrationFactory: () => ({}),
                    name: 'a',
                    objectStoresMeta: [],
                    version: 1
                })
            ],
            providers: [
                BackendService,
                FileCacheService,
                provideMockStore<{ comp3: Comp3State }>({
                    initialState: {
                        comp3: {
                            init: false,
                            items: []
                        }
                    }
                }),
                {
                    provide: NgxIndexedDBService,
                    useValue: mock
                }
            ]
        })
               .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(Comp3Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
