import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

  import * as fromCore from '../../core/reducers/app.reducer';
  import * as fromAuth from './auth.reducer';
  import * as fromLogin from './login.reducer';

  export interface IAppAuthState {
    status: fromAuth.IAppState;
    loginPage: fromLogin.IAppState;
  }

  export interface IAppState extends fromCore.IAppState {
    auth: IAppAuthState;
  }

  export const reducers: ActionReducerMap<IAppAuthState> = {
    status: fromAuth.reducer,
    loginPage: fromLogin.reducer,
  };

  export const selectAuthState = createFeatureSelector<IAppAuthState>('auth');

  export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: IAppAuthState) => state.status
  );

  export const getLoggedIn = createSelector(
    selectAuthStatusState,
    fromAuth.getLoggedIn
  );

  export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: IAppAuthState) => state.loginPage
);
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLogin.getError
);
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLogin.getPending
);

