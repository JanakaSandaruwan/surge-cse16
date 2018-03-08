import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ViewbatchesComponent } from './viewbatches/viewbatches.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpModule } from '@angular/http';
import { LoginServiceService } from './login-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders ,HttpClientModule } from '@angular/common/http';
import { LoadbatchesService } from './loadbatches.service';
import { Batch } from './batch';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AdminHomeComponent,
    CreateStudentComponent,
    ViewbatchesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTablesModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'admin', component:AdminComponent, children : [
        { path: '', component: AdminHomeComponent },
        { path: 'viewbatches',component:ViewbatchesComponent},
        { path: 'createstudent',component:CreateStudentComponent}]
      //{ path: '**', component: PageNotFoundComponent }
      }
    ]),
    RouterModule
  ],
  providers: [LoginServiceService, HttpClient, LoadbatchesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
