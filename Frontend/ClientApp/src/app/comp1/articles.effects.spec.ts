import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Article, ArticleService } from 'app/comp1/article.service';
import { ArticlesEffects } from 'app/comp1/articles.effects';
import { articlesLoaded, loadArticle } from 'app/comp1/comp1.actions';
import { loadedArticles } from 'app/comp1/comp1.selectors';
import { Observable, of } from 'rxjs';
import { marbles } from 'rxjs-marbles';

describe('ArticlesEffects', () =>
{
    let actions$: Observable<Action>;
    let spectator: SpectatorService<ArticlesEffects>;

    let spectatorFactory = createServiceFactory({
        service: ArticlesEffects,
        providers: [
            provideMockActions(() => actions$),
            provideMockStore()
        ],
        mocks: [
            ArticleService
        ]
    });

    beforeEach(() =>
    {
        spectator = spectatorFactory();
    });

    it('should load article', marbles(m =>
    {
        const mockStore = spectator.get(Store) as unknown as MockStore;
        mockStore.overrideSelector(loadedArticles, {});

        actions$ = m.hot('-a-|', {
            a: loadArticle({ id: 1, userId: 2 })
        });

        const articles: Article[] = [
            {
                body: 'b',
                title: 'a',
                id: 1,
                userId: 2
            }
        ];
        const spy = spectator.get(ArticleService).loadArticle.and.callFake(args => of(articles));

        const eff = spectator.service.loadArticles$;

        m.expect(eff).toBeObservable(
            '-a-|',
            { a: articlesLoaded({ articles }) }
        );
        m.flush();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(2, 1);
    }));

    it('should reload articles not loaded', marbles(m =>
    {
        const mockStore = spectator.get(Store) as unknown as MockStore;
        mockStore.overrideSelector(loadedArticles, {
            2: [2]
        });

        actions$ = m.hot('-a-|', {
            a: loadArticle({ id: 1, userId: 2 }),
        });

        const articles: Article[] = [
            {
                body: 'b',
                title: 'a',
                id: 1,
                userId: 2
            }
        ];
        const spy = spectator.get(ArticleService).loadArticle.and.callFake(args => of(articles));

        const eff = spectator.service.loadArticles$;

        m.expect(eff).toBeObservable(
            '-a-|',
            { a: articlesLoaded({ articles }) }
        );
        m.flush();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(2, 1);
    }));

    it('should not reload articles already loaded', marbles(m =>
    {
        const mockStore = spectator.get(Store) as unknown as MockStore;
        mockStore.overrideSelector(loadedArticles, {
            2: [1]
        });

        actions$ = m.hot('-a-|', {
            a: loadArticle({ id: 1, userId: 2 }),
        });

        const spy = spectator.get(ArticleService).loadArticle;

        const eff = spectator.service.loadArticles$;

        m.expect(eff).toBeObservable('---|');
        m.flush();
        expect(spy).not.toHaveBeenCalled();
    }));

    it('should reload articles if no id is provided', marbles(m =>
    {
        const mockStore = spectator.get(Store) as unknown as MockStore;
        mockStore.overrideSelector(loadedArticles, {
            2: [1]
        });

        actions$ = m.hot('-a-|', {
            a: loadArticle({ userId: 2 }),
        });

        const articles: Article[] = [
            {
                body: 'b',
                title: 'a',
                id: 1,
                userId: 2
            }
        ];
        const spy = spectator.get(ArticleService).loadArticle.and.callFake(args => of(articles));

        const eff = spectator.service.loadArticles$;

        m.expect(eff).toBeObservable(
            '-a-|',
            { a: articlesLoaded({ articles }) }
        );
        m.flush();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(2, undefined);
    }));
});
