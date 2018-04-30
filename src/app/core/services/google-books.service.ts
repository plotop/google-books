import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IBook } from '../../books/models/book.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export class GoogleBooksService {
  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  searchBooks(queryTitle: string): Observable<IBook[]> {
    return this.http
      .get<{ items: IBook[] }>(`${this.API_PATH}?q=${queryTitle}`)
      .pipe(map(books => books.items || []));
  }

  retrieveBook(volumeId: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.API_PATH}/${volumeId}`);
  }
}
