import {Component, OnInit, TemplateRef} from '@angular/core';
import {NzTableModule} from 'ng-zorro-antd/table';
import {IDriver, Drivers, Driver} from '../drivers';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {DriverDetailComponent} from '../driver-detail/driver-detail.component';
import {initialState} from 'ngx-bootstrap/timepicker/reducer/timepicker.reducer';
import {OprateTipsModalComponent} from '../oprate-tips-modal/oprate-tips-modal.component';
import {driverInformations} from '../driverInformations';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

//定义一个数据类型接口，要求所有数据满足这种形式

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  //是否所有数据都被选中，初始值为未选中
  isAllDisplayDataChecked = false;
  //是否可操作
  isOperating = false;
  //是否部分选中
  isIndeterminate = false;
  //本页显示的数据
  listOfDisplayData: IDriver[] = [];
  //所有数据对象
  listOfAllData: IDriver[] = [];
  //被选中的数据id集合
  listOfCheckedData: IDriver[] = [];
  //数据是否选中的映射集合，key为数据id，value为是否选中
  mapOfCheckedId: { [key: string]: boolean } = {};
  //初始选中的数据数量。
  numberOfChecked = 0;
  //http流
  dataStream: Observable<any>;
  //------------------------------------modal------------------------------------//
  modalRef: BsModalRef;

  //注入BsModalService对象
  constructor(private modalService: BsModalService, private http: HttpClient) {
  }

  //前端传递参数可以不在意名称，下面必须在意类似键值对的方式
  openDetailModal(driverInfo: IDriver) {
    //将一条记录发过来，是一条记录所以是IDriver类型,值得注意是下面的"driver"应当在目标modal中有相应的属性名
    const initialState = {
      'modalHeaderText': '详情(只读)',
      'driverSource': driverInfo,
      'modalFooterText': '不可更改',
      'editorStatus': true
    };
    this.modalRef = this.modalService.show(DriverDetailComponent, {initialState, class: 'gray modal-lg'});
  }

  addDriver() {
    const initialState = {
      'modalHeaderText': '添加(*必填)',
      'driverSource': new Driver(),
      'modalFooterText': '点击提交',
      'editorStatus': false
    };
    this.modalRef = this.modalService.show(DriverDetailComponent, {initialState, class: 'gray modal-lg'});
  }

  editorDriver() {
    if (this.listOfCheckedData.length == 1) {
      const initialState = {
        'modalHeaderText': '编辑页',
        'driverSource': this.listOfCheckedData[0],
        'modalFooterText': '提交更改',
      };
      this.modalRef = this.modalService.show(DriverDetailComponent, {initialState, class: 'gray modal-lg'});
    } else {
      const initialState = {
        'modalHeaderText': '提示信息',
        'modalBodyText': '请选择一条记录进行编辑',
        'modalFooterText': '我知道了',
      };
      this.modalRef = this.modalService.show(OprateTipsModalComponent, {initialState, class: 'gray modal-sm'});
    }
  }

  //--------------------------------------modal----------------------------------//

  //点击翻页之后触发的事件，$event:Data[]意为从该事件中取出翻页后的数据
  currentPageDataChange($event: IDriver[]): void {
    //将改变后的数据重新赋值给当前显示数据
    this.listOfDisplayData = $event;
    //然后刷新页面
    this.refreshStatus();
  }

  refreshStatus(): void {
    /*当前展示的数据是否都被选中(主要用于在字段上的checkbox的ui展示效果)：首先将页面上所有数据进行过滤1.过滤掉为null的数据，然后判断剩下的数据是否所有
    是否都在mapOfCheckedId[]中(是否全被选中，every()方法返回的应该是boolean类型)。这里将判断集合改为全部数据*/
    this.isAllDisplayDataChecked = this.listOfAllData.filter(item => item).every(item => this.mapOfCheckedId[item.id]);
    //是否部分数据被选中，下面要做!this.isAllDisplayDataChecked判断的原因在于some()只要找到一个就为true;
    this.isIndeterminate =
      this.listOfAllData.filter(item => item).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    //获取被选中数据的数量,选出那些为true的
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
    this.listOfCheckedData = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]);
  }

  //全选触发的方法：不懂为什么绑定的是checkAll($event),却调到了checkAll(value:boolean)方法
  checkAll(value: boolean): void {
    //将所有本页展示的数据进行遍历，由前端传来的$event事件决定是将mapOfCheckedId中的所有值设为true还是false，然后刷新
    this.listOfAllData.filter(item => item).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  //初始化数据
  ngOnInit(): void {
    this.dataStream=this.http.get("http://localhost:8080/getAllDriver");
    this.dataStream.subscribe(
      (data)=>{
        this.listOfAllData=data;
      }
    )
  }
}


