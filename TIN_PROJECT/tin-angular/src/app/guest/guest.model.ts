export class Guest {
  idGuest: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  country: string;
  city: string;
  email: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}
