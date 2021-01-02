import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleMapperService } from 'app/comp1/article-mapper.service';
import { Article, ArticleByUserModel } from 'app/comp1/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticleService
{
    constructor(private http: HttpClient, private articleMapper: ArticleMapperService) { }

    loadArticle(userId = 0, id = 0): Observable<ArticleByUserModel[]>
    {
        if (!userId && !id) throw new Error('Invalid args');

        const params = {} as any;
        if (userId)
            params.userId = userId;
        if (id)
            params.id = id;

        return this.http.get<Article[]>(`https://jsonplaceholder.typicode.com/posts`, { params })
        .pipe(
            map(a => this.articleMapper.mapArticles(a))
        );
    }
}
