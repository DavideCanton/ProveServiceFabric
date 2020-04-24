import { TestBed } from '@angular/core/testing';
import { select } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Article } from 'app/comp1/article.service';
import { articleSelect, loadedUsers, valueCount } from 'app/comp1/comp1.selectors';
import { Comp1State } from 'app/comp1/comp1.reducers';

describe('Comp1Selectors', () =>
{
    let store: MockStore<{ comp1: Comp1State }>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore<{ comp1: Comp1State }>({
                    initialState: {
                        comp1: {
                            articles: [],
                            value: 0
                        }
                    }
                })
            ]
        })
            .compileComponents();

        store = TestBed.inject(MockStore);
    });

    it('should get the value correctly', done =>
    {
        store.setState({ comp1: { value: 1, articles: [] } });
        store.pipe(select(valueCount)).subscribe(v =>
        {
            expect(v).toBe(1);
            done();
        });
    });

    it('should get the articles correctly', done =>
    {
        const articles = [
            { id: 1, body: '', userId: 1, title: '' },
            { id: 2, body: '', userId: 2, title: '' },
            { id: 3, body: '', userId: 3, title: '' }
        ] as Article[];

        store.setState({ comp1: { value: 0, articles } });
        store.pipe(select(articleSelect)).subscribe(v =>
        {
            expect(v).toEqual(articles);
            done();
        });
    });

    it('should get the users correctly', done =>
    {
        const articles = [
            { id: 1, body: '', userId: 1, title: '' },
            { id: 2, body: '', userId: 3, title: '' },
            { id: 3, body: '', userId: 1, title: '' },
            { id: 4, body: '', userId: 2, title: '' },
        ] as Article[];

        store.setState({ comp1: { value: 0, articles } });
        store.pipe(select(loadedUsers)).subscribe(v =>
        {
            expect(v).toEqual([1, 2, 3]);
            done();
        });
    });
});
