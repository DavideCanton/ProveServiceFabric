import { Injectable } from '@angular/core';
import { Article, ArticleByUserModel } from 'app/comp1/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ArticleMapperService
{

    constructor() { }

    mapArticles(a: Article[]): ArticleByUserModel[]
    {
        throw new Error('Method not implemented.');
    }
}
