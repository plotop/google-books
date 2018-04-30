import { Action } from '@ngrx/store';
import { IBook } from '../models/book.model';

export enum BookActionTypes {
  Search = '[Book] Search',
  SearchComplete = '[Book] Search Complete',
  SearchError = '[Book] Search Error',
  Load = '[Book] Load',
  Select = '[Book] Select',
}

export class Search implements Action {
    readonly type = BookActionTypes.Search;

    constructor(public payload: string) {}
  }

  export class SearchComplete implements Action {
    readonly type = BookActionTypes.SearchComplete;

    constructor(public payload: IBook[]) {}
  }

  export class SearchError implements Action {
    readonly type = BookActionTypes.SearchError;

    constructor(public payload: string) {}
  }

  export class Load implements Action {
    readonly type = BookActionTypes.Load;

    constructor(public payload: IBook) {}
  }

  export class Select implements Action {
    readonly type = BookActionTypes.Select;

    constructor(public payload: string) {}
  }

  export type BookActionsUnion =
  | Search
  | SearchComplete
  | SearchError
  | Load
  | Select;
