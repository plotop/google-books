import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
  } from '@ngrx/store';
  import * as fromRouter from '@ngrx/router-store';
  import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../environments/environment';
import { IRouterStateUrl } from '../../shared/utils';
import * as fromLayout from '../reducers/layout.reducer';


  export interface IAppState {
    layout: fromLayout.IAppState;
    router: fromRouter.RouterReducerState<IRouterStateUrl>;
  }

  export const reducers: ActionReducerMap<IAppState> = {
    layout: fromLayout.reducer,
    router: fromRouter.routerReducer,
  };

  export function logger(reducer: ActionReducer<IAppState>): ActionReducer<IAppState> {
    return function(state: IAppState, action: any): IAppState {
      // console.log('state', state);
      // console.log('action', action);

      return reducer(state, action);
    };
  }

  export const metaReducers: MetaReducer<IAppState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

  export const getLayoutState = createFeatureSelector<fromLayout.IAppState>('layout');

    export const getShowSidenav = createSelector(
        getLayoutState,
        fromLayout.getShowSidenav
    );
