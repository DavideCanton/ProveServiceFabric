import { Component, Input, OnInit } from '@angular/core';
import { ObservableInput } from 'ngx-observable-input';
import { Observable, OperatorFunction, pipe } from 'rxjs';
import { scan, distinctUntilChanged } from 'rxjs/operators';

export interface TypedSimpleChange<T>
{
    currentValue: T;
    previousValue?: T;
    firstChange: boolean;
}

export function scanChanges<T>(): OperatorFunction<T, TypedSimpleChange<T>>
{
    return pipe(
        scan((acc, next) =>
        {
            if(!acc) return {
                currentValue: next,
                firstChange: true
            };

            return {
                firstChange: false,
                currentValue: next,
                previousValue: acc.currentValue
            };
        }, null as any)
    );
}

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit
{
    @ObservableInput() @Input('i') i$: Observable<number>;
    @ObservableInput() @Input('j') j$: Observable<number>;

    iP$: Observable<TypedSimpleChange<number>>;
    jP$: Observable<TypedSimpleChange<number>>;

    constructor() { }


    ngOnInit(): void
    {
        this.iP$ = this.i$.pipe(scanChanges());
        this.jP$ = this.j$.pipe(scanChanges());

        this.i$.subscribe(i => this.changedI(i));
        this.j$.subscribe(j => this.changedJ(j));
    }

    changedI(change: number)
    {
        console.log(`i: ${change}`);
    }

    changedJ(change: number)
    {
        console.log(`j: ${change}`);
    }
}
