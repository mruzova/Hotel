import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';
import { Guest } from '../guest.model';
import { GuestService } from '../guest.service';

@Component({
  selector: 'app-guest-item',
  templateUrl: './guest-item.component.html',
  styleUrls: ['./guest-item.component.css'],
})
export class GuestItemComponent implements OnInit {
  guestForm: FormGroup;
  idGuest: number;
  firstName: string;
  lastName: string;
  dob: Date;
  country: string;
  city: string;
  @Output() newGuest = new EventEmitter<Guest>();
  constructor(
    private tokenService: TokenService,
    private guestService: GuestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setGuestId();
    this.initForm();
  }
  setGuestId() {
    const idUser = parseInt(this.tokenService.getId());
    this.guestService.getGuestByUserId(idUser).subscribe(
      (guest) => {
        this.idGuest = guest.guest[0].idGuest;
        this.firstName = guest.guest[0].firstName;
        this.lastName = guest.guest[0].lastName;
        this.dob = guest.guest[0].dateOfBirth;
        this.country = guest.guest[0].country;
        this.city = guest.guest[0].city;
        this.guestForm.get('fname').setValue(this.firstName);
        this.guestForm.get('lname').setValue(this.lastName);
        const gmt01 = new Date(this.dob).setHours(new Date(this.dob).getHours()+1);
        this.guestForm.get('dob').setValue(new Date(gmt01).toISOString().split('T')[0]);
        this.guestForm.get('country').setValue(this.country);
        this.guestForm.get('city').setValue(this.city);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onUpdateGuest() {
    this.firstName = this.guestForm.value.fname;
    this.lastName = this.guestForm.value.lname;
    this.dob = this.guestForm.value.dob;
    this.country = this.guestForm.value.country;
    this.city = this.guestForm.value.city;

    this.guestService
      .storeOrUpdateGuest(
        this.idGuest,
        this.firstName,
        this.lastName,
        this.dob,
        this.country,
        this.city
      )
      .subscribe((res) => {
        console.log(res);

        this.newGuest.emit(res);
      });
  }
  onDeleteGuest() {
    this.guestService.deleteUser(this.idGuest).subscribe(res=>{
      this.router.navigate(['/home']);
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('is_admin');

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
      ]),
    });
  }
}
