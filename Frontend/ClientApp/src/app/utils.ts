import { ValidatorFn } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';

export function first<T, U>(firstArg: T, _secondArg: U): T
{
    return firstArg;
}

export function second<T, U>(_firstArg: T, secondArg: U): U
{
    return secondArg;
}

export function getFileName(url: string): string
{
    try
    {
        return url.match(/.*\/(.*)$/)![1];
    } catch(e)
    {
        return '';
    }
}

export function readFile<R extends string | ArrayBuffer>(blob: Blob, fn: (reader: FileReader, blob: Blob) => void): Observable<R>
{
    return new Observable((subscriber: Subscriber<R>) =>
    {
        if(!(blob instanceof Blob))
        {
            subscriber.error(new Error('`blob` must be an instance of File or Blob.'));
            return;
        }

        const reader = new FileReader();

        reader.onerror = err => subscriber.error(err);
        reader.onabort = err => subscriber.error(err);
        reader.onload = () => subscriber.next(reader.result as R);
        reader.onloadend = () => subscriber.complete();

        fn(reader, blob);
    });
}
