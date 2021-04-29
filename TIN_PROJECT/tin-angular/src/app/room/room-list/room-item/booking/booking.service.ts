import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from './booking.model';

const url = 'http://localhost:8888/api/reservations'
@Injectable({
  providedIn: 'root'
})

export class BookingService {

  reservations: Booking[];
  constructor(private httpClient: HttpClient) {}
  storeBooking(idGuest: number, doa: Date, dod: Date, idRoom: number) {
    return this.httpClient.post<Booking>(url, {
      idGuest: idGuest,
      dateOfArrival: doa,
      dateOfDeparture: dod,
      idRoom: idRoom
    });
  }
  getReservations(idUser:number): Observable<any> {
    return this.httpClient.get<Booking[]>(url + '/' + idUser);
  }
  updateBooking(id: number, doa: string, dod: string) {
    return this.httpClient.put<Booking>(url + '/' + id, { dateOfArrival: doa, dateOfDeparture: dod });
  }
  deleteBooking(id:number){
    return this.httpClient.delete<Booking>(url + '/' + id);
  }
}
