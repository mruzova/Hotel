export class Booking {
    idBooking: number;
    idGuest: number;
    dateOfArrival: Date;
    dateOfDeparture: Date;
    idRoom: number;
    roomNumber? : number;
    pricePerNight? : number;
    
    constructor(obj) {
      Object.assign(this, obj);
    }
  }
  