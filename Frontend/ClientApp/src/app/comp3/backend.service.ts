import { Injectable } from '@angular/core';
import { chain, Dictionary, isNil, keys } from 'lodash';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import files from './files.json';

@Injectable()
export class BackendService
{
    getAllFiles(): Observable<string[]>
    {
        return of(keys(files)).pipe(delay(0));
    }

    getAllUrls(names: string[]): Observable<string[]>
    {
        return of(
            chain(files)
                .pick(names)
                .omitBy(isNil)
                .values()
                .value() as string[]
        ).pipe(delay(0));
    }
}
