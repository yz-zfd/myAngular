import {Component, OnInit} from '@angular/core';
import {Driver, IDriver} from '../drivers';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {OprateTipsModalComponent} from '../oprate-tips-modal/oprate-tips-modal.component';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import {UploadXHRArgs} from 'ng-zorro-antd';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})

export class DriverDetailComponent implements OnInit {


  //这个值是由BsModalRef注入的，在本类构造中
  driverSource:IDriver;
  //这里由于使用了双向绑定，需要设置一个copy对象，不然会实时更改数据（针对修改不提交的情况）
  driver: IDriver;
  modalHeaderText: string;
  modalFooterText: string;
  editorStatus: string;
  file:File;
  //http流
  dataStream:Observable<any>;
  //注入了一个目标modal，和一个modal服务，和一个http服务
  constructor(public modalRef: BsModalRef, private modalService: BsModalService,private http:HttpClient) {
  }
  ngOnInit(): void {
    //拷贝目标对象
    this.driver=new Driver();
    Object.assign(this.driver,this.driverSource);
    //设置图片路径：

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
  checkText: string=null;
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
  }
  //根据数据验证文本是否为空，确定是否提交还是弹出提示modol
  submit() {
    //进行验证数据,先设置checkText为空
    this.checkText = null;
    this.check();
    const initialState = {
      'modalHeaderText': '提示',
      'modalBodyText': this.checkText,
      'modalFooterText': '我知道了',
      'editorStatus': ''
    };
    if (this.checkText != null) {
      this.modalService.show(OprateTipsModalComponent, {initialState, class: 'gray modal-sm'});
    } else {
      //向后台提交前先验证手机号与身份证
      var status;
      this.dataStream=this.http.get("http://localhost:8080/personIdCheck",{params:{"personId":this.driver.person_id,"phoneNumber":this.driver.phone_number,"id":this.driver.id.toString()}});
      //使用流开启订阅,get()方法只是定义了一个请求
      this.dataStream.subscribe(
        (data) => {
          if(data=="personId"){
            this.checkText="身份证重复";
            this.modalService.show(OprateTipsModalComponent, {initialState, class: 'gray modal-sm'});
            return;
          }
          if(data=="phoneNumber"){
            this.checkText="手机号重复";
            this.modalService.show(OprateTipsModalComponent, {initialState, class: 'gray modal-sm'});
            return;
          }
          if(data==""){
            this.submitForm();
            return;
          }
        },
      );
    }
  }
  submitForm(){
    let formData = new FormData();
    formData.append("id",this.driver.id+"")
    formData.append("name",this.driver.name)
    formData.append("nationality",this.driver.nationality)
    formData.append("phone_number",this.driver.phone_number)
    formData.append("marital_status",this.driver.marital_status+"")
    formData.append("person_id",this.driver.person_id)
    formData.append("company",this.driver.company)
    formData.append("sex",this.driver.sex)
    formData.append("foreign_language_ability",this.driver.foreign_language_ability)
    formData.append("birthday",this.driver.birthday.toString())
    formData.append("education",this.driver.education)
    formData.append("file",this.file);
    this.dataStream=this.http.post("http://localhost:8080/operateDriver",formData);
    this.dataStream.subscribe((data)=>{
      //输出结果modal
      const initialState = {
        'modalHeaderText': '提示',
        'modalBodyText': this.checkText,
        'modalFooterText': '我知道了',
        'editorStatus': ''
      };
      if(true){
        this.modalRef.hide();
        this.checkText="操作成功"
      }else{
        this.checkText="操作失败，请重试"
      }
      this.modalService.show(OprateTipsModalComponent, {initialState, class: 'gray modal-sm'});
    })
  }
  //图片上傳
  customReq = (item: UploadXHRArgs) => {
    // Create a FormData here to store files and other parameters.
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('id', '1000');
    const req = new HttpRequest('POST', item.action!, formData, {
      reportProgress: true,
      withCredentials: true
    });
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      err => {
        item.onError!(err, item.file!);
      }
    );
  };
  //图片显示---------------------------------------------------------------------------------------
  photoCut($event) {
//图片加载完后设置大小
    $event.target
    if ($event.target.width>215 || $event.target.height>146){
      //下面只是为了保持图片的比例不让其失真
      if ($event.target.width/$event.target.height>215/146){
        $event.target.width=215;
      }
      else{
        $event.target.height=146;
      }
    }
  }
}
