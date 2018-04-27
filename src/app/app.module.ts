import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from "ag-grid-angular/main";
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadModule } from "angular2-image-upload";
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CreateStudentComponent } from './admin/create-student/create-student.component';
import { ViewbatchesComponent } from './admin/viewbatches/viewbatches.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpModule } from '@angular/http';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';




import { ComplainComponent } from './student/complain/complain.component';
import { ViewAcademicProgressComponent } from './student/view-academic-progress/view-academic-progress.component';
import { MyCourseComponent } from './student/my-course/my-course.component';
import { MedicleLeaveComponent } from './student/medicle-leave/medicle-leave.component';
import { ScholarshipComponent } from './student/scholarship/scholarship.component';
import { HomeComponent } from './student/home/home.component';

import { FilterPipe } from './filter.pipe';
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
import { FeablelistComponent } from './teacher/progresscheck/feablelist/feablelist.component';
import { ModuleComponent } from './teacher/modules/module/module.component';
import { TrueqComponent } from './teacher/quiz/addquiz/trueq/trueq.component';
import { EssayComponent } from './teacher/quiz/addquiz/essay/essay.component';
import { LoadquizService } from './services/loadquiz.service';
import { UploadService } from './services/upload.service';

import { LoginServiceService } from './services/login-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders ,HttpClientModule } from '@angular/common/http';
import { LoadbatchesService } from './services/loadbatches.service';
import { Batch } from './models/batch';
import { Leave } from './models/leave';
import { Grade } from './models/grade';
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
import { CreateComponent } from './teacher/create/create.component';
import { McqComponent } from './teacher/create/mcq/mcq.component';
import { Question } from './models/question';
import { Quiz } from './models/quiz';
import { QuizviewComponent } from './student/quizview/quizview.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { Upload } from './models/upload';
import { UploadserviceService } from './services/uploadservice.service';
import { MessageComponent } from './message/message.component';
import { Msg } from './models/msg';
import { UpdatemessagesService } from './services/updatemessages.service';
import { HrComponent } from './hr/hr.component';
import { ExamdivComponent } from './examdiv/examdiv.component';
import { WelfareComponent } from './welfare/welfare.component';
import { WelfareHomeComponent } from './welfare/welfare-home/welfare-home.component';
import { CreatenoticeComponent } from './welfare/createnotice/createnotice.component';
import { NoticeserviceService } from './services/noticeservice.service';
import { NoticesviewComponent } from './welfare/noticesview/noticesview.component';
import { HrHomeComponent } from './hr/hr-home/hr-home.component';
import { LeaveapproveService } from './services/leaveapprove.service';
import { ViewleaveComponent } from './hr/viewleave/viewleave.component';
import { ExamHomeComponent } from './examdiv/exam-home/exam-home.component';
import { CreateTtComponent } from './examdiv/create-tt/create-tt.component';
import { NewviewComponent } from './newview/newview.component';

@NgModule({
  declarations: [
    AppComponent,
    ComplainComponent,
    ViewAcademicProgressComponent,
    MyCourseComponent,
    MedicleLeaveComponent,
    ScholarshipComponent ,
    HomeComponent,
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
    CreateComponent,
    McqComponent,
    QuizviewComponent,
    UpdateuserComponent,
    MessageComponent,
    HrComponent,
    ExamdivComponent,
    WelfareComponent,
    WelfareHomeComponent,
    CreatenoticeComponent,
    NoticesviewComponent,
    HrHomeComponent,
    ViewleaveComponent,
    ExamHomeComponent,
    CreateTtComponent,
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
    FeablelistComponent,
    FilterPipe,
    ModuleComponent,
    TrueqComponent,
    EssayComponent,
    NewviewComponent
  ],
  entryComponents: [
    McqComponent
  ],
  imports: [
    BrowserModule,
    AngularDateTimePickerModule,
    FormsModule,
    DataTablesModule,
    HttpModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([ ]),
    HttpClientModule,
    ImageUploadModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'admin', component:AdminComponent, children : [
        { path: 'messages' , component : MessageComponent},
        { path: 'home', component: AdminHomeComponent },
        { path: 'viewbatches',component:ViewbatchesComponent},
        { path: 'createstudent',component:CreateStudentComponent},
        { path: 'createTeacher',component:ViewteacherComponent},
        { path: 'createsubject',component:ViewsubjectsComponent},
        { path: 'createemployee',component:ViewemployeesComponent},
        { path: 'updatedetails',component:UpdateuserComponent}]
    //{ path: '**', component: PageNotFoundComponent }
      },
    { path: 'teacher', component:TeacherComponent, children : [
      { path: '', component: TeacherHomeComponent },
      { path: 'progresscheck', component:ProgresscheckComponent},
      {path:'progresscheck/feablelist',component:FeablelistComponent},
      { path: 'admittance', component:AdmittanceComponent},
      { path: 'leaveapplication', component:LeaveapplicationComponent},
      { path: 'leaveapplication/sendleave', component:SendleaveComponent},
      { path: 'leaveapplication/leaveinfo', component:LeaveinfoComponent},
      {path:'quiz',component:QuizComponent},
      {path:'quiz/displaymark',component:DisplaymarkComponent},
      {path:'quiz/addquiz',component:CreateComponent},
      {path:'quiz/addquiz/mcq',component:McqComponent},
      {path:'quiz/addquiz/trueq',component:TrueqComponent},
      {path:'quiz/addquiz/essay',component:EssayComponent},
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
    { path: 'home', component: HomeComponent },
    { path: 'viewprogress', component: ViewAcademicProgressComponent },
    { path: 'mycourses', component: MyCourseComponent },
    { path: 'leave', component: MedicleLeaveComponent },
    { path: 'scholarship', component: ScholarshipComponent },
    { path: 'compain', component: ComplainComponent },
    { path: 'quizview', component:QuizviewComponent}]
  //{ path: '**', component: PageNotFoundComponent }
  },
  { path: 'welfare', component:WelfareComponent, children : [
    /*{ path: '', component: TeacherHomeComponent }*/
    { path: 'home', component:WelfareHomeComponent},
    { path: 'create', component:CreatenoticeComponent},
    { path: 'viewnotices', component:NoticesviewComponent}]
  //{ path: '**', component: PageNo,FoundComponent }
  },
  { path: 'hr', component:HrComponent, children : [
    /*{ path: '', component: TeacherHomeComponent }*/
    { path: 'home', component:HrHomeComponent},
    { path: 'viewleave', component:ViewleaveComponent}]
  //{ path: '**', component: PageNo,FoundComponent }
  },
  { path: 'examdiv', component:ExamdivComponent, children : [
    /*{ path: '', component: TeacherHomeComponent }*/
    { path: 'home', component:ExamHomeComponent},
    { path: 'createTT' , component :CreateTtComponent}]
  //{ path: '**', component: PageNo,FoundComponent }
},
{ path: 'new' , component:NewviewComponent}
    ]),
    RouterModule
  ],
  providers: [UpdatemessagesService,LeaveapproveService, NoticeserviceService, LoadquizService,UploadService, LoginServiceService, HttpClient, LoadbatchesService, LoadteacherService, LoademployeesService , CookieService,  UploadserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
