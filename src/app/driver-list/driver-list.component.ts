import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

export interface Data {
  id:number;
  name:string;
  age:number;
  address:string;
  disabled:boolean;
}
@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  driverDatas=[{
    key:"1",
    name:"zzz",
    age:"17",
    address:"New York No.1 Lake park"
  },
    {
      key:"2",
      name:"zzz",
      age:"17",
      address:"New York No.2 Lake park"
    },
    {
      key:"3",
      name:"zzz",
      age:"17",
      address:"New York No.3 Lake park"
    },
    {
      key:"4",
      name:"zzz",
      age:"17",
      address:"New York No.4 Lake park"
    },
  ]
  constructor() {
  }
  ngOnInit() {

  }
}

