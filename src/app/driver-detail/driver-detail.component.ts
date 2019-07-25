import { Component, OnInit } from '@angular/core';
import {DriverListComponent} from '../driver-list/driver-list.component';
import {IDriver, Drivers} from '../drivers';
import {BsModalRef} from 'ngx-bootstrap';


@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent implements OnInit {

  driver:IDriver;
  modalHeaderText:string;
  modalFooterText:string;
  editorStatus:string;
  constructor(public modalRef:BsModalRef) {
  }
  ngOnInit(): void {
  }
}
