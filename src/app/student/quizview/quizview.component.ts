import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz';
import { Question } from '../../models/question';
import { McqComponent } from '../../teacher/quiz/create/mcq/mcq.component';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-quizview',
  templateUrl: './quizview.component.html',
  styleUrls: ['./quizview.component.css']
})
export class QuizviewComponent implements OnInit {
  counter : number = 0;
  currentquestion : any;
  components = [];
  correct : number = 0 ;
  shownext : boolean = true;
  showprev : boolean = false;
  completed : boolean = false;
  answers : string[]= [];
  corans : string[] = ["","","",""];
  quiz : Quiz =
  {Questions : [{Text: "Bob has x candybars. He gives you and Paul y candybars each. You give a x-y of your candy bars to Paul at the end you have z,2z and 3z bars respectively whats the value of y?"
  , Option1: "65", Option2: "13", Option3: "43", Option4: "none of the above", type:"mcq"},
{Text: "The moon is also called luna and is place where the gravitational field is 1/6th than that of earth. If you were to throw a ball of the same mass on the moon and the earth at the same velocity what will be the ration of the two times taken to hit the ground", Option1: "1", Option2: "2", Option3: "3sada", Option4: "4", type:"mcq"},
{Text: "Is there cheese on the moon?", type:"tf"}, {Text: "What is the answer to life and the universe?", type:"sans"}]};
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.Add();
    var i : number = 0;
    for (i=0; i<this.quiz.Questions.length;i++){
      this.answers[i] ="";
    }
  }

  next(){
    this.counter = this.counter + 1 ;
    this.viewContainerRef.remove(0);
    this.Add();
    if (this.counter == this.quiz.Questions.length - 1){
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

        var factory = this.componentFactoryResolver.resolveComponentFactory(McqComponent);
        var ref = this.viewContainerRef.createComponent(factory);
        //expComponent.instance._ref = expComponent;
        ref.instance._ref = ref;
        this.currentquestion = ref;
        ref.instance.level = false;
        ref.instance.Question = this.quiz.Questions[this.counter].Text;
        ref.instance.Option1 = this.quiz.Questions[this.counter].Option1;
        ref.instance.Option2 = this.quiz.Questions[this.counter].Option2;
        ref.instance.Option3 = this.quiz.Questions[this.counter].Option3;
        ref.instance.Option4 = this.quiz.Questions[this.counter].Option4;
        ref.instance.corans = this.corans[this.counter];
        ref.instance.id = (this.counter)+"";
        ref.instance.type = this.quiz.Questions[this.counter].type;
        ref.instance.completed = this.completed;
        ref.instance.selected = this.answers[this.counter];
        this.components.push(ref);
        //ref.changeDetectorRef.detectChanges();
        var blockInstance = ref.instance as McqComponent;

        blockInstance.answerEvent.subscribe((val) => {
            console.log(val);
            this.answers[this.counter] = val ;
            console.log(this.answers);
        });
  }
  goto(index){
    console.log(index);
    if(index == this.quiz.Questions.length - 1){
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

  submit(){
    this.corans = ["1","4","True","42"];
    this.completed = true;
    var i : number = 0;
    for (i=0;i<this.quiz.Questions.length;i++){
      if(this.corans[i]==this.answers[i]){
        this.correct = this.correct + 1;
      }
    }
    this.counter = 0;
    this.shownext = true;
    this.showprev = false;
    this.viewContainerRef.remove(0);
    this.Add();
  }

}
