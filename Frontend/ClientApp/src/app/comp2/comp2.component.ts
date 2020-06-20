import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { User } from 'app/comp2/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, skip, startWith, switchMap, take, tap } from 'rxjs/operators';


@Component({
    templateUrl: './comp2.component.html',
    styleUrls: ['./comp2.component.css']
})
export class Comp2Component implements OnInit
{
    group: FormGroup;
    s = new BehaviorSubject<User | null>(null);
    a: FormControl;

    constructor(private http: HttpClient) { }

    ngOnInit(): void
    {

        const control = this.a = new FormControl();
        this.group = new FormGroup({ a: control });

        control.setAsyncValidators(ctrl => this.validate(ctrl.value as string));

        control.valueChanges.pipe(
            startWith(control.value),
            distinctUntilChanged(),
            debounceTime(500),
            switchMap(v =>
            {
                console.log(`Start switchMap with ${v} and subject ${this.s.getValue()?.id}`);

                if(!v) return of(null);

                if(v === this.s.getValue()?.id) return of(this.s.getValue());

                return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users', {
                    params: { id: v }
                }).pipe(
                    map(u => u.length === 1 ? u[0] : null),
                    tap(s =>
                    {
                        console.log(`Returning ${s?.id} from switchMap`);
                    })
                );
            })
        ).subscribe(s =>
        {
            console.log(`Next called with ${s?.id}`);
            this.s.next(s);
        });
    }

    validate(value: string): Observable<ValidationErrors | null>
    {
        console.log(`Started validator on value ${value}`);
        return this.s.pipe(
            skip(1),
            take(1),
            map(sub =>
            {
                console.log(`Validating with subject value ${sub?.id}`);
                if(sub) return null;
                return {
                    err: true
                };
            })
        );
    }
}
