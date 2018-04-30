import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IBook } from '../models/book.model';
import { BookActionsUnion, BookActionTypes } from '../actions/book.actions';
import {
  CollectionActionsUnion,
  CollectionActionTypes,
} from '../actions/book-collection.actions';

export interface IAppState extends EntityState<IBook> {
  selectedBookId: string | null;
}

export const adapter: EntityAdapter<IBook> = createEntityAdapter<IBook>({
  selectId: (book: IBook) => book.id,
  sortComparer: false,
});

export const initialState: IAppState = adapter.getInitialState({
  selectedBookId: null,
});

export function reducer(
  state = initialState,
  action: BookActionsUnion | CollectionActionsUnion
): IAppState {
  switch (action.type) {
    case BookActionTypes.SearchComplete:
    case CollectionActionTypes.LoadSuccess: {
        return adapter.addMany(action.payload, {
        ...state,
        selectedBookId: state.selectedBookId,
      });
    }

    case BookActionTypes.Load: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedBookId: state.selectedBookId,
      });
    }

    case BookActionTypes.Select: {
      return {
        ...state,
        selectedBookId: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: IAppState) => state.selectedBookId;
