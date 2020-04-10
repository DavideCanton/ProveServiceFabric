import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dbConfig } from 'app/comp3/db/db-config';
import { FileCacheService } from 'app/comp3/db/file-cache.service';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgxIndexedDBModule } from 'ngx-indexed-db';

import { Comp3Component } from './comp3.component';
import { StoreModule } from '@ngrx/store';
import { comp3FeatureKey, reducers } from 'app/comp3/comp3.reducers';
import { EffectsModule } from '@ngrx/effects';
import { Comp3Effects } from 'app/comp3/comp3.effect';


const routes: Routes = [
  { path: '', component: Comp3Component }
];

@NgModule({
  declarations: [Comp3Component],
  providers: [
    FileCacheService
  ],
  imports: [
    CommonModule,
    ProgressbarModule.forRoot(),
    NgxIndexedDBModule.forRoot(dbConfig),
    RouterModule.forChild(routes),
    StoreModule.forFeature(comp3FeatureKey, reducers),
    EffectsModule.forFeature([Comp3Effects])
  ]
})
export class Comp3Module { }
