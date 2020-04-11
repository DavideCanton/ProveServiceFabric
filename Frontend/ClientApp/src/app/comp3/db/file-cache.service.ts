import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { from, Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

import { FILES_STORE_NAME } from './db-config';
import { Item, ItemNoId } from './interfaces';

@Injectable()
export class FileCacheService
{
    constructor(private dbService: NgxIndexedDBService) { }

    getAll(): Observable<Item[]>
    {
        return from(this.dbService.getAll<Item>(FILES_STORE_NAME));
    }

    getFileById(id: number): Observable<Item | null>
    {
        return from(this.dbService.getByID<Item>(FILES_STORE_NAME, id));
    }

    insert(p: ItemNoId): Observable<Item>
    {
        return from(this.dbService.add(FILES_STORE_NAME, p)).pipe(
            map(id => ({ ...p, id }))
        );
    }

    update(p: Item): Observable<boolean>
    {
        return from(this.dbService.update(FILES_STORE_NAME, p)).pipe(mapTo(true));
    }

    clear(): Observable<boolean>
    {
        return from(this.dbService.clear(FILES_STORE_NAME)).pipe(mapTo(true));
    }
}
