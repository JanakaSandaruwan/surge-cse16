import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {LoadquizService} from '../../services/loadquiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers:[LoadquizService]
})
export class QuizComponent implements OnInit {

  name:string;
  date:string;
  numofquiz:number;
  starttime:string;
  endtime:string;
  subjectcode:string;
  message:string;


  constructor(private router:Router, private loadquiz:LoadquizService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.usercode = params['details'];
       this.subjectcode=atob(params['subjectname']);
       //console.log((this.usercode));
       console.log((this.subjectcode));
    });
  }

  add(){
    console.log("create");
   //this.subjectcode="MA2-bc0001";

    var date = new Date();
    var today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);



    if( (new Date(today).getTime() <= new Date(this.date).getTime())){
       this.loadquiz.loadquizInfo(this.subjectcode,this.name,this.date,this.starttime,this.endtime);


       this.router.navigate(['../../teacher/quiz/addquiz',{subjectname: btoa(this.subjectcode)}]);
       console.log('ok');


    }else{
       this.message="You have entered an incorrect date!!!"
    }

  }
}
