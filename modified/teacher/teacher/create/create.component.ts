import { Component, OnInit } from '@angular/core';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { McqComponent } from './mcq/mcq.component';
import { Quiz } from '../../models/quiz';
import { Question } from '../../models/question';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  TempQue : Question = <Question>{};
  quiz : Quiz = <Quiz>{};

  //@ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;
  getChildEvent(evt){
    console.log('got this from the child', evt.detail);
  }
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.quiz.Questions = [];
  }

  Adding(){
    var temp = {Text:"",Option1:"",Option2:"",Option3:"",Option4:""};
    temp.Text = this.TempQue.Text;
    temp.Option1 = this.TempQue.Option1;
    temp.Option2 = this.TempQue.Option2;
    temp.Option3 = this.TempQue.Option3;
    temp.Option4 = this.TempQue.Option4;
    this.quiz.Questions.push(temp);
    console.log(this.quiz.Questions);
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

}
