import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LoginComponent } from './containers/login/login.component';
import { reducers } from './reducers/auth-app.reducer';
import { AuthEffects } from './effects/auth.effects';
import { AuthModule } from './auth.module';

const routes: Routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects])]
})
export class AuthRoutingModule { }
