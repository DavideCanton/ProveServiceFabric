import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from 'app/app.component';
import { ArticlesEffects } from 'app/articles.effects';
import { Comp1Component } from 'app/comp1/comp1.component';
import { Comp2Component } from 'app/comp2/comp2.component';
import { reducers } from 'app/reducers';
import { environment } from 'environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';
import { DndModule } from 'ngx-drag-drop';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any>
{
    return localStorageSync({
        keys: ['articles'],
        rehydrate: true
    })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
    declarations: [
        AppComponent,
        Comp1Component,
        Comp2Component
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path: 'comp1',
                component: Comp1Component
            },
            {
                path: 'comp2',
                component: Comp2Component
            }
        ]),
        EffectsModule.forRoot([ArticlesEffects]),
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
            }
        }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        DndModule,
        StoreRouterConnectingModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
