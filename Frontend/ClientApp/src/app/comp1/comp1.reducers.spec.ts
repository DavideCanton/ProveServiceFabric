import { TestBed } from '@angular/core/testing';
import { Article } from 'app/comp1/article.service';
import { articlesLoaded, clearArticles, decrement, increment, reset } from 'app/comp1/comp1.actions';
import { reducers } from 'app/comp1/comp1.reducers';

describe('Comp1Reducers', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({})
               .compileComponents();
    });

    it('should increment correctly', () =>
    {
        expect(reducers.value(0, increment())).toBe(1);
        expect(reducers.value(1, increment())).toBe(2);
    });

    it('should decrement correctly', () =>
    {
        expect(reducers.value(0, decrement())).toBe(0);
        expect(reducers.value(1, decrement())).toBe(0);
        expect(reducers.value(2, decrement())).toBe(1);
    });

    it('should reset correctly', () =>
    {
        expect(reducers.value(0, reset())).toBe(0);
        expect(reducers.value(1, reset())).toBe(0);
        expect(reducers.value(2, reset())).toBe(0);
    });

    it('should set articles loaded correctly', () =>
    {
        const articles = [
            { id: 1, body: '', title: '', userId: 1 },
            { id: 2, body: '', title: '', userId: 1 },
            { id: 3, body: '', title: '', userId: 2 },
        ] as Article[];
        expect(reducers.articles([], articlesLoaded({ articles }))).toEqual(articles);
    });

    it('should clear articles correctly', () =>
    {
        const articles = [
            { id: 1, body: '', title: '', userId: 1 },
            { id: 2, body: '', title: '', userId: 1 },
            { id: 3, body: '', title: '', userId: 2 },
        ] as Article[];
        expect(reducers.articles(articles, clearArticles())).toEqual([]);
    });
});
