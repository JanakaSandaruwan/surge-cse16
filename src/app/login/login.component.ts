import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
import {CookieService} from 'angular2-cookie/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uname : string;
  pass : string;
  usrdata : any;
  fulldata : any;
  constructor(private lservice : LoginServiceService, private router:Router, private logincookie : CookieService, private storage:LocalStorageService ) { }

  ngOnInit() {
    this.storage.observe('key')
            .subscribe((value) => console.log('new value', value));
    var x = this.logincookie.get("uname");
    if(x){
      if(this.logincookie.get("role") == "admin"){
        this.router.navigate(['admin/home',{details: btoa(x)}]);
      }else{

      }this.router.navigate(['teacher/home',{details: btoa(x)}]);

    }
  }


  Auth(): void {
    this.lservice.login(this.uname,this.pass).subscribe(data => {
      this.usrdata = data;
      if (this.usrdata == null){
        console.log("invalid username");
        $('#wronguname').css('display', 'block');
      }else if (this.usrdata.Password != this.pass){
        console.log("invalid Password", this.usrdata.password , this.pass);
        $('#wronguname').css('display', 'block');
      }else{
        /*if (this.usrdata.role == "teacher"){
          this.router.navigate(['teacher/',{details: btoa(this.uname)}]);
        }
        if(this.usrdata.role == "'ExamDiv'"){
          this.lservice.loginemployee(this.uname).subscribe(data => {
            this.fulldata = data;
            console.log(data);
          });
        }*/ // after examdiv and teacher are completed
        console.log(this.usrdata);
        if(this.usrdata.role == "'admin'" || this.usrdata.role == "admin"){

          this.lservice.loginemployee(this.uname).subscribe(data=>{
            this.fulldata = data;
            console.log(this.fulldata);
            this.storage.store('econtact', this.fulldata.econtact);
            if(this.fulldata.bday != undefined){
              this.storage.store('byear', this.fulldata.bday.year);
              this.storage.store('bmonth', this.fulldata.bday.month);
              this.storage.store('bdate', this.fulldata.bday.day);
            }else{
              this.storage.store('byear', undefined);
              this.storage.store('bmonth', undefined);
              this.storage.store('bdate', undefined);
            }
            this.storage.store('NIC', this.fulldata.NIC);
            this.storage.store('contact', this.fulldata.contact);
            this.storage.store('email', this.fulldata.email);
            this.storage.store('fname', this.fulldata.fname);
            this.storage.store('Address', this.fulldata.Address);
          });
          this.lservice.loginuser(this.uname);
          this.storage.store("uname",this.uname);
          this.storage.store("role",this.usrdata.role);

          this.router.navigate(['admin/home',{details: btoa(this.uname)}]);
        }else if(this.usrdata.role == "teacher"){
          this.lservice.loginteacher(this.uname).subscribe(data=>{
            this.fulldata = data;
            console.log(data.Address);
            this.logincookie.put("econtact",this.fulldata.econtact);
            if(this.fulldata.bday != undefined){
              this.logincookie.put("byear",this.fulldata.bday.year);
              this.logincookie.put("bmonth",this.fulldata.bday.month);
              this.logincookie.put("bdate",this.fulldata.bday.day);
            }else{
              this.storage.store('byear', undefined);
              this.storage.store('bmonth', undefined);
              this.storage.store('bdate', undefined);
            }
            this.logincookie.put("NIC", this.fulldata.NIC);
            this.logincookie.put("contact", this.fulldata.contact);
            this.logincookie.put("email", this.fulldata.email);
            this.logincookie.put("fname", this.fulldata.fname);
            this.logincookie.put("Address", this.fulldata.Address);
          });
          this.lservice.loginuser(this.uname);
          this.storage.store("uname",this.uname);
          this.storage.store("role",this.usrdata.role);

          this.router.navigate(['teacher/home',{details: btoa(this.uname)}]);
        }else if(this.usrdata.role == "Welfare"){
          this.lservice.loginemployee(this.uname).subscribe(data=>{
            this.fulldata = data;
            console.log(this.fulldata);
            this.storage.store('econtact', this.fulldata.econtact);
            if(this.fulldata.bday != undefined){
              this.storage.store('byear', this.fulldata.bday.year);
              this.storage.store('bmonth', this.fulldata.bday.month);
              this.storage.store('bdate', this.fulldata.bday.day);
            }else{
              this.storage.store('byear', undefined);
              this.storage.store('bmonth', undefined);
              this.storage.store('bdate', undefined);
            }
            this.storage.store('NIC', this.fulldata.NIC);
            this.storage.store('contact', this.fulldata.contact);
            this.storage.store('email', this.fulldata.email);
            this.storage.store('fname', this.fulldata.fname);
            this.storage.store('Address', this.fulldata.Address);
          });
          this.lservice.loginuser(this.uname);
          this.storage.store("uname",this.uname);
          this.storage.store("role",this.usrdata.role);

          this.router.navigate(['welfare/home',{details: btoa(this.uname)}]);
        }else if(this.usrdata.role == "student"){
          console.log(this.usrdata.bnumber);
          this.storage.store('bnumber', this.usrdata.bnumber);
          this.lservice.loginstudent(this.uname,this.usrdata.bnumber).subscribe(data=>{
            this.fulldata = data;
            console.log(this.fulldata);
            this.storage.store('econtact', this.fulldata.econtact);
            if(this.fulldata.bday != undefined){
              this.storage.store('byear', this.fulldata.bday.year);
              this.storage.store('bmonth', this.fulldata.bday.month);
              this.storage.store('bdate', this.fulldata.bday.day);
            }else{
              this.storage.store('byear', undefined);
              this.storage.store('bmonth', undefined);
              this.storage.store('bdate', undefined);
            }
            this.storage.store('NIC', this.fulldata.NIC);
            this.storage.store('contact', this.fulldata.contact);
            this.storage.store('email', this.fulldata.email);
            this.storage.store('fname', this.fulldata.fname);
            this.storage.store('Address', this.fulldata.Address);
          });
          this.lservice.loginuser(this.uname);
          this.storage.store("uname",this.uname);
          this.storage.store("role",this.usrdata.role);
          this.router.navigate(['student/home',{details: btoa(this.uname)}]);


        }else if(this.usrdata.role == "ExamDiv"){
          console.log("l")
          this.lservice.loginemployee(this.uname).subscribe(data=>{
            this.fulldata = data;
            console.log(this.fulldata);
            this.storage.store('econtact', this.fulldata.econtact);
            if(this.fulldata.bday != undefined){
              this.storage.store('byear', this.fulldata.bday.year);
              this.storage.store('bmonth', this.fulldata.bday.month);
              this.storage.store('bdate', this.fulldata.bday.day);
            }else{
              this.storage.store('byear', undefined);
              this.storage.store('bmonth', undefined);
              this.storage.store('bdate', undefined);
            }
            this.storage.store('NIC', this.fulldata.NIC);
            this.storage.store('contact', this.fulldata.contact);
            this.storage.store('email', this.fulldata.email);
            this.storage.store('fname', this.fulldata.fname);
            this.storage.store('Address', this.fulldata.Address);
          });
          this.lservice.loginuser(this.uname);
          this.storage.store("uname",this.uname);
          this.storage.store("role",this.usrdata.role);
          this.router.navigate(['examdiv/home',{details: btoa(this.uname)}]);
        }else if(this.usrdata.role == "HR"){
          console.log("l")
          this.lservice.loginemployee(this.uname).subscribe(data=>{
            this.fulldata = data;
            console.log(this.fulldata);
            this.storage.store('econtact', this.fulldata.econtact);
            if(this.fulldata.bday != undefined){
              this.storage.store('byear', this.fulldata.bday.year);
              this.storage.store('bmonth', this.fulldata.bday.month);
              this.storage.store('bdate', this.fulldata.bday.day);
            }else{
              this.storage.store('byear', undefined);
              this.storage.store('bmonth', undefined);
              this.storage.store('bdate', undefined);
            }
            this.storage.store('NIC', this.fulldata.NIC);
            this.storage.store('contact', this.fulldata.contact);
            this.storage.store('email', this.fulldata.email);
            this.storage.store('fname', this.fulldata.fname);
            this.storage.store('Address', this.fulldata.Address);
          });
          this.lservice.loginuser(this.uname);
          this.storage.store("uname",this.uname);
          this.storage.store("role",this.usrdata.role);
          this.router.navigate(['hr/home',{details: btoa(this.uname)}]);
        }
      }
    });
  }
}
