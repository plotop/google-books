import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators/map';

import * as fromBooks from '../../reducers/books-app.reducer';
import * as BookActions from '../../actions/book.actions';



@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromBooks.IAppState>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new BookActions.Select(params.id)))
      .subscribe(store);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
