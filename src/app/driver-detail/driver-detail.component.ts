import { Component, OnInit } from '@angular/core';
import {DriverListComponent} from '../driver-list/driver-list.component';
import {IDriver, Drivers} from '../drivers';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';


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
  constructor(public modalRef:BsModalRef,private modalService:BsModalService ) {
  }
  ngOnInit(): void {
  }
  //数据验证结果文本
  checkText:string=null;
  check($event){
    var status=true;
    if(status && $event.target.name=="name" && /^[\u4e00-\u9fa5]{2,16}$/.test($event.target.value)){
        this.checkText="请输入正确的姓名（2-16中文汉字）";
        status=false;
    }
    if(status && $event.target.name=="name" && /^[\u4e00-\u9fa5]{2,16}$/.test($event.target.value)){
        this.checkText="请输入正确的姓名（2-16中文汉字）";
        status=false;
    }
    if(status && $event.target.name=="name" && /^[\u4e00-\u9fa5]{2,16}$/.test($event.target.value)){
        this.checkText="请输入正确的姓名（2-16中文汉字）";
        status=false;
    }
    if(status && $event.target.name=="name" && /^[\u4e00-\u9fa5]{2,16}$/.test($event.target.value)){
        this.checkText="请输入正确的姓名（2-16中文汉字）";
        status=false;
    }
    if(status && $event.target.name=="name" && /^[\u4e00-\u9fa5]{2,16}$/.test($event.target.value)){
        this.checkText="请输入正确的姓名（2-16中文汉字）";
        status=false;
    }
    if(status && $event.target.name=="name" && /^[\u4e00-\u9fa5]{2,16}$/.test($event.target.value)){
        this.checkText="请输入正确的姓名（2-16中文汉字）";
        status=false;
    }
  }
  submit(){
    //根据数据验证文本是否为空，确定是否提交还是弹出提示modol
    if (this.checkText!=null){
      const initialState ={
        "modalHeaderText":"提示",
        "modalBodyText":this.checkText,
        "modalFooterText":"我知道了",
        "editorStatus":""
      };
    } else {
      //这里需要提交文本(angular服务)
    }
  }
}
