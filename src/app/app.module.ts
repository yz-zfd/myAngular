import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DriverListComponent} from './driver-list/driver-list.component';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {DriverDetailComponent} from './driver-detail/driver-detail.component';
import {RouterModule} from '@angular/router';
import {ModalModule} from 'ngx-bootstrap/modal';
import {OprateTipsModalComponent} from './oprate-tips-modal/oprate-tips-modal.component';
import { BoolToStringPipe } from './pipe/bool-to-string.pipe';
import { LoginComponent } from './login/login.component';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DriverListComponent,
    DriverDetailComponent,
    OprateTipsModalComponent,
    BoolToStringPipe,
    LoginComponent,
  ],
  entryComponents:[
    OprateTipsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path:'driverList/' , component:DriverListComponent},
    ]),
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
