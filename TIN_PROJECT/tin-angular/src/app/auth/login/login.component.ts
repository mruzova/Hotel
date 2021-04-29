export interface LoginModel {
  email: string;
  password: string;
}
export interface LoginResponse {
  status: string;
  data: any;
  token: string;
  message: string;
  is_admin?:number;
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string = null;
  loginForm: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email;

    const password = this.loginForm.value.password;
    let loginModel: LoginModel = {
      email: email,
      password: password,
    };

    this.login(loginModel).subscribe((res) => {
      if (!res.status) {
        this.error = 'the password or email is invalid';
        this.loginForm.get('password').reset();
      } else{
      this.tokenService.storeToken(res);
      this.router.navigate(['/rooms']);
      }
    });
  }
  login(loginModel: LoginModel) {
    const formData = new FormData();

    formData.append('email', loginModel.email);
    formData.append('password', loginModel.password);
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    var jsondata = JSON.parse(json);

    return this.http.post<LoginResponse>(
      'http://localhost:8888/api/authentication',
      jsondata
    );
  }


  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required,
        Validators.maxLength(255),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255),
      ]),
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onHandleError() {
    this.error = null;
  }
}
