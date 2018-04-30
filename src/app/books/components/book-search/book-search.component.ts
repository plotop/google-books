import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Output() search = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

}
