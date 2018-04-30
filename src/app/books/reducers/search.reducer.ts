import { BookActionTypes, BookActionsUnion } from '../actions/book.actions';

export interface IAppState {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: IAppState = {
  ids: [],
  loading: false,
  error: '',
  query: '',
};

export function reducer(state = initialState, action: BookActionsUnion): IAppState {
  switch (action.type) {
    case BookActionTypes.Search: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          loading: false,
          error: '',
          query,
        };
      }

      return {
        ...state,
        loading: true,
        error: '',
        query,
      };
    }

    case BookActionTypes.SearchComplete: {
      return {
        ids: action.payload.map(book => book.id),
        loading: false,
        error: '',
        query: state.query,
      };
    }

    case BookActionTypes.SearchError: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: IAppState) => state.ids;

export const getQuery = (state: IAppState) => state.query;

export const getLoading = (state: IAppState) => state.loading;

export const getError = (state: IAppState) => state.error;
