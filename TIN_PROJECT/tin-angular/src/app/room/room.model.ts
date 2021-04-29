export class Room {
    idRoom: number;
    idCategory: number;
    roomNumber: number;
    pricePerNight: number;
    // created to get the result of connected tables: room, category
    numberOfBeds?: number;
    roomType?: string;
    sizeType?: string;
    imageUrl?: string;
    constructor(obj) {
      Object.assign(this, obj);
    }
  }