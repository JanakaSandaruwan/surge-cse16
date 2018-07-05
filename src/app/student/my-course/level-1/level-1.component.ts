import { Component, OnInit } from '@angular/core';
import {UploadService} from '../../../services/upload.service';
import { Upload } from '../../../models/upload';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {LoadquizService} from '../../../services/loadquiz.service';

@Component({
  selector: 'app-level-1',
  templateUrl: './level-1.component.html',
  styleUrls: ['./level-1.component.css'],
  providers:[UploadService,LoadquizService]
})
export class Level1Component implements OnInit {

  usercode:string;
  subjectname:string;
  files:Upload[];
  quizes:any[];

  constructor(private router:Router, private route: ActivatedRoute, private upSvc:UploadService,private quizsvc:LoadquizService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode = atob(params['details']);
       this.subjectname=atob(params['subjectname']);
       console.log((this.usercode));
       console.log((this.subjectname));
    });

    this.refresh();
  }
  gotoProgress(){
    this.router.navigate(['../../teacher/progresscheck',{subjectname: btoa(this.subjectname),details:btoa(this.usercode)}]);
    console.log("navigate to progresscheck");
  }
  gotoQuiz(){
    this.router.navigate(['../../teacher/quiz/displaymark',{subjectname: btoa(this.subjectname),details:btoa(this.usercode)}]);
    console.log("navigate to Admittance");
  }

  refresh(){
    this.files=this.upSvc.listFiles(this.subjectname);
    console.log(this.files);

    this.quizes=this.quizsvc.quizeslist(this.subjectname);
    console.log(this.quizes);

  }

  gotodisplayquiz(quizname){
    this.router.navigate(['../../student/viewquiz/',{quizname: btoa(quizname),subjectname:btoa(this.subjectname),details:btoa(this.usercode)}]);
    console.log("navigate to preview");
    console.log(this.subjectname);
    console.log(quizname);
  }

}
