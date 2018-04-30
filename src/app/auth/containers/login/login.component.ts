import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../../reducers/auth-app.reducer';
import { IAuthenticate } from '../../models/user.model';
import * as AuthActions from '../../actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private store: Store<fromAuth.IAppState>) { }

  ngOnInit() {
  }

  onSubmit($event: IAuthenticate) {
    this.store.dispatch(new AuthActions.Login($event));
  }
}
