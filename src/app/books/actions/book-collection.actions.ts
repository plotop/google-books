import { Action } from '@ngrx/store';
import { IBook } from '../models/book.model';

export enum CollectionActionTypes {
  AddBook = '[Collection] Add Book',
  AddBookSuccess = '[Collection] Add Book Success',
  AddBookFail = '[Collection] Add Book Fail',
  RemoveBook = '[Collection] Remove Book',
  RemoveBookSuccess = '[Collection] Remove Book Success',
  RemoveBookFail = '[Collection] Remove Book Fail',
  Load = '[Collection] Load',
  LoadSuccess = '[Collection] Load Success',
  LoadFail = '[Collection] Load Fail',
}

export class AddBook implements Action {
    readonly type = CollectionActionTypes.AddBook;

    constructor(public payload: IBook) {}
  }

  export class AddBookSuccess implements Action {
    readonly type = CollectionActionTypes.AddBookSuccess;

    constructor(public payload: IBook) {}
  }

  export class AddBookFail implements Action {
    readonly type = CollectionActionTypes.AddBookFail;

    constructor(public payload: IBook) {}
  }

  export class RemoveBook implements Action {
    readonly type = CollectionActionTypes.RemoveBook;

    constructor(public payload: IBook) {}
  }

  export class RemoveBookSuccess implements Action {
    readonly type = CollectionActionTypes.RemoveBookSuccess;

    constructor(public payload: IBook) {}
  }

  export class RemoveBookFail implements Action {
    readonly type = CollectionActionTypes.RemoveBookFail;

    constructor(public payload: IBook) {}
  }

  export class Load implements Action {
    readonly type = CollectionActionTypes.Load;
  }

  export class LoadSuccess implements Action {
    readonly type = CollectionActionTypes.LoadSuccess;

    constructor(public payload: IBook[]) {}
  }

  export class LoadFail implements Action {
    readonly type = CollectionActionTypes.LoadFail;

    constructor(public payload: any) {}
  }

  export type CollectionActionsUnion =
    | AddBook
    | AddBookSuccess
    | AddBookFail
    | RemoveBook
    | RemoveBookSuccess
    | RemoveBookFail
    | Load
    | LoadSuccess
    | LoadFail;
