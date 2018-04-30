import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IAuthenticate } from '../../models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<IAuthenticate>();

  constructor() { }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

}
