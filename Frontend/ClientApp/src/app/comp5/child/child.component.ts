import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgChangeDetector, onChange, onChangeAll, onChangeAny, TypedSimpleChange, TypedSimpleChanges, TypedSimpleChangesAny } from 'app/changes-utils';

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css']
})
@NgChangeDetector()
export class ChildComponent implements OnInit, OnChanges
{
    @Input() i: number;
    @Input() j: number;
    constructor() { }

    ngOnChanges(changes: SimpleChanges): void
    {
    }

    ngOnInit(): void
    {
    }

    @onChange(ChildComponent, 'i')
    changedI(change: TypedSimpleChange<number>)
    {
        console.log(`i: ${change.currentValue}`);
    }

    @onChange(ChildComponent, 'j', false)
    changedJ(change: TypedSimpleChange<number>)
    {
        console.log(`j: ${change.currentValue}`);
    }

    @onChangeAll(ChildComponent, ['i', 'j'])
    changedBoth(changes: TypedSimpleChanges<ChildComponent, 'i' | 'j'>)
    {
        console.log(`Changed both, i: ${changes.i.currentValue}, j: ${changes.j.currentValue}`);
    }

    @onChangeAny(ChildComponent, ['i', 'j'])
    changedSome(changes: TypedSimpleChangesAny<ChildComponent, 'i' | 'j'>)
    {
        const i = changes.i ? changes.i.currentValue : null;
        const j = changes.j ? changes.j.currentValue : null;
        console.log(`Changed some, ${i !== null ? `i: ${i}` : ''}, ${j !== null ? `j: ${j}` : ''}`);
    }
}
