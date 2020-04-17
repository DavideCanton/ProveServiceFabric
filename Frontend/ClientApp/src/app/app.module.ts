import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from 'app/app.component';
import { reducers } from 'app/reducers';
import { environment } from 'environments/environment';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { FileSaverModule } from 'ngx-filesaver';

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
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot([
            { path: 'comp1', loadChildren: () => import('./comp1/comp1.module').then(m => m.Comp1Module) },
            { path: 'comp2', loadChildren: () => import('./comp2/comp2.module').then(m => m.Comp2Module) },
            { path: 'comp3', loadChildren: () => import('./comp3/comp3.module').then(m => m.Comp3Module) },
            { path: 'comp4', loadChildren: () => import('./comp4/comp4.module').then(m => m.Comp4Module) },
        ]),
        EffectsModule.forRoot([]),
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
            }
        }),
        FileSaverModule,
        PdfJsViewerModule.forRoot(),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
