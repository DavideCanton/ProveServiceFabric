import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Comp2State } from 'app/comp2/comp2.reducers';

import { Comp2Component } from './comp2.component';

describe('Comp2Component', () =>
{
    let component: Comp2Component;
    let fixture: ComponentFixture<Comp2Component>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [Comp2Component],
            providers: [
                provideMockStore<{ comp2: Comp2State }>({
                    initialState: {
                        comp2: {
                            days: {
                                1: null
                            }
                        }
                    }
                })
            ]
        })
               .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(Comp2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
