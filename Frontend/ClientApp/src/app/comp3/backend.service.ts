import { Injectable } from '@angular/core';
import { keys, pick, values } from 'lodash';
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
        return of(values(pick(files, names))).pipe(delay(0));
    }
}
