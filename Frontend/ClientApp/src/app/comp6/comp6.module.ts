import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Comp6Effects } from 'app/comp6/comp6.effects';
import { comp6FeatureKey, reducers } from 'app/comp6/comp6.reducer';

import { Comp6Component } from './comp6.component';
import { IdDirective } from './id.directive';


const routes: Routes = [
    { path: '', component: Comp6Component }
];

@NgModule({
    declarations: [Comp6Component, IdDirective],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(comp6FeatureKey, reducers),
        EffectsModule.forFeature([Comp6Effects])
    ]
})
export class Comp6Module { }
