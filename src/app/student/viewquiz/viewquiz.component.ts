import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quiz';
import { Question } from '../../models/question';
import { McqsComponent } from './mcqs/mcqs.component';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Component, OnInit, Input, ElementRef , EventEmitter, Output } from '@angular/core';
import {LoadquizService} from '../../services/loadquiz.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-viewquiz',
  templateUrl: './viewquiz.component.html',
  styleUrls: ['./viewquiz.component.css']
})
export class ViewquizComponent implements OnInit {

  quizname:string;
  subjectname:string;
  counter : number = 0;
  currentquestion : any;
  components = [];
  correct : number = 0 ;
  shownext : boolean = true;
  showprev : boolean = false;
  completed : boolean = false;
  answers : string[] = [];
  corans : string[] = ["","","",""];
  quizes:any [];
  wrongboolean: boolean[] = [];
  quizindex : number;
  blocked : Observable<boolean> = Observable.of(false);
  /*quiz : Quiz =
  {Questions : [{Text: "Bob has x candybars. He gives you and Paul y candybars each. You give a x-y of your candy bars to Paul at the end you have z,2z and 3z bars respectively whats the value of y?"
  , Option1: "65", Option2: "13", Option3: "43", Option4: "none of the above", type:"mcq"},
  {Text: "The moon is also called luna and is place where the gravitational field is 1/6th than that of earth. If you were to throw a ball of the same mass on the moon and the earth at the same velocity what will be the ration of the two times taken to hit the ground", Option1: "1", Option2: "2", Option3: "3sada", Option4: "4", type:"mcq"},
  {Text: "Is there cheese on the moon?", type:"tf"}, {Text: "What is the answer to life and the universe?", type:"sans"}]};*/

  quiz:any[] = [];

  constructor(private storage:LocalStorageService, private router:Router, private route: ActivatedRoute,private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef,private quizSvc:LoadquizService ) { }

                ngOnInit() {

                  this.route.params.subscribe(params => {

                     this.quizname=atob(params['quizname']);
                     this.subjectname =atob( params['subjectname']);
                     //console.log((this.usercode));
                     console.log((this.quizname));
                     console.log((this.subjectname));
                  });
                  console.log("ngOnInit");


                }

                next(){
                  this.counter = this.counter  + 1 ;
                  this.viewContainerRef.remove(0);
                  this.Add();
                  if (this.counter == this.quiz.length - 1){
                    this.shownext = false;
                    this.showprev = true;
                  }else{
                    this.shownext = true;
                    this.showprev = true;
                  }

                }

                prev(){
                  this.counter = this.counter - 1 ;
                  this.viewContainerRef.remove(0);
                  this.Add();
                  if (this.counter == 0){
                    this.showprev = false;
                    this.shownext = true;
                  }else{
                    this.shownext = true;
                    this.showprev = true;
                  }
                }
                Add() {

                      var factory = this.componentFactoryResolver.resolveComponentFactory(McqsComponent);
                      var ref = this.viewContainerRef.createComponent(factory);
                      //expComponent.instance._ref = expComponent;
                      ref.instance._ref = ref;
                      this.currentquestion = ref;
                      ref.instance.level = false;
                      ref.instance.Question = this.quiz[this.counter].Text;
                      ref.instance.Option1 = this.quiz[this.counter].Option1;
                      ref.instance.Option2 = this.quiz[this.counter].Option2;
                      ref.instance.Option3 = this.quiz[this.counter].Option3;
                      ref.instance.Option4 = this.quiz[this.counter].Option4;
                      ref.instance.corans = this.corans[this.counter];
                      ref.instance.wrong = this.wrongboolean[this.counter];
                      ref.instance.id = (this.counter)+"";
                      ref.instance.type = this.quiz[this.counter].type;
                      ref.instance.completed = this.completed;
                      ref.instance.selected = this.answers[this.counter];
                      this.components.push(ref);
                      //ref.changeDetectorRef.detectChanges();
                      var blockInstance = ref.instance as McqsComponent;

                      blockInstance.answerEvent.subscribe((val) => {
                          console.log(val);
                          this.answers[this.counter] = val ;
                          console.log(this.answers);
                      });
                }
                goto(index){
                  console.log(index);
                  if(index == this.quiz.length - 1){
                    this.shownext = false;
                    this.showprev = true;
                  }else if ( index == 0 ){
                    this.showprev = false;
                    this.shownext = true;
                  }else{
                    this.shownext = true;
                    this.showprev = true;
                  }
                  this.counter = index;
                  this.viewContainerRef.remove(0);
                  this.Add();
                }

                refresh(){
                  var k = 0;
                  var i=0;
                  this.quizes=this.quizSvc.quizeslist(this.subjectname);
                   while(i<this.quizes.length){
                     if (this.quizname == this.quizes[i]["name"]){
                       this.quizindex = i;
                       this.quiz=this.quizes[i]["question"];
                       this.corans=this.quizes[i]["answer"];
                       break;
                    }
                     i++;
                  }
                  var x = 0;
                  while(x<this.quiz.length){
                    this.wrongboolean[x]=false;
                    x = x+1;
                  }
                  this.quizSvc.checkcomplete(this.storage.retrieve("uname"),this.subjectname,this.quizindex+1).subscribe(data => {
                      if(data != null){
                        this.completed = data;
                      }

                  });
                  if(this.completed == true){
                    this.quizSvc.checkans(this.storage.retrieve("uname"),this.subjectname,this.quizindex+1).subscribe(data => {
                      this.answers = data;

                    });

                    this.quizSvc.checkcorrect(this.storage.retrieve("uname"),this.subjectname,this.quizindex+1).subscribe(data => {
                      this.correct = data;

                    });
                  }
                  this.blocked=this.quizSvc.checktime(this.subjectname,this.quizindex+1)
                  var blockcheck;
                  this.blocked.subscribe(data => {
                    blockcheck = data;
                  });

                }

                backtomodule(){
                    this.router.navigate(['./student/subject',{subjectname: btoa(this.subjectname),details:btoa(this.storage.retrieve("uname"))}]);
                }

              submit(){
                  console.log(this.answers);
                  this.completed = true;
                  var i : number = 0;
                  for (i=0;i<this.quiz.length;i++){
                    if(this.corans[i]==this.answers[i]){
                      this.correct = this.correct + 1;
                    }else{
                      this.wrongboolean[i] = true;
                    }
                  }
                  this.counter = 0;
                  this.shownext = true;
                  this.showprev = false;
                  this.viewContainerRef.remove(0);
                  this.Add();
                  var marks = this.correct / this.quiz.length * 100 ;
                  this.quizSvc.updatequizmarkstudent(this.storage.retrieve("uname"),this.subjectname,this.quizindex+1,this.answers,marks,this.correct);
                  console.log(this.subjectname,this.quizname,this.storage.retrieve("uname"));
                }

}
