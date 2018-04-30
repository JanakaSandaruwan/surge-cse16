import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-welfare',
  templateUrl: './welfare.component.html',
  styleUrls: ['./welfare.component.css']
})
export class WelfareComponent implements OnInit {
  state : string = "expanded";
  dropdownstate : string = "collapsed";
  username: string;
  usercode: string;
  fulldata : object = <object>{} ;
  constructor(private storage:LocalStorageService, private route: ActivatedRoute, private login : LoginServiceService,private router:Router) { }

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
  togglenav(){
    if (this.state == "expanded") {
        $('.sidebar').css('margin-left', '-190px');
        $('#main-wrapper').css('margin-left', '60px');
        $('.menu-icon').css('float','none');
        $('.menu-icon').css('position','absolute');
        $('.menu-icon').css('right','0');
        this.state = "minimized";
    } else {
        if (this.state == "minimized") {
            $('.sidebar').css('margin-left', '0px');
            $('#main-wrapper').css('margin-left', '250px');
            $('.menu-icon').css('float','left');
            $('.menu-icon').css('position','relative');
            this.state = "expanded";
        }
    }
  }
  ngOnInit() {

    if (!this.storage.retrieve("uname")){
      console.log("x");
      this.router.navigate(['']);
    }
    console.log(this.storage.retrieve("uname")+"adsa");
    if (this.login.getloginstatus(this.storage.retrieve("uname")) == false){
      console.log("y");
      this.router.navigate(['']);
    }else{
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
    this.storage.clear("uname");
    this.login.logoutuser(this.fulldata['username']);
    this.router.navigate(['']);
  }

}
