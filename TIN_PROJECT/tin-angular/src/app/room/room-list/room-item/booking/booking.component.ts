import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/room/room.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  @Input() room: Room;
  constructor() { }

  ngOnInit(): void {
 
  }

}
