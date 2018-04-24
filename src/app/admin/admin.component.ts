import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  fulldata : object = <object>{} ;
  usercode : string;
  constructor(private route: ActivatedRoute, private login : LoginServiceService, private router: Router, private logincookie : CookieService) { }

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
    this.logincookie.remove("uname");
    this.login.logoutuser(this.fulldata['username']);
    this.router.navigate(['']);
  }
  changedata(){
    this.router.navigate(['admin/updatedetails', {details : this.usercode}]);
  }

}
