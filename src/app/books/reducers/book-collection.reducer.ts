import {
  CollectionActionTypes,
  CollectionActionsUnion,
} from './../actions/book-collection.actions';

export interface IAppState {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: IAppState = {
  loaded: false,
  loading: false,
  ids: [],
};

export function reducer(
  state = initialState,
  action: CollectionActionsUnion
): IAppState {
  switch (action.type) {
    case CollectionActionTypes.Load: {
      return {
        ...state,
        loading: true,
      };
    }

    case CollectionActionTypes.LoadSuccess: {
      return {
        loaded: true,
        loading: false,
        ids: action.payload.map(book => book.id),
      };
    }

    case CollectionActionTypes.AddBookSuccess:
    case CollectionActionTypes.RemoveBookFail: {
      if (state.ids.indexOf(action.payload.id) > -1) {
        return state;
      }

      return {
        ...state,
        ids: [...state.ids, action.payload.id],
      };
    }

    case CollectionActionTypes.RemoveBookSuccess:
    case CollectionActionTypes.AddBookFail: {
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.payload.id),
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: IAppState) => state.loaded;

export const getLoading = (state: IAppState) => state.loading;

export const getIds = (state: IAppState) => state.ids;
