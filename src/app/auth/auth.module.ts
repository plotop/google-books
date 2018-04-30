import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './containers/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthGuard } from './guards/auth.guard';

import { AuthService } from './services/auth.service';




export const COMPONENTS = [LoginComponent,
                          LoginFormComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthRoutingModule,
      providers: [AuthService, AuthGuard],
    };
  }
 }
