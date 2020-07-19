import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { marbles } from 'rxjs-marbles';

import { ChildComponent, scanChanges, TypedSimpleChange } from './child.component';

describe('ChildComponent', () =>
{
    let component: ChildComponent;
    let fixture: ComponentFixture<ChildComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [ChildComponent]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(ChildComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should work with scanChanges', marbles(m =>
    {
        const source = m.hot('--^-a-b-c-|');
        const expected = '^-a-b-c-|';

        const dest = source.pipe(scanChanges());

        m.expect(dest).toBeObservable(
            expected,
            {
                a: { firstChange: true, currentValue: 'a' },
                b: { firstChange: false, previousValue: 'a', currentValue: 'b' },
                c: { firstChange: false, previousValue: 'b', currentValue: 'c' },
            } as Record<string, TypedSimpleChange<string>>
        );
    }));

    it('should work with scanChanges and emit same value', marbles(m =>
    {
        const source = m.hot('--^-a-a-b-a-c-|');
        const expected = '^-a-b-c-d-e-|';

        const dest = source.pipe(scanChanges());

        m.expect(dest).toBeObservable(
            expected,
            {
                a: { firstChange: true, currentValue: 'a' },
                b: { firstChange: false, previousValue: 'a', currentValue: 'a' },
                c: { firstChange: false, previousValue: 'a', currentValue: 'b' },
                d: { firstChange: false, previousValue: 'b', currentValue: 'a' },
                e: { firstChange: false, previousValue: 'a', currentValue: 'c' },
            } as Record<string, TypedSimpleChange<string>>
        );
    }));
});
