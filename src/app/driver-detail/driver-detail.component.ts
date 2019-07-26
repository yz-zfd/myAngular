import {Component, OnInit} from '@angular/core';
import {IDriver} from '../drivers';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {OprateTipsModalComponent} from '../oprate-tips-modal/oprate-tips-modal.component';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})

export class DriverDetailComponent implements OnInit {

  driver: IDriver;
  modalHeaderText: string;
  modalFooterText: string;
  editorStatus: string;
  //注入了一个目标modal，和一个modal服务，和一个http服务
  constructor(public modalRef: BsModalRef, private modalService: BsModalService,private http:HttpClient) {

  }

  ngOnInit(): void {
  }

  //检查身份证日期格式并设置生日
  checkPersonId(personId: string): boolean {
    var birthdayLongTime = new Date(personId.slice(6, 10) + '-' + personId.slice(10, 12) + '-' + personId.slice(12, 14)).getTime();
    if (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(personId)
      && birthdayLongTime < new Date().getTime()) {
      return true;
    }
    return false;
  }

  //添加一个监听单独设置birthday的值
  setBirthday() {
    if (this.checkPersonId(this.driver.person_id)) {
      this.driver.birthday = new Date(this.driver.person_id.slice(6, 10) + '-' + this.driver.person_id.slice(10, 12) + '-' + this.driver.person_id.slice(12, 14));
      return;
    }
  }

  //定义初始检查文本
  checkText: string;

  check() {
    if (!/^[\u4e00-\u9fa5]{2,16}$/.test(this.driver.name)) {
      this.checkText = '请输入正确的姓名(2-16个汉字)';
      return;
    }
    //验证电话号码
    if (!/^1[3456789]\d{9}$/.test(this.driver.phone_number)) {
      this.checkText = '请输入正确的电话号码！';
      return;
    }
    //验证身份证号
    if (!this.checkPersonId(this.driver.person_id)) {
      this.checkText = '身份证号不合法！';
      return;
    }
    //验证国籍不为空
    if (this.driver.nationality.trim() == '') {
      this.checkText = '国籍不能为空！';
      return;
    }
    //验证公司不为空
    if (this.driver.company.trim() == '') {
      this.checkText = '单位不能为空';
      return;
    }
    //通过请求后台验证一下身份证与号码重复问题

  }

  //根据数据验证文本是否为空，确定是否提交还是弹出提示modol
  submit() {
    //进行验证数据,先设置checkText为空
    this.checkText == null;
    this.check();
    if (this.checkText != null) {
      const initialState = {
        'modalHeaderText': '提示',
        'modalBodyText': this.checkText,
        'modalFooterText': '我知道了',
        'editorStatus': ''
      };
      this.modalService.show(OprateTipsModalComponent, {initialState, class: 'gray modal-sm'});
    } else {
      //向后台提交
    }

  }
}
