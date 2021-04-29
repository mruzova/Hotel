import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuestService } from 'src/app/guest/guest.service';
import { TokenService } from 'src/app/token.service';
import { Room } from '../../room.model';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.css'],
})
export class RoomItemComponent implements OnInit {
  @Input() index: number;
  @Input() room: Room;
  roomNumber: number;
  show: boolean = false;
  pricePerNight: number;
  imageUrl: string;
  numberOfBeds?: number;
  roomType?: string;
  sizeType?: string;
  idGuest: number;
  fname: string;
  lname: string;
  country: string;
  city: string;
  dob: Date;

  floor: number;
  constructor(
    private router: Router,
    private guestservice: GuestService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.roomNumber = this.room.roomNumber;
    this.pricePerNight = this.room.pricePerNight;
    this.numberOfBeds = this.room.numberOfBeds;
    this.roomType = this.room.roomType;
    this.sizeType = this.room.sizeType;
    this.imageUrl = this.room.imageUrl;
    this.floor = Math.floor(this.roomNumber / 100);
    this.checkGuestData();
  }
  onBook() {
    if (
      this.fname === null &&
      this.lname === null &&
      this.dob === null &&
      this.country === null &&
      this.city === null
    ) {
      this.router.navigate(['addguest']);
    }
    else{
    this.show = true;
    this.router.navigate(['rooms/' + this.room.idRoom + '/addbooking']);
  }
}
  checkGuestData() {
    const idUser = parseInt(this.tokenService.getId());
    this.guestservice.getGuestByUserId(idUser).subscribe(
      (guest) => {
        this.idGuest = guest.guest[0].idGuest;
        this.fname = guest.guest[0].firstName;
        this.lname = guest.guest[0].lastName;
        this.dob = guest.guest[0].dateOfBirth;
        this.country = guest.guest[0].country;
        this.city = guest.guest[0].city;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
