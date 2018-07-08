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
  validstart:Observable<boolean> = Observable.of(false);
  validend:Observable<boolean> = Observable.of(false);
  startmessage:string;
  issettime:boolean=false;
  issetstart:boolean=false;
  constructor(private router:Router, private loadquiz:LoadquizService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode =atob( params['details']);
       this.subjectcode=atob(params['subjectname']);
       //console.log((this.usercode));
       console.log((this.subjectcode));
    });

    //this.validstarttime();
    this.issettime=false;
    this.issetstart=false;
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
          this.issetstart=true;

    }else{
          this.message="Incorrect date !"
          this.issetstart=false;
          this.fromvalid = Observable.of(true);
    }
    this.starttime="";

  }

  validstarttime(){

    var date = new Date();
    var today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    if( (new Date(today).getTime() < new Date(this.date1).getTime())){
          this.validstart = Observable.of(false);
          this.issettime=true;
    }else{

      if(+this.starttime.substring(0,2) > date.getHours()){
        this.validstart=Observable.of(false);
        this.issettime=true;
        //console.log("hour >");
      }else if(+this.starttime.substring(0,2) == date.getHours() && date.getMinutes() < +this.starttime.substring(3,5)){
        this.validstart=Observable.of(false);
        this.issettime=true;
        //console.log("hour =");
      }else{
        this.startmessage="Incorrect start time!!!";
        this.validstart=Observable.of(true);
        this.issettime=false;
      //  console.log("error");
      }

    }
    this.endtime="";
  }

  validendtime(){
    //var date=new Date();
    console.log(this.starttime);

    if(+this.endtime.substring(0,2) > +this.starttime.substring(0,2)){
      this.validend=Observable.of(false);
      //console.log("hour >");
    }else if(+this.endtime.substring(0,2) == +this.starttime.substring(0,2) && +this.starttime.substring(3,5) < +this.endtime.substring(3,5)){
      this.validend=Observable.of(false);
      //console.log("hour =");
    }else{
      this.startmessage="Incorrect end time!!!";
      this.validend=Observable.of(true);
    //  console.log("error");
    }
  }


}
