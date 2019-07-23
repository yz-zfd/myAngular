import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

//定义一个数据类型接口，要求所有数据满足这种形式
export interface Data {
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
@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  //是否所有数据都被选中，初始值为未选中
  isAllDisplayDataChecked=false;
  //是否可操作
  isOperating=false;
  //是否部分选中
  isIndeterminate=false;
  //本页显示的数据
  listOfDisplayData:Data[]=[];
  //所有数据
  listOfAllData:Data[]=[];
  //数据是否选中的映射集合，key为数据id，value为是否选中
  mapOfCheckedId:{ [key:string]:boolean }={};
  //初始选中的数据数量。
  numberOfChecked=0;
  //点击翻页之后触发的事件，$event:Data[]意为从该事件中取出翻页后的数据
  currentPageDataChange($event:Data[]):void{
    //将改变后的数据重新赋值给当前显示数据
    this.listOfDisplayData=$event;
    //然后刷新页面
    this.refreshStatus();
  }
  refreshStatus():void{
    /*当前展示的数据是否都被选中(主要用于在字段上的checkbox的ui展示)：首先将页面上所有数据进行过滤1.过滤掉为null的数据，然后判断剩下的数据是否所有
    是否都在mapOfCheckedId[]中(是否全被选中，every()方法返回的应该是boolean类型)。这里将判断集合改为全部数据*/
    this.isAllDisplayDataChecked=this.listOfAllData.
    filter(item=>item).every(item=>this.mapOfCheckedId[item.id]);
    //是否部分数据被选中，下面要做!this.isAllDisplayDataChecked判断的原因在于some()只要找到一个就为true;
    this.isIndeterminate=
      this.listOfAllData.filter(item=>item).some(item=>this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    //获取被选中数据的数量
    this.numberOfChecked = this.listOfAllData.filter(item=>this.mapOfCheckedId[item.id]).length;
  }
  //全选触发的方法：不懂为什么绑定的是checkAll($event),却调到了checkAll(value:boolean)方法
  checkAll(value:boolean):void{
    //将所有本页展示的数据进行遍历，由前端传来的$event事件决定是将mapOfCheckedId中的所有值设为true还是false，然后刷新
    this.listOfAllData.filter(item=>item).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }
  //对数据进行操作后触发的方法
  operateData():void{
    this.isOperating=true;
    setTimeout(() => {
      //在操作后清空选中。
      this.listOfAllData.forEach(item =>(this.mapOfCheckedId[item.id] = false));
      //刷新页面
      this.refreshStatus();
      //将操作状态改为false
      this.isOperating=false;
    },1000);
  }
  //初始化数据
  ngOnInit(): void{
    let j=1900;
    for(let i=0;i<100;i++) {
      this.listOfAllData.push({
        //"张山山","中国","135"+(j+i)+"3588",false,"513022"+(j+i)+"02016694","yz","男","good",new Date(sdf.parse((j+i)+"-02-01").getTime()+24*3600*1000),"本科"
        id:i,
        name:"张山山"+i,
        nationality:"中国",
        phone_number:"135"+(j+i)+"3588",
        marital_status:false,
        person_id:"513022"+(j+i)+"02016694",
        company:"yz",
        sex:"男",
        foreign_language_ability:"good",
        birthday:new Date(),
        education:"九年义务教育",
        photo:"c://"

      })
    }
  }
}


