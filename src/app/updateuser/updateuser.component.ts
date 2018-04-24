import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { LoginServiceService } from '../services/login-service.service';
import { Observable } from 'rxjs/Observable';
import {  UploadserviceService } from '../services/uploadservice.service';
import { Upload } from '../models/upload';
@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  fcontact : string;
  fcontact2 : string
  fNIC : string;
  femail : string;
  fAddress : string;
  fname : string;
  model = { year:undefined ,month:undefined, day:undefined};
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
  condis2 : boolean = true;
  selectedFiles: FileList;
  currentFileUpload: Upload;
  profileurl: string;
  constructor(private _loginservice : LoginServiceService, private logincookie : CookieService, private  uploadService: UploadserviceService) { }

  ngOnInit() {
    this.fcontact = this.logincookie.get("contact");
    this.fNIC = this.logincookie.get("NIC");
    this.femail = this.logincookie.get("email");
    this.fname = this.logincookie.get("fname");
    this.fAddress = this.logincookie.get("Address");
    this.fcontact2 = this.logincookie.get("econtact");
    this.model.year = +this.logincookie.get("byear");
    this.model.month = +this.logincookie.get("bmonth");
    this.model.day = +this.logincookie.get("bdate");
    this.uploadService.getUrl(this.logincookie.get("uname")).subscribe(data => {
      this.profileurl = data;
      console.log(this.profileurl);
    });
    console.log(this.logincookie.get("econtact"));
    console.log(this.logincookie.get("fname"));
  }

  getcurrentPassword(){
    this._loginservice.login(this.logincookie.get("uname"),"s").subscribe(data => {
      this.oldpasswordcopy = data.Password ;
    });
  }

  Confirm(){
    if( this.oldpasswordcopy != this.oldpassword){
      this.oldcheck = Observable.of(true);
    }else if( this.reconfirm != this.newpassword){
      this.oldcheck = Observable.of(false);
      this.newcheck = Observable.of(true);
      console.log("make sure to type the same password");
    }else{
      this.oldcheck = Observable.of(false);
      this.newcheck = Observable.of(false);
      console.log("done and dusted");
      this._loginservice.updatepassword(this.logincookie.get("uname"),this.newpassword);
    }
  }

  activate(){
    $("#x").click();
    this.caldis = false;
  }

  update(){
    console.log('run');
    this._loginservice.updatedetails(this.logincookie.get("uname"),this.logincookie.get("role"),this.model, this.fname, this.fAddress, this.fcontact , this.fcontact2 , this.femail);
  }

  detectfiles(event){
    const file = event.target.files.item(0)

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }



  }

  upload(){
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new Upload(file);
    this.uploadService.uploadprofilepic(this.logincookie.get("uname"),this.currentFileUpload);
  }

}
