import { Component, OnInit } from '@angular/core';
import {StudentservicesService} from '../../services/studentservices.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {
  Level : string;
  ModuleList : any[] = [];
  constructor(private storage:LocalStorageService,private _sservice : StudentservicesService) { }

  ngOnInit() {
  }
  showl2(){
    console.log("component");
    this._sservice.levelModule(this.storage.retrieve("uname"),"Year 2").subscribe(data => {
      this.ModuleList = data;
      console.log(this.ModuleList[0].module.moduleName);
});
}
}
