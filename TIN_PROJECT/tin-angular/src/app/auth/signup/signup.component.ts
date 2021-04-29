export interface SignupModel {

  name: string;
  email: string;
  password: string;

}
export interface SignupResponse{
  status: string,
  data: any,
  token: string,
  message: string;
  is_admin?: number;
}

import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  error: string = null;
  signupForm: FormGroup;
  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {}


  ngOnInit(): void {
  
    this.initForm();
  }
  
onSubmit(){
  if (!this.signupForm.valid) {
    return;
  }

  const email = this.signupForm.value.email;
  const name = this.signupForm.value.name;
  const password = this.signupForm.value.password;
  let signupModel: SignupModel = {
    
    name: name,
    email: email,
    password: password
  };
 
this.signup(signupModel).subscribe(
  (res)=>{    
    if(!res.status){
    this.signupForm.get('email').reset();
    this.error = 'user with this email is already signed up!';
    } else{
    this.tokenService.storeToken(res);
    this.router.navigate(['/rooms']);
    }
  });
}
signup(signupModel: SignupModel) {

  const formData = new FormData();
  formData.append('name', signupModel.name);
  formData.append('email', signupModel.email);
  formData.append('password', signupModel.password);
  var object = {};
  formData.forEach(function(value, key){
      object[key] = value;
  });
  var json = JSON.stringify(object);
  var jsondata = JSON.parse(json);

  
  return this.http.post<SignupResponse>('http://localhost:8888/api/registration', jsondata);
}
private initForm() {
  this.signupForm = new FormGroup(
    {
    
      email: new FormControl(null, [
        Validators.email,
        Validators.required,
        Validators.maxLength(255),
      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255),
      ])
    }
  );
}
get f() {
  return this.signupForm.controls;
}
onHandleError(){
  this.error=null;
}
}
