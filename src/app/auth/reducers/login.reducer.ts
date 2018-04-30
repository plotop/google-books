import { AuthActionTypes, AuthActionsUnion } from './../actions/auth.actions';

export interface IAppState {
    error: string | null;
    pending: boolean;
  }

  export const initialState: IAppState = {
    error: null,
    pending: false,
  };

  export function reducer(state = initialState, action: AuthActionsUnion): IAppState {
    switch (action.type) {
      case AuthActionTypes.Login: {
        return {
          ...state,
          error: null,
          pending: true,
        };
      }

      case AuthActionTypes.LoginSuccess: {
        return {
          ...state,
          error: null,
          pending: false,
        };
      }

      case AuthActionTypes.LoginFailure: {
        return {
          ...state,
          error: action.payload,
          pending: false,
        };
      }

      default: {
        return state;
      }
    }
  }

  export const getError = (state: IAppState) => state.error;
  export const getPending = (state: IAppState) => state.pending;
