import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Booking } from '../../booking.model';
import { BookingService } from '../../booking.service';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.css'],
})
export class BookingItemComponent implements OnInit {
  @Output() oldBooking = new EventEmitter<Booking>();
  @Input() index: number;
  @Input() booking: Booking;
  doa: string;
  dod: string;

  error: string = null;
  pricePerNight?: number;
  roomNumber?: number;
  totalPrice?: number;
  @Output() newTotal = new EventEmitter<number>();
  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.doa = new Date(this.booking.dateOfArrival).toDateString();
    this.dod = new Date(this.booking.dateOfDeparture).toDateString();
    this.roomNumber = this.booking.roomNumber;
    this.pricePerNight = this.booking.pricePerNight;
    let timeDiff = new Date(this.dod).getTime() - new Date(this.doa).getTime();
    let daysBetween = timeDiff / (1000 * 3600 * 24);
    this.totalPrice = this.pricePerNight * daysBetween;
  
   
  }
  onUpdateBooking() {
    var gmt01a = new Date(this.doa).setHours(new Date(this.doa).getHours()+2);
    var gmt01d = new Date(this.dod).setHours(new Date(this.dod).getHours()+2);
    if(gmt01a>=gmt01d){
      this.error="date of arrival must be earlier than departure. change the dates and try again!";
    } else{
    this.bookingService
      .updateBooking(
        this.booking.idBooking,
         // new Date(this.doa).toLocaleString('en-US', { timeZone: 'Europe/Warsaw' }) didn't work out, was date with the day before actual (wrong gmt):(
        new Date(gmt01a).toISOString().split('T')[0],
        new Date(gmt01d).toISOString().split('T')[0]
      )
      .subscribe((res) => {
        window.location.reload();  
    });
  }
  }
  onDeleteBooking() {
    this.bookingService
      .deleteBooking(this.booking.idBooking)
      .subscribe((res) => {
        console.log(res);
        this.oldBooking.emit(res);
      });
  }
  onHandleError(){
    this.error=null;
  }
}
