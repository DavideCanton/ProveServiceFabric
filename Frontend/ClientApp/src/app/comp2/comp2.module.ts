import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Comp2Component } from 'app/comp2/comp2.component';

@NgModule({
    declarations: [
        Comp2Component,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{
            path: '',
            component: Comp2Component
        }]),
    ]
})
export class Comp2Module { }
