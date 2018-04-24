import { Component, OnInit } from '@angular/core';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { McqComponent } from './mcq/mcq.component';
import { Quiz } from '../../models/quiz';
import { Question } from '../../models/question';
import { ActivatedRoute } from '@angular/router';
import {LoadquizService} from '../../services/loadquiz.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers:[LoadquizService]
})
export class CreateComponent implements OnInit {
  TempQue : Question = <Question>{};
  quiz : Quiz = <Quiz>{};
  quizanswers : string[] = [];
  subjectcode : string;
  //@ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;
  getChildEvent(evt){
    console.log('got this from the child', evt.detail);
  }
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef ,  private loadquiz :LoadquizService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.usercode = params['details'];
       this.subjectcode=atob(params['subjectname']);
       //console.log((this.usercode));
       console.log((this.subjectcode));
    });
    this.quiz.Questions = [];
  }

  Adding(){
    var temp = {Text:"",Option1:"",Option2:"",Option3:"",Option4:"",type:""};
    var tempans = this.TempQue.Answer
    temp.Text = this.TempQue.Text;
    temp.Option1 = this.TempQue.Option1;
    temp.Option2 = this.TempQue.Option2;
    temp.Option3 = this.TempQue.Option3;
    temp.Option4 = this.TempQue.Option4;
    temp.type = this.TempQue.type;
    this.quiz.Questions.push(temp);
    console.log(this.quiz.Questions);
    this.quizanswers.push(tempans);
    console.log(this.quizanswers);

  }

  Add() {

        var factory = this.componentFactoryResolver.resolveComponentFactory(McqComponent);
        var ref = this.viewContainerRef.createComponent(factory);
        //expComponent.instance._ref = expComponent;
        ref.instance._ref = ref;
        ref.instance.level = true;
        ref.instance.type = this.TempQue.type;
        ref.instance.Question = this.TempQue.Text;
        ref.instance.Option1 = this.TempQue.Option1;
        ref.instance.Option2 = this.TempQue.Option2;
        ref.instance.Option3 = this.TempQue.Option3;
        ref.instance.Option4 = this.TempQue.Option4;
        ref.instance.completed = false;
        this.Adding();
        //ref.changeDetectorRef.detectChanges();
        var blockInstance = ref.instance as McqComponent;
        this.loadquiz.updatequizquestion(this.subjectcode,this.quiz.Questions);
        blockInstance.messageEvent.subscribe((val) => {
            console.log(val);
            var i : number;
            i=0;
            while (i<this.quiz.Questions.length){
              if (this.quiz.Questions[i].Text == val.Text){
                if (i > -1) {
                   this.quiz.Questions.splice(i, 1);
                   this.quizanswers.splice(i,1);
                }
              }
              i=i+1;
            }
            console.log(this.quiz.Questions);
        });
  }

}
