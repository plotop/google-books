import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromBooks from './books.reducer';
import * as fromCollection from './book-collection.reducer';
import * as fromRoot from '../../core/reducers/app.reducer';

export interface IBooksState {
  search: fromSearch.IAppState;
  books: fromBooks.IAppState;
  collection: fromCollection.IAppState;
}

export interface IAppState extends fromRoot.IAppState {
  books: IBooksState;
}

export const reducers: ActionReducerMap<IBooksState> = {
  search: fromSearch.reducer,
  books: fromBooks.reducer,
  collection: fromCollection.reducer,
};

export const getBooksState = createFeatureSelector<IBooksState>('books');

export const getBookEntitiesState = createSelector(
  getBooksState,
  state => state.books
);

export const getSelectedBookId = createSelector(
  getBookEntitiesState,
  fromBooks.getSelectedId
);

export const {
  selectIds: getBookIds,
  selectEntities: getBookEntities,
  selectAll: getAllBooks,
  selectTotal: getTotalBooks,
} = fromBooks.adapter.getSelectors(getBookEntitiesState);

export const getSelectedBook = createSelector(
  getBookEntities,
  getSelectedBookId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getSearchState = createSelector(
  getBooksState,
  (state: IBooksState) => state.search
);

export const getSearchBookIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError
);


export const getSearchResults = createSelector(
  getBookEntities,
  getSearchBookIds,
  (books, searchIds) => {
    return searchIds.map(id => books[id]);
  }
);

export const getCollectionState = createSelector(
  getBooksState,
  (state: IBooksState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionBookIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getBookCollection = createSelector(
  getBookEntities,
  getCollectionBookIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedBookInCollection = createSelector(
  getCollectionBookIds,
  getSelectedBookId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);
