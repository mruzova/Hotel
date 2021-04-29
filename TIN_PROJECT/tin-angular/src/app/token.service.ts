import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
export interface AuthResponse {
  status: string;
  data: any;
  token: string;
  message: string;
  is_admin?: number;
}
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  is_admin: boolean;
  constructor(private router: Router) {}
  get hasToken() {
    return !!this.getToken();
  }
  storeToken(response: AuthResponse) {
    localStorage.setItem('token', response.token);

   
    if (response.message === 'authentication succeeded!') {
      localStorage.setItem('is_admin', response.data[0].is_admin.toString());
     
      localStorage.setItem('id', response.data[0].idUser.toString());

    } else if (response.message === 'registration succeeded!') {
 console.log(response.data);
     localStorage.setItem('is_admin', response.is_admin.toString());
      localStorage.setItem('id', response.data.insertId.toString());
    }
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getId() {
    return localStorage.getItem('id');
  }
  getIsAdmin() {
    return localStorage.getItem('is_admin');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('is_admin');
    this.is_admin = false;
    this.router.navigate(['/home']);
  }
}
