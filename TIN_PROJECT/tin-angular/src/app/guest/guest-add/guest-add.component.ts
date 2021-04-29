import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';

import { Guest } from '../guest.model';
import { GuestService } from '../guest.service';

@Component({
  selector: 'app-guest-add',
  templateUrl: './guest-add.component.html',
  styleUrls: ['./guest-add.component.css'],
})
export class GuestAddComponent implements OnInit {
  guestForm: FormGroup;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  country: string;
  city: string;
idGuest: number;
  @Output() newGuest = new EventEmitter<Guest>();
  constructor(private guestService: GuestService, private router: Router, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.initForm();
    this.setGuestId();
  }
  onSubmit() {
    this.firstName = this.guestForm.value.fname;
    this.lastName = this.guestForm.value.lname;
    this.dateOfBirth = this.guestForm.value.dob;
    this.country = this.guestForm.value.country;
    this.city = this.guestForm.value.city;
  
    this.guestService
      .storeOrUpdateGuest(
        this.idGuest,
        this.firstName,
        this.lastName,
        this.dateOfBirth,
        this.country,
        this.city
      )
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['rooms']);
        this.newGuest.emit(res);
      });
  }
  private initForm() {
    this.guestForm = new FormGroup({
      fname: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-z]+([-][a-zA-Z]+)*'),
        Validators.maxLength(255),
      ]),
      lname: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-z]+([-][a-zA-Z]+)*'),
        Validators.maxLength(255),
      ]),
      dob: new FormControl(null, Validators.required),
      country: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      city: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ])
    });
  }
  setGuestId() {
    const idUser = parseInt(this.tokenService.getId());
    this.guestService.getGuestByUserId(idUser).subscribe(
      (guest) => {
        this.idGuest = guest.guest[0].idGuest;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
