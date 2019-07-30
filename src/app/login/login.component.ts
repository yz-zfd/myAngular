import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../drivers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user1: User;
  //下面这个只是用于验证的，真证的数据还是要用绑定才行
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
  };

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      usernameC: [null, [Validators.required]],
      passwordC: [null, [Validators.required]],
      remember: [true]
    });
  }

  dataStream: Observable<any>;

  submitForm(): void {
    var loginStatus;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    //this.dataStream=this.http.post("http://localhost:8080/loginOfAngular",JSON.stringify({"username":"root","password":"123456"}),{headers:{'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"}});
    //this.dataStream=this.http.post("http://localhost:8080/loginOfAngular",null,{headers:{'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"},params:{"username":"root","password":"123456"}})
    //this.dataStream.subscribe((data)=>{})
    if (true) {
      this.router.navigateByUrl('driverList/');
    } else {
      console.debug('ssssd');
    }
  }
}
