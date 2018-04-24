import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {UploadService} from '../../../services/upload.service';
import { Upload } from '../../../models/upload';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
  providers:[UploadService]
})
export class ModuleComponent implements OnInit {
  usercode:string;
  subjectname:string;
  files:Upload[];

  constructor(private router:Router, private route: ActivatedRoute, private upSvc:UploadService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode = params['details'];
       this.subjectname=atob(params['subjectname']);
       //console.log((this.usercode));
       console.log((this.subjectname));
    });

    this.refresh();

 }

  gotoProgress(){
    this.router.navigate(['../../teacher/progresscheck',{subjectname: btoa(this.subjectname)}]);
    console.log("navigate to progresscheck");
  }

  gotoAdmittance(){
    this.router.navigate(['../../teacher/admittance',{subjectname: btoa(this.subjectname)}]);
    console.log("navigate to Admittance");
  }

  gotoQuiz(){
    this.router.navigate(['../../teacher/quiz/displaymark',{subjectname: btoa(this.subjectname)}]);
    console.log("navigate to Admittance");
  }

  gotoaddquiz(){
    this.router.navigate(['../../teacher/quiz',{subjectname: btoa(this.subjectname)}]);
    console.log("navigate to add quiz");
  }

  gotomaterial(){
    this.router.navigate(['../../teacher/studymaterial',{subjectname: btoa(this.subjectname)}]);
    console.log("navigate to material");
  }

  refresh(){
    this.files=this.upSvc.listFiles(this.subjectname);
    console.log(this.files);
  }


}
