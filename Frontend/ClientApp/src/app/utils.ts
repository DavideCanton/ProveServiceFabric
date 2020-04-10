import { Observable, Subscriber } from "rxjs";

export function first<T, U>(first: T, second: U): T
{
    return first;
}

export function second<T, U>(first: T, second: U): U
{
    return second;
}

export function readFile<R extends string | ArrayBuffer>(blob: Blob, fn: (reader: FileReader, blob: Blob) => void)
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
