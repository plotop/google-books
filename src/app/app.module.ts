import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterModule } from '@angular/router';

import { AppComponent } from './core/containers/app/app.component';
import { CoreModule } from './core/core.module';
import { reducers, metaReducers } from './core/reducers/app.reducer';
import { environment } from '../environments/environment';
import { CustomRouterStateSerializer } from './shared/utils';
import { AuthModule } from './auth/auth.module';
import { schema } from './db';
import { routes } from './app-routes';




@NgModule({
 imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router', }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store DevTools',
      logOnly: environment.production,
    }),
    CoreModule.forRoot(),
    EffectsModule.forRoot([]),
    DBModule.provideDB(schema),
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
