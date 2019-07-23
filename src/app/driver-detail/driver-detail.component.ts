import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
/*import {DriverListComponent} from '../driver-list/driver-list.component';*/

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent implements OnInit {
  driverDetail;
  //这里类似注入了一个request请求对象，下面初始化时直接从request中拿值
  constructor(private route:ActivatedRoute,) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>{
      //这里因为直接传的一个data过来应该就不用导入DriverListComponent了
      this.driverDetail=params.get("data.id");
      console.log(this.driverDetail);
    })
    /*this.driverDetail=this.route.snapshot.queryParamMap["data"];
    console.debug(this.driverDetail);*/
  }

}
