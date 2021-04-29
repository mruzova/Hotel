export class Category {
    idCategory: number;
    numberOfBeds: number;
    roomType: string;
    sizeType: string;
    imagePlanUrl: string;
    constructor(obj) {
      Object.assign(this, obj);
    }
  }