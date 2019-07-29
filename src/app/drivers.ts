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

export class User{
  username:string;
  password:string;
}
export class Driver implements IDriver{
  id: number;
  name: string="";
  nationality: string="";
  phone_number: string="";
  marital_status: boolean=true;
  person_id: string="";
  company: string="";
  sex: string="男";
  foreign_language_ability: string="";
  birthday: Date=new Date();
  education: string="";
  photo: string="default";
}
