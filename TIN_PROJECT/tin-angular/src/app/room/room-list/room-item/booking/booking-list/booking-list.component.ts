import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token.service';
import { Booking } from '../booking.model';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  reservations: Booking[];
  index: number;
  idUser: number;
  // totalPrice: number;
  constructor(
    private bookingService: BookingService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.onGetReservations();
  }
  onGetReservations() {
    this.idUser = parseInt(this.tokenService.getId());
    this.bookingService.getReservations(this.idUser).subscribe(
      (reservations) => {
        this.reservations = reservations.booking;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteBooking(booking: Booking) {
    this.reservations.splice(this.reservations.indexOf(booking), 1);
  }
  // updateTotal(event, booking: Booking) {
  //   console.log(this.reservations[this.reservations.indexOf(booking)].pricePerNight);
   
  //   this.totalPrice = event;
  //   console.log(this.totalPrice);
  // }
}
