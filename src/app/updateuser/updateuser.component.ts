import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { LoginServiceService } from '../services/login-service.service';
import { Observable } from 'rxjs/Observable';
import {  UploadserviceService } from '../services/uploadservice.service';
import { Upload } from '../models/upload';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  @ViewChild('newprofile')
  newprofileVariable: any;
  fcontact : string;
  fcontact2 : string
  fNIC : string;
  femail : string;
  fAddress : string;
  fname : string;
  model = { year:undefined ,month:undefined, day:undefined};
  date : string;
  oldpasswordcopy : string;
  oldpassword : string;
  newpassword : string;
  reconfirm : string;
  oldcheck : Observable<boolean> = Observable.of(false);
  newcheck : Observable<boolean> = Observable.of(false);
  fnamedis : boolean = true;
  fadddis : boolean = true;
  condis : boolean = true;
  emadis : boolean = true;
  caldis : boolean = true;
  calinvalid : Observable<boolean> = Observable.of(false);
  condis2 : boolean = true;
  selectedFiles: FileList;
  currentFileUpload: Upload;
  profileurl: string;
  profilepicchanged = true;
  passwordset : boolean = false;

  constructor(private storage:LocalStorageService, private _loginservice : LoginServiceService, private logincookie : CookieService, private  uploadService: UploadserviceService) { }

  closepassword(){
    this.passwordset = false;
  }
  passwordtouched(){
    this.passwordset = true;
  }
  ngOnInit() {
    this.fcontact = this.storage.retrieve("contact");
    this.fNIC = this.storage.retrieve("NIC");
    this.femail = this.storage.retrieve("email");
    this.fname = this.storage.retrieve("fname");
    this.fAddress = this.storage.retrieve("Address");
    this.fcontact2 = this.storage.retrieve("econtact");
    this.model.year = +this.storage.retrieve("byear");
    this.model.month = +this.storage.retrieve("bmonth");
    this.model.day = +this.storage.retrieve("bdate");
    console.log((""+this.model.month).length);
    if((""+this.model.month).length == 1){
      this.model.month = "0"+this.model.month;
    }
    if((""+this.model.day).length == 1){
      this.model.day = "0"+this.model.day;
    }
    if((""+this.model.year).length == 1){
      this.model.year = "000"+this.model.year;
    }else if((""+this.model.year).length == 2){
      this.model.year = "00"+this.model.year;
    }else if((""+this.model.year).length == 1){
      this.model.year = "0"+this.model.year;
    }else{
      this.model.year = ""+this.model.year;
    }
    this.date = this.model.year+"-"+this.model.month+"-"+this.model.day;
    this.uploadService.getUrl(this.storage.retrieve("uname")).subscribe(data => {
      this.profileurl = data;
      console.log(this.profileurl);
    });
    console.log(this.storage.retrieve("econtact"));
    console.log(this.storage.retrieve("fname"));
  }

  restore() {
    console.log(this.newprofileVariable.nativeElement.files);
    this.newprofileVariable.nativeElement.value = "";
    console.log(this.newprofileVariable.nativeElement.files);
    this.fcontact = this.storage.retrieve("contact");
    this.fNIC = this.storage.retrieve("NIC");
    this.femail = this.storage.retrieve("email");
    this.fname = this.storage.retrieve("fname");
    this.fAddress = this.storage.retrieve("Address");
    this.fcontact2 = this.storage.retrieve("econtact");
    this.model.year = +this.storage.retrieve("byear");
    this.model.month = +this.storage.retrieve("bmonth");
    this.model.day = +this.storage.retrieve("bdate");
    if((""+this.model.month).length == 1){
      this.model.month = "0"+this.model.month;
    }
    if((""+this.model.day).length == 1){
      this.model.day = "0"+this.model.day;
    }
    if((""+this.model.year).length == 1){
      this.model.year = "000"+this.model.year;
    }else if((""+this.model.year).length == 2){
      this.model.year = "00"+this.model.year;
    }else if((""+this.model.year).length == 1){
      this.model.year = "0"+this.model.year;
    }else{
      this.model.year = ""+this.model.year;
    }
    this.date = this.model.year+"-"+this.model.month+"-"+this.model.day;
    this.uploadService.getUrl(this.storage.retrieve("uname")).subscribe(data => {
      this.profileurl = data;
      console.log(this.profileurl);
    });
    console.log(this.storage.retrieve("contact"));
    console.log(this.storage.retrieve("fname"));
    this.fnamedis = true;
    this.fadddis = true;
    this.condis = true;
    this.emadis = true;
    this.caldis = true;
    this.condis2 = true;
    this.selectedFiles = undefined;
    this.profilepicchanged = true;
  }
  getcurrentPassword(){
    this._loginservice.login(this.storage.retrieve("uname"),"s").subscribe(data => {
      this.oldpasswordcopy = data.Password ;
    });
  }

  Confirm(){
    if( this.oldpasswordcopy != this.oldpassword){
      this.oldcheck = Observable.of(true);
    }else if( this.reconfirm != this.newpassword){
      this.oldcheck = Observable.of(false);
      this.newcheck = Observable.of(true);
    }else{
      this.oldcheck = Observable.of(false);
      this.newcheck = Observable.of(false);
      this._loginservice.updatepassword(this.storage.retrieve("uname"),this.newpassword);
      this.passwordset = false;
      $("#closeonsuccess").click();
      this.oldpassword = "";
      this.newpassword = "";
      this.reconfirm = "";
    }
  }

  activate(){
    this.caldis = false;
  }

  changes(){
    this.model.year = this.date.substring(0,4);
    this.model.month = this.date.substring(5,7);
    this.model.day = this.date.substring(8,10);
    const d: Date = new Date();
    if(d.getFullYear() < +this.model.year){
      console.log(d.getFullYear());
      this.calinvalid = Observable.of(true);
    }else if(d.getFullYear() == +this.model.year){
      if(d.getMonth() + 1 < +this.model.month){
        console.log("k1");
        this.calinvalid = Observable.of(true);
      }else if(d.getMonth() + 1 == +this.model.month){
        if(d.getDate() < +this.model.day){
          console.log("k2");
          this.calinvalid = Observable.of(true);
        }else{
          this.calinvalid = Observable.of(false);
        }
      }else{
        this.calinvalid = Observable.of(false);
      }
    }else{
      this.calinvalid = Observable.of(false);
    }
  }

  update(){
    console.log('run');
    this.model.year = this.date.substring(0,4);
    this.model.month = this.date.substring(5,7);
    this.model.day = this.date.substring(8,10);
    console.log(this.storage.retrieve("uname"),this.storage.retrieve("role"));
    this._loginservice.updatedetails(this.storage.retrieve("uname"),this.storage.retrieve("role"),this.model, this.fname, this.fAddress, this.fcontact , this.fcontact2 , this.femail);
    this.storage.store("contact" , this.fcontact);
    this.storage.store("NIC", this.fNIC);
    this.storage.store("email", this.femail);
    this.storage.store("fname", this.fname);
    this.storage.store("Address", this.fAddress);
    this.storage.store("econtact",this.fcontact2);
    this.storage.store("byear",this.model.year);
    this.storage.store("bmonth",this.model.month);
    this.storage.store("bdate",this.model.day);
    if(!this.profilepicchanged){
      $('#uploadbutton').click();
    }
    this.profilepicchanged = true;
  }

  detectfiles(event){
    const file = event.target.files.item(0);
    console.log(event.target.result);
    this.profilepicchanged = false;
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
    var reader = new FileReader();
            reader.onload = (event: any) => {
                this.profileurl = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);





  }

  upload(){
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new Upload(file);
    this.uploadService.uploadprofilepic(this.storage.retrieve("uname"),this.currentFileUpload);
  }

}
