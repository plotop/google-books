import { AuthActionsUnion, AuthActionTypes } from './../actions/auth.actions';
import { IUser } from '../models/user.model';

export interface IAppState {
    loggedIn: boolean;
    user: IUser | null;
  }

  export const initialState: IAppState = {
    loggedIn: false,
    user: null,
  };

  export function reducer(state = initialState, action: AuthActionsUnion): IAppState {
    switch (action.type) {
      case AuthActionTypes.LoginSuccess: {
        return {
          ...state,
          loggedIn: true,
          user: action.payload.user,
        };
      }

      case AuthActionTypes.Logout: {
        return initialState;
      }

      default: {
        return state;
      }
    }
  }
  export const getLoggedIn = (state: IAppState) => state.loggedIn;
  export const getUser = (state: IAppState) => state.user;

