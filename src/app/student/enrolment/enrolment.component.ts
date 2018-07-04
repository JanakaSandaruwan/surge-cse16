import { Component, OnInit } from '@angular/core';
import { Subject } from '../../models/subject';
import {StudentservicesService} from '../../services/studentservices.service';

@Component({
  selector: 'app-enrolment',
  templateUrl: './enrolment.component.html',
  styleUrls: ['./enrolment.component.css']
})
export class EnrolmentComponent implements OnInit {
  Level : string;
  finalList : Subject[];
  constructor(private _sservice : StudentservicesService) { }

  ngOnInit() {

  }
gotol1(){
  this._sservice.listModule("Year 2").subscribe(data => {
    this.finalList = data;
    $('#list1').slideToggle();
  });

}
}
