import { Injectable } from '@angular/core';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { IAuthenticate, IUser } from '../models/user.model';



@Injectable()
export class AuthService {
  constructor() {}

  login({ username, password }: IAuthenticate): Observable<IUser> {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    if (username !== 'test') {
      return Observable.throw(new Error('Invalid username or password'));
    }

    return of({ name: 'User' });
  }

  logout() {
    return of(true);
  }
}
