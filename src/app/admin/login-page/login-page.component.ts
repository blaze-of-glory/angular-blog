import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form:FormGroup
  submitted: boolean
  message: string
  constructor(public auth:AuthService, private router:Router, private route: ActivatedRoute) {

    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required])
    })
    this.submitted = false;
    this.message = '';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']){
        this.message = 'Please, login.'
      } else if (params['authFailed']) {
        this.message = 'This session is over. Please login again!'
      }
    })
  }
  submit() {
    if (this.form.invalid) return
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe(()=>{
      this.form.reset();
      this.router.navigate(['/admin','dashboard']);
      this.submitted = false;
    },() => {
      this.submitted = false;
      })
  }
}
