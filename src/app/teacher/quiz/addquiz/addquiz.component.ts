import { Component, OnInit } from '@angular/core';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Quiz } from '../../../models/quiz';
import { Question } from '../../../models/question';
import {LoadquizService} from '../../../services/loadquiz.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.css'],
  providers:[LoadquizService]
})

export class AddquizComponent implements OnInit {

  quizname:string;
  subjectname:string;
  quizdate:any;
  starttime:any;
  endtime:any;
  quizes:any [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef, private loadquiz :LoadquizService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      // this.usercode = params['details'];
       this.quizname=atob(params['quizname']);
       this.subjectname=atob(params['subjectname']);
       //console.log((this.usercode));
       console.log((this.quizname));
    });

    this.loadInfo();

  }

  gotoView(){
    this.router.navigate(['../../teacher/quiz/teacherview',{quizname: btoa(this.quizname),subjectname:btoa(this.subjectname)}]);
    console.log("navigate to teacherview");
  }

  loadInfo(){
    this.quizes=this.loadquiz.quizeslist(this.subjectname);
    console.log(this.quizes);
    var i=0;
     while(i<this.quizes.length){
       if (this.quizname == this.quizes[i]["name"]){
         this.quizdate=this.quizes[i]["date"];
         this.endtime=this.quizes[i]["endtime"];
         this.starttime=this.quizes[i]["starttime"];
         break;
       }
       i++;
     }
  }



}
