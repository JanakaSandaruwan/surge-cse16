import { Component, OnInit } from '@angular/core';
import { Subject } from '../../models/subject';
import {StudentservicesService} from '../../services/studentservices.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-enrolment',
  templateUrl: './enrolment.component.html',
  styleUrls: ['./enrolment.component.css']
})
export class EnrolmentComponent implements OnInit {
  Level : string;
  finalList : Subject[];
  constructor(private storage:LocalStorageService, private _sservice : StudentservicesService) { }

  ngOnInit() {

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
enrol(subject){
  this._sservice.enrol(subject.code+subject.batch,this.storage.retrieve("uname"),subject.name,subject.level);
}

}
