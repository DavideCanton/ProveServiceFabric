import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { uniqueId } from 'lodash';

@Directive({
    selector: '[appId]',
    exportAs: 'appId'
})
export class IdDirective implements OnInit
{
    @Input('appId') prefix = 'id-';

    private _id = '';

    get id(): string
    {
        return this._id;
    }

    constructor(private elementRef: ElementRef<HTMLElement>) { }

    ngOnInit(): void
    {
        this.elementRef.nativeElement.id = this._id = uniqueId(this.prefix);
    }
}
