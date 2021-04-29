import { Component, OnInit } from '@angular/core';
import { Room } from '../room.model';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  rooms: Room[];
  index: number;
  idRoom: number;
  currentPage: number=1;
  
  pages: number[] = [];
  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.onGetRooms(this.currentPage); 
  }
  onGetRooms(page?:number) {
    this.currentPage = page
    this.roomService.getRooms(page).subscribe(
      (rooms) => {
        this.rooms = rooms.rooms;
        this.pages.length = Math.ceil(rooms.count.total_rows/5); //5 because 5 elements of the list must be on one page 
        
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  setIdRoom(i: number){
    this.idRoom = this.rooms[i].idRoom;
    //console.log(this.idRoom);
  }
}
