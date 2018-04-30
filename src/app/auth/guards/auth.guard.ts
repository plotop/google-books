import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import * as fromAuth from '../reducers/auth-app.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.IAppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new AuthActions.LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
