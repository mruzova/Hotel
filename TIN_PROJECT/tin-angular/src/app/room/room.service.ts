import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from './room.model';
const url = 'http://localhost:8888/api/rooms'
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient: HttpClient, private router: Router) {}
  getRooms(page:number): Observable<any> {
    this.router.navigate(['rooms'], {queryParams : {page: page}})
    return this.httpClient.get<Room[]>(url + "?page=" + page);
  }
}
