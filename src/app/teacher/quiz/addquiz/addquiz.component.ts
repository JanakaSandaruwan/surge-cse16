import { Component, OnInit } from '@angular/core';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { McqComponent } from './mcq/mcq.component';
import { Quiz } from '../../../models/quiz';
import { Question } from '../../../models/question';
import {TrueqComponent} from './trueq/trueq.component';
import {EssayComponent} from './essay/essay.component';
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

  TempQue : Question = <Question>{};
  quiz : Quiz = <Quiz>{};
  subjectcode:string;

  //@ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;
  getChildEvent(evt){
    console.log('got this from the child', evt.detail);
  }
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef, private loadquiz :LoadquizService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.quiz.Questions = [];

    this.route.params.subscribe(params => {
      // this.usercode = params['details'];
       this.subjectcode=atob(params['subjectname']);
       //console.log((this.usercode));
       console.log((this.subjectcode));
    });

  }

  Adding(){
    var temp = {Text:"",Option1:"",Option2:"",Option3:"",Option4:"",type:"mcq"};
    temp.Text = this.TempQue.Text;
    temp.Option1 = this.TempQue.Option1;
    temp.Option2 = this.TempQue.Option2;
    temp.Option3 = this.TempQue.Option3;
    temp.Option4 = this.TempQue.Option4;
    this.quiz.Questions.push(temp);
    console.log(this.quiz.Questions);
    //this.subjectcode="MA2-bc0001";
    this.loadquiz.updatequizquestion(this.subjectcode,this.quiz.Questions);
  }

  AddingTrue(){
    var temp = {Text:"",type:"true"};
    temp.Text = this.TempQue.Text;
    this.quiz.Questions.push(temp);
    console.log(this.quiz.Questions);
    //this.subjectcode="MA2-bc0001";
    this.loadquiz.updatequizquestion(this.subjectcode,this.quiz.Questions);
  }

  AddingEssay(){
    var temp = {Text:"",type:"essay"};
    temp.Text = this.TempQue.Text;
    this.quiz.Questions.push(temp);
    console.log(this.quiz.Questions);
  //  this.subjectcode="MA2-bc0001";
    this.loadquiz.updatequizquestion(this.subjectcode,this.quiz.Questions);
  }

  Add() {

        var factory = this.componentFactoryResolver.resolveComponentFactory(McqComponent);
        var ref = this.viewContainerRef.createComponent(factory);
        //expComponent.instance._ref = expComponent;
        ref.instance._ref = ref;
        ref.instance.level = true;
        ref.instance.Question = this.TempQue.Text;
        ref.instance.Option1 = this.TempQue.Option1;
        ref.instance.Option2 = this.TempQue.Option2;
        ref.instance.Option3 = this.TempQue.Option3;
        ref.instance.Option4 = this.TempQue.Option4;
        //ref.changeDetectorRef.detectChanges();
        var blockInstance = ref.instance as McqComponent;

        blockInstance.messageEvent.subscribe((val) => {
            console.log(val);
            var i : number;
            i=0;
            while (i<this.quiz.Questions.length){
              if (this.quiz.Questions[i].Text == val.Text){
                console.log('val');
              }
              i=i+1;
            }
            console.log(this.quiz.Questions);
        });
  }

  AddTrue() {

        var factory = this.componentFactoryResolver.resolveComponentFactory(TrueqComponent);
        var ref = this.viewContainerRef.createComponent(factory);
        //expComponent.instance._ref = expComponent;
        ref.instance._ref = ref;
        ref.instance.level = true;
        ref.instance.Question = this.TempQue.Text;
        /*ref.instance.Option1 = this.TempQue.Option1;
        ref.instance.Option2 = this.TempQue.Option2;
        ref.instance.Option3 = this.TempQue.Option3;
        ref.instance.Option4 = this.TempQue.Option4;
        //ref.changeDetectorRef.detectChanges();*/
        var blockInstance = ref.instance as TrueqComponent;

        blockInstance.messageEvent.subscribe((val) => {
            console.log(val);
            var i : number;
            i=0;
            while (i<this.quiz.Questions.length){
              if (this.quiz.Questions[i].Text == val.Text){
                console.log('val');
              }
              i=i+1;
            }
            console.log(this.quiz.Questions);
        });
  }

  AddEssay() {

        var factory = this.componentFactoryResolver.resolveComponentFactory(EssayComponent);
        var ref = this.viewContainerRef.createComponent(factory);
        //expComponent.instance._ref = expComponent;
        ref.instance._ref = ref;
        ref.instance.level = true;
        ref.instance.Question = this.TempQue.Text;
        /*ref.instance.Option1 = this.TempQue.Option1;
        ref.instance.Option2 = this.TempQue.Option2;
        ref.instance.Option3 = this.TempQue.Option3;
        ref.instance.Option4 = this.TempQue.Option4;
        //ref.changeDetectorRef.detectChanges();*/
        var blockInstance = ref.instance as EssayComponent;

        blockInstance.messageEvent.subscribe((val) => {
            console.log(val);
            var i : number;
            i=0;
            while (i<this.quiz.Questions.length){
              if (this.quiz.Questions[i].Text == val.Text){
                console.log('val');
              }
              i=i+1;
            }
            console.log(this.quiz.Questions);
        });
  }


}
