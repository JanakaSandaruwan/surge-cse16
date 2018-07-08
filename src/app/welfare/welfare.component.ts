import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-welfare',
  templateUrl: './welfare.component.html',
  styleUrls: ['./welfare.component.css']
})
export class WelfareComponent implements OnInit {
  state : string = "minimized";
  dropdownstate : string = "collapsed";
  username: string;
  usercode: string;
  fulldata : object = <object>{} ;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  constructor(private location: Location,private storage:LocalStorageService, private route: ActivatedRoute, private login : LoginServiceService,private router:Router) { }

  movedown(){
      if (this.dropdownstate == "collapsed"){
        $('.dropdown-menu').first().stop(true, true).slideDown();
        this.dropdownstate = "down";
      }else{
        $('.dropdown-menu').first().stop(true, true).slideUp();
        this.dropdownstate = "collapsed";
      }

  }

  changedata(){
    this.router.navigate(['welfare/updatedetails', {details : this.usercode}]);
  }


  moveup(){
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
      $('.large-icon').css('padding-left','15px');
      $('.small-icon').css('padding-left','18px');
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
    this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((ev:any) => {
            if (ev instanceof NavigationStart) {
                if (ev.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (ev instanceof NavigationEnd) {
                if (ev.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
    this.username = this.storage.retrieve("uname");
    if (!this.storage.retrieve("uname")){
      this.router.navigate(['']);
    }
    if (this.login.getloginstatus(this.storage.retrieve("uname")) == false){
      this.router.navigate(['']);
    }else{
      this.route.firstChild.params.subscribe(params => {
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

  gotoNN(){
    this.router.navigate(['welfare/create' , {details : this.usercode}]);
  }

  gotoHome(){
    this.router.navigate(['welfare/home' , {details : this.usercode}]);
  }

  gotoVN(){
    this.router.navigate(['welfare/viewnotices', {details : this.usercode}]);
  }

  logout(){
    this.storage.clear("uname");
    this.login.logoutuser(this.fulldata['username']);
    this.router.navigate(['']);
  }

}
