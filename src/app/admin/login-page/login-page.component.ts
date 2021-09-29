import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form:FormGroup
  constructor() {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid) return
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
  }
}
