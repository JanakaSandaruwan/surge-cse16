import { Component, OnInit } from '@angular/core';
import {StudentservicesService} from '../../services/studentservices.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {
  Level : string;
  ModuleListl1 : any[] = [];
  ModuleListl2 : any[] = [];
  ModuleListl3 : any[] = [];
  ModuleListl4 : any[] = [];
  constructor(private router:Router, private route: ActivatedRoute,private storage:LocalStorageService,private _sservice : StudentservicesService) { }

  ngOnInit() {
  }
  showl1(){
    console.log("component");
    this._sservice.levelModule(this.storage.retrieve("uname"),"Year 1").subscribe(data => {
      this.ModuleListl1 = data;
      console.log(this.ModuleListl1[0].module.moduleName);
});
}
  showl2(){
    console.log("component");
    this._sservice.levelModule(this.storage.retrieve("uname"),"Year 2").subscribe(data => {
      this.ModuleListl2 = data;
      console.log(this.ModuleListl2);
});
}
showl3(){
  console.log("component");
  this._sservice.levelModule(this.storage.retrieve("uname"),"Year 3").subscribe(data => {
    this.ModuleListl3 = data;
    console.log(this.ModuleListl3[0].module.moduleName);
});
}
view(subject){
  console.log("dimuthu");
  console.log(subject);
  this.router.navigate(['./student/subject',{subjectname: btoa(subject.module),details:btoa(this.storage.retrieve("uname"))}]);
}





























}
