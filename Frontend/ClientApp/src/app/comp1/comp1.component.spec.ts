import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Comp1State } from 'app/comp1/comp1.reducers';
import { valueCount } from 'app/comp1/comp1.selectors';
import { State } from 'app/reducers';
import { clearArticles, decrement, increment, loadArticle, reset } from './comp1.actions';

import { Comp1Component } from './comp1.component';

describe('Comp1Component', () =>
{
    let component: Comp1Component;
    let fixture: ComponentFixture<Comp1Component>;
    let store: MockStore;
    let mockValueSelector: MemoizedSelector<State, number>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [Comp1Component],
            providers: [
                provideMockStore<{ comp1: Comp1State }>({ initialState: { comp1: { articles: [], value: 0 } } })
            ]
        })
               .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(Comp1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();

        store = TestBed.inject(MockStore);
        mockValueSelector = store.overrideSelector(valueCount, 0);
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should emit increment', () =>
    {
        const dispatch = spyOn(store, 'dispatch');
        const action = increment();
        component.increment();
        expect(dispatch).toHaveBeenCalledWith(action);
    });

    it('should emit decrement', () =>
    {
        const dispatch = spyOn(store, 'dispatch');
        const action = decrement();
        component.decrement();
        expect(dispatch).toHaveBeenCalledWith(action);
    });

    it('should emit reset', () =>
    {
        const dispatch = spyOn(store, 'dispatch');
        const action = reset();
        component.reset();
        expect(dispatch).toHaveBeenCalledWith(action);
    });

    it('should emit clearArticles', () =>
    {
        const dispatch = spyOn(store, 'dispatch');
        const action = clearArticles();
        component.clear();
        expect(dispatch).toHaveBeenCalledWith(action);
    });

    it('should emit loadArticle on value change', () =>
    {
        const dispatch = spyOn(store, 'dispatch');
        mockValueSelector.setResult(1);
        store.refreshState();
        mockValueSelector.setResult(2);
        store.refreshState();
        mockValueSelector.setResult(1);
        store.refreshState();
        mockValueSelector.setResult(0);
        store.refreshState();

        expect(dispatch.calls.allArgs()).toEqual([
            [loadArticle({ userId: 1 })],
            [loadArticle({ userId: 2 })],
            [loadArticle({ userId: 1 })],
        ]);
    });
});
