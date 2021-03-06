import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Article

{
    userId: number;
    id: number;
    title: string;
    body: string;
}

@Injectable()
export class ArticleService
{
    constructor(private http: HttpClient) { }

    loadArticle(userId = 0, id = 0): Observable<Article[]>
    {
        if (!userId && !id) throw new Error('Invalid args');

        const params = {} as any;
        if (userId)
            params.userId = userId;
        if (id)
            params.id = id;

        return this.http.get<Article[]>(`https://jsonplaceholder.typicode.com/posts`, { params });
    }
}
