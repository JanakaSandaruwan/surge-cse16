import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../../../models/quiz';
import { Question } from '../../../../models/question';
import { TeachermcqComponent } from './teachermcq/teachermcq.component';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Component, OnInit, Input, ElementRef , EventEmitter, Output } from '@angular/core';
import {LoadquizService} from '../../../../services/loadquiz.service';

@Component({
  selector: 'app-teacherview',
  templateUrl: './teacherview.component.html',
  styleUrls: ['./teacherview.component.css']
})
export class TeacherviewComponent implements OnInit {
  quizname:string;
  subjectname:string;
  counter : number = 0;
  currentquestion : any;
  components = [];
  correct : number = 0 ;
  shownext : boolean = true;
  showprev : boolean = false;
  completed : boolean = true;
  answers : string[];
  corans : string[] = ["","","",""];
  quizes:any [] = [];
  /*quiz : Quiz =
  {Questions : [{Text: "Bob has x candybars. He gives you and Paul y candybars each. You give a x-y of your candy bars to Paul at the end you have z,2z and 3z bars respectively whats the value of y?"
  , Option1: "65", Option2: "13", Option3: "43", Option4: "none of the above", type:"mcq"},
  {Text: "The moon is also called luna and is place where the gravitational field is 1/6th than that of earth. If you were to throw a ball of the same mass on the moon and the earth at the same velocity what will be the ration of the two times taken to hit the ground", Option1: "1", Option2: "2", Option3: "3sada", Option4: "4", type:"mcq"},
  {Text: "Is there cheese on the moon?", type:"tf"}, {Text: "What is the answer to life and the universe?", type:"sans"}]};*/

  quiz:any[];
  constructor(private router:Router, private route: ActivatedRoute,private componentFactoryResolver: ComponentFactoryResolver,
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
    this.refresh();



  }

  next(){
    this.counter = this.counter + 1 ;
    this.viewContainerRef.remove(0);
    this.Add();
    if (this.counter == this.quiz.length - 1){
      this.showprev = true;
      this.shownext = false;
    }else{
      this.showprev = true;
      this.shownext = true;
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

        var factory = this.componentFactoryResolver.resolveComponentFactory(TeachermcqComponent);
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
        ref.instance.id = (this.counter)+"";
        ref.instance.type = this.quiz[this.counter].type;
        ref.instance.completed = this.completed;
        ref.instance.selected = this.answers[this.counter];
        this.components.push(ref);
        //ref.changeDetectorRef.detectChanges();
        var blockInstance = ref.instance as TeachermcqComponent;

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
    console.log((this.quizname));
    console.log((this.subjectname));
    this.quizes=this.quizSvc.quizeslist(this.subjectname);
    console.log(this.quizes);
    var i=0;
     while(i<this.quizes.length){
       if (this.quizname == this.quizes[i]["name"]){
         this.quiz=this.quizes[i]["question"];
         this.answers=this.quizes[i]["answer"];
         console.log(this.answers);

         break;
       }
       i++;
     }
    if(this.quiz.length == 0){
      this.Add();
    }
  }
}
