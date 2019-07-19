import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  private driverList: Array<DriverList>;
  constructor() { }

  ngOnInit() {
  }
}
/*一般来说这个driverList应该定义成全局的才对*/
export class DriverList {
  name: string ;
}
