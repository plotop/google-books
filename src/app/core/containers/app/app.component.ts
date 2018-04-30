import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';


import * as fromCore from '../../reducers/app.reducer';
import * as fromAuth from '../../../auth/reducers/auth-app.reducer';
import * as LayoutActions from '../../actions/layout.actions';
import * as AuthActions from '../../../auth/actions/auth.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromCore.IAppState>) {
    this.showSidenav$ = this.store.pipe(select(fromCore.getShowSidenav));
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }

  closeSidenav() {
    this.store.dispatch(new LayoutActions.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new LayoutActions.OpenSidenav());
  }

  logout() {
    this.closeSidenav();
    this.store.dispatch(new AuthActions.Logout());
  }


}
