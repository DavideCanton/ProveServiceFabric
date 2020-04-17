import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Comp4Component } from 'app/comp4/comp4.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

@NgModule({
    declarations: [
        Comp4Component,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: Comp4Component
            }
        ]),
        PdfJsViewerModule
    ]
})
export class Comp4Module
{
}
