import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ArticleService } from 'app/comp1/article.service';
import { ArticlesEffects } from 'app/comp1/articles.effects';
import { Comp1Component } from 'app/comp1/comp1.component';
import { comp1FeatureKey, reducers } from 'app/comp1/reducers';

@NgModule({
    declarations: [
        Comp1Component,
    ],
    providers: [
        ArticleService
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: Comp1Component
        }]),
        EffectsModule.forFeature([ArticlesEffects]),
        StoreModule.forFeature(comp1FeatureKey, reducers)
    ]
})
export class Comp1Module { }
