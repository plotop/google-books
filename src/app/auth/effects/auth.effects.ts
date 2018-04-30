import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators/map';
import { exhaustMap } from 'rxjs/operators/exhaustMap';
import { catchError } from 'rxjs/operators/catchError';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';

import {
    AuthActionTypes,
    Login,
    LoginFailure,
    LoginSuccess,
  } from '../actions/auth.actions';
  import { IAuthenticate } from '../models/user.model';
  import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: IAuthenticate) =>
      this.authService
        .login(auth)
        .pipe(
          map(user => new LoginSuccess({ user })),
          catchError(error => of(new LoginFailure(error)))
        )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(authed => {
      this.router.navigate(['/login']);
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
