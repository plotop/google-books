import { Component, OnInit, Input } from '@angular/core';
import { IBook } from '../../models/book.model';

@Component({
  selector: 'app-book-preview-list',
  templateUrl: './book-preview-list.component.html',
  styleUrls: ['./book-preview-list.component.css']
})
export class BookPreviewListComponent implements OnInit {
  @Input() books: IBook[];
  constructor() { }

  ngOnInit() {
  }

}
