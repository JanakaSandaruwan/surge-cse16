import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {LoadquizService} from '../../services/loadquiz.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers:[LoadquizService]
})
export class QuizComponent implements OnInit {

  name:string;
  date1:string;
  numofquiz:number;
  starttime:string;
  endtime:string;
  subjectcode:string;
  message:string;
  usercode:string;
  fromvalid : Observable<boolean> = Observable.of(false);

  constructor(private router:Router, private loadquiz:LoadquizService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode =atob( params['details']);
       this.subjectcode=atob(params['subjectname']);
       //console.log((this.usercode));
       console.log((this.subjectcode));
    });
  }

  add(){
    console.log("create");
   //this.subjectcode="MA2-bc0001";


    this.loadquiz.loadquizInfo(this.subjectcode,this.name,this.date1,this.starttime,this.endtime);


    this.router.navigate(['../../teacher/quiz/addquiz',{subjectname: btoa(this.subjectcode),details:btoa(this.usercode)}]);
    console.log('ok');



  }


  validFromDate(){
    var date = new Date();
    var today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    if( (new Date(today).getTime() <= new Date(this.date1).getTime())){
          this.fromvalid = Observable.of(false);
    }else{
          this.message="Incorrect date !"
          this.fromvalid = Observable.of(true);
    }

  }


}
