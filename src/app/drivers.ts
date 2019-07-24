export interface IDriver {
  id:number;
  name:string;
  nationality:string;
  phone_number:string;
  marital_status:boolean;
  person_id:string;
  company:string;
  sex:string;
  foreign_language_ability:string;
  birthday:Date;
  education:string;
  photo:string;
}
export class Drivers {
  static driverList:IDriver[]=[];
}
