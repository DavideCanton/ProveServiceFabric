import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot([
            { path: 'comp1', loadChildren: () => import('./comp1/comp1.module').then(m => m.Comp1Module) },
            { path: 'comp2', loadChildren: () => import('./comp2/comp2.module').then(m => m.Comp2Module) },
            { path: 'comp3', loadChildren: () => import('./comp3/comp3.module').then(m => m.Comp3Module) },
            { path: 'comp4', loadChildren: () => import('./comp4/comp4.module').then(m => m.Comp4Module) },
            { path: 'comp5', loadChildren: () => import('./comp5/comp5.module').then(m => m.Comp5Module) },
            { path: 'comp6', loadChildren: () => import('./comp6/comp6.module').then(m => m.Comp6Module) },
        ]),
    ],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule { }
