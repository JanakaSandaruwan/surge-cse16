import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { LoginServiceService } from '../services/login-service.service';
import { Observable } from 'rxjs/Observable';
import {  UploadserviceService } from '../services/uploadservice.service';
import { Upload } from '../models/upload';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
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
  constructor(private storage:LocalStorageService, private _loginservice : LoginServiceService, private logincookie : CookieService, private  uploadService: UploadserviceService) { }

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
    this.uploadService.getUrl(this.storage.retrieve("uname")).subscribe(data => {
      this.profileurl = data;
      console.log(this.profileurl);
    });
    console.log(this.storage.retrieve("econtact"));
    console.log(this.storage.retrieve("fname"));
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
      console.log("make sure to type the same password");
    }else{
      this.oldcheck = Observable.of(false);
      this.newcheck = Observable.of(false);
      console.log("done and dusted");
      this._loginservice.updatepassword(this.storage.retrieve("uname"),this.newpassword);
    }
  }

  activate(){
    $("#x").click();
    this.caldis = false;
  }

  update(){
    console.log('run');
    this._loginservice.updatedetails(this.storage.retrieve("uname"),this.storage.retrieve("role"),this.model, this.fname, this.fAddress, this.fcontact , this.fcontact2 , this.femail);
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
    this.uploadService.uploadprofilepic(this.storage.retrieve("uname"),this.currentFileUpload);
  }

}
