import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Comp4Component } from './comp4.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

describe('Comp4Component', () =>
{
    let component: Comp4Component;
    let fixture: ComponentFixture<Comp4Component>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [Comp4Component],
            imports: [
                HttpClientTestingModule,
                PdfJsViewerModule.forRoot()
            ]
        })
               .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(Comp4Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
