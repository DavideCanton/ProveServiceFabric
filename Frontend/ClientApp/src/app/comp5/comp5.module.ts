import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Comp5Component } from './comp5.component';
import { ChildComponent } from './child/child.component';

@NgModule({
  declarations: [Comp5Component, ChildComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
          path: '',
          component: Comp5Component
      }
  ]),
  ]
})
export class Comp5Module { }
