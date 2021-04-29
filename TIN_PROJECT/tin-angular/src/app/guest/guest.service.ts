import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guest } from './guest.model';
const url = 'http://localhost:8888/api/guests'
@Injectable({
  providedIn: 'root'
})

export class GuestService {

  guests: Guest[];
  constructor(private httpClient: HttpClient) {}
  storeOrUpdateGuest(idGuest: number, firstName: string, lastName: string, dob: Date, country: string, city:string) {
    return this.httpClient.put<Guest>(url + '/' + idGuest, {
    
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dob,
      country: country,
      city: city,
    });
  }
  getGuestByUserId(idUser: number): Observable<any>{
    return this.httpClient.get<Guest>(url + '/' + idUser);
  }
  deleteUser(idGuest: number){
    return this.httpClient.delete<Guest>(url + '/' + idGuest);
  }
}
