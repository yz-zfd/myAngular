import { Component } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  /*
  这里写出了该组件的html样式代码，可直接使用
  template:
     组件的html代码
  但是为了更好的分离，一般采用下面的方式来引入外部html和css文件
    */
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myfirstAngular';
}
