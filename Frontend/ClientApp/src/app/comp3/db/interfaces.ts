export interface ItemNoId
{
    path: string;
    name: string;
    progress: number;
    src: string;
}

export type Item = ItemNoId & { id: number };
