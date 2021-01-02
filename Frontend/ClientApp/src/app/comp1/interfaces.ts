
export interface Article
{
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface ArticleModel
{
    id: number;
    title: string;
    body: string;
}

export interface ArticleByUserModel
{
    userId: number;
    articles: ArticleModel;
}
