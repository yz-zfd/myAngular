import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-oprate-tips-modal',
  templateUrl: './oprate-tips-modal.component.html',
  styleUrls: ['./oprate-tips-modal.component.css']
})
export class OprateTipsModalComponent implements OnInit {
  modalHeaderText:string;
  modalBodyText:string;
  modalFooterText:string;
  constructor(public modalRef:BsModalRef) { }

  ngOnInit() {
  }

}
