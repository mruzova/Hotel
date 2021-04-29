import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryItemComponent } from './category/category-list/category-item/category-item.component';
import { HomeComponent } from './home/home.component';
import { GuestComponent } from './guest/guest.component';
import { GuestAddComponent } from './guest/guest-add/guest-add.component';
import { GuestItemComponent } from './guest/guest-item/guest-item.component';


import { RoomComponent } from './room/room.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { RoomItemComponent } from './room/room-list/room-item/room-item.component';
import { AuthGuard } from './auth/auth.guard';
import { DropdownDirective } from './dropdown.directive';
import { BookingComponent } from './room/room-list/room-item/booking/booking.component';
import { BookingListComponent } from './room/room-list/room-item/booking/booking-list/booking-list.component';
import { BookingItemComponent } from './room/room-list/room-item/booking/booking-list/booking-item/booking-item.component';
import { BookingAddComponent } from './room/room-list/room-item/booking/booking-add/booking-add.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { RoomAddComponent } from './room/room-add/room-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  {path: 'rooms', component:RoomComponent,  canActivate: [AuthGuard],children:[
    {path: ':idRoom/addbooking', component:BookingAddComponent, canActivate: [AuthGuard]}
  ] },
  {path: 'reservations', component: BookingListComponent, canActivate:[AuthGuard]},
  {path: 'addguest', component:GuestAddComponent, canActivate: [AuthGuard]},
  {path: 'guest', component:GuestComponent, canActivate: [AuthGuard]},

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    AlertComponent,

    AuthComponent,

    SignupComponent,

    LoginComponent,

    CategoryComponent,

    CategoryListComponent,

    CategoryItemComponent,

    HomeComponent,

    GuestComponent,

    GuestAddComponent,

    GuestItemComponent,

  

 

    RoomComponent,

    RoomListComponent,

    RoomItemComponent,

    DropdownDirective,

    BookingComponent,

    BookingListComponent,

    BookingItemComponent,

    BookingAddComponent,

    CategoryAddComponent,

    RoomAddComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule,  DropdownDirective,],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
