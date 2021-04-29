import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuestService } from 'src/app/guest/guest.service';
import { Room } from 'src/app/room/room.model';
import { TokenService } from 'src/app/token.service';
import { Booking } from '../booking.model';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-add',
  templateUrl: './booking-add.component.html',
  styleUrls: ['./booking-add.component.css']
})
export class BookingAddComponent implements OnInit {
  @Input() room: Room;
  bookingForm: FormGroup;
  idRoom: number;
  dateOfArrival: Date;
  idGuest: number;
  dateOfDeparture: Date;
  
  @Output() newBooking = new EventEmitter<Booking>();
  constructor(private bookingService: BookingService, private guestservice: GuestService, private tokenService:TokenService) {}

  ngOnInit(): void {
    
    this.initForm();
    this.getGuestId();
    
  }
  onSubmit() {
    this.idRoom = this.room.idRoom; 
    this.dateOfArrival = this.bookingForm.value.doa;
    this.dateOfDeparture= this.bookingForm.value.dod;

    this.bookingService
      .storeBooking(
        this.idGuest,
        this.dateOfArrival,
        this.dateOfDeparture,
        this.idRoom,
     
      )
      .subscribe((res) => {
        alert('You have booked the room:) You can check your reservation(s) in Manage -> Reservations');
        this.newBooking.emit(res);
      });
  }
  private initForm() {
    this.bookingForm = new FormGroup({
      doa: new FormControl(null, Validators.required),
      dod: new FormControl(null, Validators.required),
    },this.dateLessThan('doa', 'dod'));
  }
getGuestId(){
  const idUser = parseInt(this.tokenService.getId());
  this.guestservice.getGuestByUserId(idUser).subscribe(
    (guest) => {
      this.idGuest = guest.guest[0].idGuest;
      
    },
    (error) => {
      console.log(error);
    }
  );
}
private dateLessThan(from: string, to: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let f = group.controls[from];
    let t = group.controls[to];
    if (f.value >= t.value) {
      return {
        dates: "Date from should be less than Date to"
      };
    }
    return {};
  }
}
}
