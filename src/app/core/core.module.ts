import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './containers/app/app.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { GoogleBooksService } from './services/google-books.service';

export const COMPONENTS = [
  AppComponent,
  NotFoundComponent,
  LayoutComponent,
  NavItemComponent,
  SideNavComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [
    CommonModule, RouterModule, MaterialModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [GoogleBooksService],
    };
}
}

