import { Component, OnInit } from '@angular/core';
import { Subject } from '../../models/subject';
import {StudentservicesService} from '../../services/studentservices.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-enrolment',
  templateUrl: './enrolment.component.html',
  styleUrls: ['./enrolment.component.css']
})
export class EnrolmentComponent implements OnInit {
  Level : string;
  isenrol: boolean;

  finalList : Subject[];
  constructor(private storage:LocalStorageService, private _sservice : StudentservicesService) {


console.log(this.isenrol);

  }

  refresh(){
    this.Level =this._sservice.getLevel(this.storage.retrieve("uname")) ;
    console.log(this.Level);
    this.isenrol=this._sservice.checkEnrol(this.storage.retrieve("uname"),this.Level);
  }

  ngOnInit() {
this.Level =this._sservice.getLevel(this.storage.retrieve("uname")) ;
console.log(this.Level);
this.isenrol=this._sservice.checkEnrol(this.storage.retrieve("uname"),this.Level);
  }
gotol1(){
  this._sservice.listModule("Year 1").subscribe(data => {
    this.finalList = data;
    $('#list1').slideToggle();
  });

}
gotol2(){
  this._sservice.listModule("Year 2").subscribe(data => {
    this.finalList = data;
    $('#list1').slideToggle();
  });

}
gotol3(){
  this._sservice.listModule("Year 3").subscribe(data => {
    this.finalList = data;
    $('#list1').slideToggle();
  });

}
gotol4(){
  this._sservice.listModule("Year 4").subscribe(data => {
    this.finalList = data;
    $('#list1').slideToggle();
  });

}
/*enrol(element, text, subject){
  element.textContent = text;
  element.disabled = true;
  this._sservice.enrol(subject.code+subject.batch,this.storage.retrieve("uname"),subject.name,subject.level);
}*/
enrol(element, text, subject){
  if(element.textContent == "Enrol"){
    element.textContent = text;
    this._sservice.enrol(subject.code+subject.batch,this.storage.retrieve("uname"),subject.name,subject.level);
  }else{
    element.textContent = "Enrol"
    this._sservice.unenrol(subject.code+subject.batch,this.storage.retrieve("uname"),subject.name,subject.level);
  }
  }


validyear(year){
  if(year == this.Level){
      return true;
    }else{
      return false;
    }
}
isEnrol(){
  return this.isenrol;
}
}
