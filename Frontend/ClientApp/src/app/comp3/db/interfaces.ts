export interface ItemNoId
{
    blob?: Blob;
    name: string;
    dataUri?: string;
}

export type Item = ItemNoId & { id: number };
