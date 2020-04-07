import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { Comp2Component } from 'app/comp2/comp2.component';
import { comp2FeatureKey, reducers } from 'app/comp2/reducers';
import { DndModule } from 'ngx-drag-drop';

@NgModule({
    declarations: [
        Comp2Component,
    ],
    imports: [
        CommonModule,
        DndModule,
        RouterModule.forChild([{
            path: '',
            component: Comp2Component
        }]),
        StoreModule.forFeature(comp2FeatureKey, reducers)
    ]
})
export class Comp2Module { }
