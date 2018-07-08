import { Component, OnInit } from '@angular/core';
import {LoadquizService} from  "../../services/loadquiz.service" ;
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stdquiz',
  templateUrl: './stdquiz.component.html',
  styleUrls: ['./stdquiz.component.css']
})
export class StdquizComponent implements OnInit {

  students:any[];
  subjectname:string;
  username:string;
  quizname:string;


  constructor(private gradeservice:LoadquizService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.usercode = params['details'];
       this.quizname=atob(params['quizname']);
       this.subjectname=atob(params['subjectname']);
       this.username=atob(params['details']);
       //console.log((this.usercode));
       console.log((this.quizname));
    });
    this.refresh();
  }

  refresh(){
    this.students=this.gradeservice.quizMarks(this.subjectname);
  }

  gotoAnswer(id){
    console.log(id);
   this.router.navigate(['../teacher/stdans', {quizname: btoa(this.quizname),subjectname:btoa(this.subjectname),details:btoa(this.username),stdname:btoa(id)}]);
  }
}
