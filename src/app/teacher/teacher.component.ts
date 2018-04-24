import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
import {CookieService} from 'angular2-cookie/core';
//import {TeacherHomeComponent} from '../teacher/teacher-home/teacher-home.component';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
//  providers:[TeacherHomeComponent]
})
export class TeacherComponent implements OnInit {

  username: string;
  usercode: string;
  fulldata : object = <object>{} ;
  constructor(private logincookie : CookieService , private route: ActivatedRoute, private login : LoginServiceService,private router:Router){}//,private home:TeacherHomeComponent) { }

  ngOnInit() {
    if (!this.logincookie.get("uname")){
      this.router.navigate(['']);
    }
    console.log(this.logincookie.get("uname")+"adsa");
    if (this.login.getloginstatus(this.logincookie.get("uname")) == false){
      this.router.navigate(['']);
    }else{
      this.route.firstChild.params.subscribe(params => {
           console.log(atob(params['details']));
           this.usercode = params['details'];
         this.login.loginteacher(atob(params['details'])).subscribe(data => {
           this.fulldata = data;

           if (this.fulldata == null){
             this.router.navigate(['']);
           }
         });
      });
    }

  }

  logout(){
    this.logincookie.remove("uname");
    this.login.logoutuser(this.fulldata['username']);
    this.router.navigate(['']);
  }

  seeme(){
    console.log(this.fulldata);
  }

  redirecthome(){
    this.router.navigate(['teacher/home',{details: btoa(this.username)}]);
  }

  redirectLeave(){
    this.router.navigate(['teacher/leaveapplication',{details: btoa(this.username)}]);
  }

  redirectModules(){
    this.router.navigate(['teacher/modules',{details: btoa(this.username)}]);
  }


}
