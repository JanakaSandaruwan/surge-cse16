import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
import {CookieService} from 'angular2-cookie/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {  UploadserviceService } from '../services/uploadservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  fulldata : object = <object>{} ;
  usercode : string;
  state : string = "minimized";
  dropdownstate : string = "collapsed";
  username: string;
  profileurl: string;
  constructor(private  uploadService: UploadserviceService, private storage:LocalStorageService, private route: ActivatedRoute, private login : LoginServiceService, private router: Router, private logincookie : CookieService) { }

  movedown(){
      console.log("dad");
      if (this.dropdownstate == "collapsed"){
        $('.dropdown-menu').first().stop(true, true).slideDown();
        this.dropdownstate = "down";
      }else{
        $('.dropdown-menu').first().stop(true, true).slideUp();
        this.dropdownstate = "collapsed";
      }

  }

  moveup(){
    console.log("dad");
    if (this.dropdownstate == "collapsed"){
      $('.dropdown-menu').first().stop(true, true).slideDown();
      this.dropdownstate = "down";
    }else{
      $('.dropdown-menu').first().stop(true, true).slideUp();
      this.dropdownstate = "collapsed";
    }
  }
  togglenav(){
    if (this.state == "expanded") {
        $('.sidebar').css('margin-left', '-190px');
        $('#main-wrapper').css('margin-left', '60px');
        $('.menu-icon').css('float','none');
        $('.menu-icon').css('position','absolute');
        $('.large-icon').css('padding-left','15px');
        $('.small-icon').css('padding-left','18px');
        $('.menu-icon').css('right','0');
        this.state = "minimized";
    } else {
        if (this.state == "minimized") {
            $('.sidebar').css('margin-left', '0px');
            //$('#main-wrapper').css('margin-left', '250px');
            $('.menu-icon').css('float','left');
            $('.menu-icon').css('position','relative');
            $('.large-icon').css('padding-left','0px');
            $('.small-icon').css('padding-left','0px');
            this.state = "expanded";
        }
    }
  }

  ngOnInit() {
    this.username = this.storage.retrieve("uname");
    if (!this.storage.retrieve("uname")){
      console.log("x");
      this.router.navigate(['']);
    }
    console.log(this.storage.retrieve("uname")+"adsa");
    if (this.login.getloginstatus(this.storage.retrieve("uname")) == false){
      console.log("y");
      this.router.navigate(['']);
    }else{
      this.uploadService.getUrl(this.storage.retrieve("uname")).subscribe(data => {
        this.profileurl = data;
        console.log(this.profileurl);
      });
      this.route.firstChild.params.subscribe(params => {
           console.log(atob(params['details']));
           this.usercode = params['details'];
         this.login.loginemployee(atob(params['details'])).subscribe(data => {
           this.fulldata = data;

           if (this.fulldata == null){
             this.router.navigate(['']);
           }
         });
      });
    }

  }

  logout(){
    this.storage.clear();
    this.login.logoutuser(this.fulldata['username']);
    this.router.navigate(['']);
  }
  changedata(){
    this.router.navigate(['admin/updatedetails', {details : this.usercode}]);
  }

  gotohome(){
    this.router.navigate(['admin/home', {details : this.usercode}]);
  }


  gotoVS(){
    this.router.navigate(['admin/createstudent', {details : this.usercode}]);
  }

  gotoVT(){
    this.router.navigate(['admin/createTeacher', {details : this.usercode}]);
  }

  gotoVE(){
    this.router.navigate(['admin/createemployee', {details :this.usercode}]);
  }

  gotoVSub(){
    this.router.navigate(['admin/createsubject', {details : this.usercode}]);
  }

}
