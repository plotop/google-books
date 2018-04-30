import {
    LayoutActionTypes,
    LayoutActionsUnion,
  } from '../actions/layout.actions';

  export interface IAppState {
    showSidenav: boolean;
  }

  const initialState: IAppState = {
    showSidenav: false,
  };

  export function reducer(
    state: IAppState = initialState,
    action: LayoutActionsUnion
  ): IAppState {
    switch (action.type) {
      case LayoutActionTypes.CloseSidenav:
        return {
          showSidenav: false,
        };

      case LayoutActionTypes.OpenSidenav:
        return {
          showSidenav: true,
        };

      default:
        return state;
    }
  }

  export const getShowSidenav = (state: IAppState) => state.showSidenav;
