import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from "ag-grid-angular/main";
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CreateStudentComponent } from './admin/create-student/create-student.component';
import { ViewbatchesComponent } from './admin/viewbatches/viewbatches.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpModule } from '@angular/http';
import { LoginServiceService } from './services/login-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders ,HttpClientModule } from '@angular/common/http';
import { LoadbatchesService } from './services/loadbatches.service';
import { Batch } from './models/batch';
import { ViewteacherComponent } from './admin/viewteacher/viewteacher.component';
import { Teacher } from './models/teacher';
import { LoadteacherService } from './services/loadteacher.service';
import { Subject } from './models/subject';
import { ViewsubjectsComponent } from './admin/viewsubjects/viewsubjects.component';
import { Employee } from './models/employee';
import { LoademployeesService } from './services/loademployees.service';
import { ViewemployeesComponent } from './admin/viewemployees/viewemployees.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherHomeComponent } from './teacher/teacher-home/teacher-home.component';
import { ProgresscheckComponent } from './teacher/progresscheck/progresscheck.component';
import { ViewuserdataComponent } from './viewuserdata/viewuserdata.component';
import { CreateComponent } from './teacher/create/create.component';
import { McqComponent } from './teacher/create/mcq/mcq.component';
import { Question } from './models/question';
import { Quiz } from './models/quiz';
import { QuizviewComponent } from './student/quizview/quizview.component';
import { LeaveapplicationComponent } from './teacher/leaveapplication/leaveapplication.component';
import { QuizComponent } from './teacher/quiz/quiz.component';
import { AddmarkComponent } from './teacher/quiz/addmark/addmark.component';
import { DisplaymarkComponent } from './teacher/quiz/displaymark/displaymark.component';
import { AddquizComponent } from './teacher/quiz/addquiz/addquiz.component';
import { AdmittanceComponent } from './teacher/admittance/admittance.component';
import { StudymaterialComponent } from './teacher/studymaterial/studymaterial.component';
import { SendleaveComponent } from './teacher/leaveapplication/sendleave/sendleave.component';
import { LeaveinfoComponent } from './teacher/leaveapplication/leaveinfo/leaveinfo.component';
import { ModulesComponent } from './teacher/modules/modules.component';
import { ViewadmittanceComponent } from './teacher/admittance/viewadmittance/viewadmittance.component';
import { AddaddmitanceComponent } from './teacher/admittance/addaddmitance/addaddmitance.component';
import { ProgresslistComponent } from './teacher/progresscheck/progresslist/progresslist.component';
import { FeablelistComponent } from './teacher/progresscheck/feablelist/feablelist.component';
import { FilterPipe } from './filter.pipe';
import { ModuleComponent } from './teacher/modules/module/module.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AdminHomeComponent,
    CreateStudentComponent,
    ViewbatchesComponent,
    ViewteacherComponent,
    ViewsubjectsComponent,
    ViewemployeesComponent,
    StudentComponent,
    TeacherComponent,
    TeacherHomeComponent,
    ProgresscheckComponent,
    ViewuserdataComponent,
    CreateComponent,
    McqComponent,
    QuizviewComponent,
    LeaveapplicationComponent,
    QuizComponent,
    AddmarkComponent,
    DisplaymarkComponent,
    AddquizComponent,
    AdmittanceComponent,
    StudymaterialComponent,
    SendleaveComponent,
    LeaveinfoComponent,
    ModulesComponent,
    ViewadmittanceComponent,
    AddaddmitanceComponent,
    ProgresslistComponent,
    FeablelistComponent,
    FilterPipe,
    ModuleComponent
  ],
  entryComponents: [
    McqComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTablesModule,
    HttpModule,
    AgGridModule.withComponents([ ]),
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'admin', component:AdminComponent, children : [
        { path: 'home', component: AdminHomeComponent },
        { path: 'viewbatches',component:ViewbatchesComponent},
        { path: 'createstudent',component:CreateStudentComponent},
        { path: 'createTeacher',component:ViewteacherComponent},
        { path: 'createsubject',component:ViewsubjectsComponent},
        { path: 'createemployee',component:ViewemployeesComponent}]
    //{ path: '**', component: PageNotFoundComponent }
      },
    { path: 'teacher', component:TeacherComponent, children : [
      { path: '', component: TeacherHomeComponent },
      { path: 'progresscheck', component:ProgresscheckComponent},
      {path:'progresscheck/progresslist',component:ProgresslistComponent},
      {path:'progresscheck/feablelist',component:FeablelistComponent},
      { path: 'admittance', component:AdmittanceComponent},
      { path: 'leaveapplication', component:LeaveapplicationComponent},
      { path: 'leaveapplication/sendleave', component:SendleaveComponent},
      {path:'quiz',component:QuizComponent},
      {path:'quiz/displaymark',component:DisplaymarkComponent},
      {path:'quiz/addquiz',component:AddquizComponent},
      { path: 'modules', component:ModulesComponent},
      { path: 'modules/module', component:ModuleComponent},
      {path:'studymaterial',component:StudymaterialComponent},
      {path:'create',component:CreateComponent},
      {path:'create/mcq',component:McqComponent},
      { path: 'quizes', component:CreateComponent}]
    //{ path: '**', component: PageNotFoundComponent }
  },
  { path: 'teacher/:details', component:TeacherComponent, children : [
    { path: '', component: TeacherHomeComponent },
    { path: 'progresscheck', component:ProgresscheckComponent}]
  //{ path: '**', component: PageNotFoundComponent }
  },

  { path: 'student', component:StudentComponent, children : [
    /*{ path: '', component: TeacherHomeComponent },*/
    { path: 'quizview', component:QuizviewComponent}]
  //{ path: '**', component: PageNotFoundComponent }
  },
    ]),
    RouterModule
  ],
  providers: [LoginServiceService, HttpClient, LoadbatchesService, LoadteacherService, LoademployeesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
/*,children:[
        { path: 'addquiz', component:AddquizComponent},
        { path: 'displaymark', component:DisplaymarkComponent},
        { path: 'addmark', component:AddmarkComponent},


      ]

, children: [
        { path: 'sendleave', component:SendleaveComponent},
        { path: 'leaveinfo', component:LeaveinfoComponent}
      ]
      */
