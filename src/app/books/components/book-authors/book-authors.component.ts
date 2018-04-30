import { Component, OnInit, Input } from '@angular/core';
import { IBook } from '../../models/book.model';

@Component({
  selector: 'app-book-authors',
  templateUrl: './book-authors.component.html',
  styleUrls: ['./book-authors.component.css']
})
export class BookAuthorsComponent implements OnInit {
  @Input() book: IBook;
  constructor() { }

  ngOnInit() {
  }
  get authors() {
    return this.book.volumeInfo.authors;
  }
}
