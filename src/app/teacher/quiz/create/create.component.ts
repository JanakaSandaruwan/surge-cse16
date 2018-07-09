import { Component, OnInit } from '@angular/core';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { McqComponent } from './mcq/mcq.component';
import { Quiz } from '../../../models/quiz';
import { Question } from '../../../models/question';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoadquizService} from '../../../services/loadquiz.service';
import {Router} from '@angular/router';
//import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers:[LoadquizService]
})


export class CreateComponent implements OnInit {
  index : number = 0;
  counter : number = -1;
  answernotselected : Observable<boolean> = Observable.of(true);
  TempQue : Question = <Question>{};
  quiz : Quiz = <Quiz>{};
  quizanswers : string[] = [];
  subjectcode : string;
  usercode:string;
  shownext : boolean = false;
  showprev : boolean = false;
  completed : boolean = false;
  validtf : Observable<boolean> = Observable.of(false);
  newf:Observable<boolean> = Observable.of(false);

  typechange(){
    this.answernotselected = Observable.of(true);
    this.TempQue.Answer = "";
  }
  seeans(){
    if(this.TempQue.Answer != undefined && this.TempQue.Answer != ""){
      this.answernotselected = Observable.of(false);
    }else{
      this.answernotselected = Observable.of(true);
    }

    this.newf=Observable.of(true);
  }
  //@ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;
  getChildEvent(evt){
    console.log('got this from the child', evt.detail);
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef ,  private loadquiz :LoadquizService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode = atob(params['details']);
       this.subjectcode=atob(params['subjectname']);
       //console.log((this.usercode));
       //console.log((this.subjectcode));
    });
    this.quiz.Questions = [];
  }


  Add(){
    if(this.TempQue.type=="mcq"){
        //console.log("mcq add");
        this.AddMcq();
    }

    if(this.TempQue.type=="tf"){
        //console.log("tf add");
        this.AddTrue();
    }

    if(this.TempQue.type=="sans"){
        //console.log("sans add");
        this.AddEssay();
    }

    //console.log(this.quiz);
    //console.log(this.quizanswers);
  }

  Adding(){
    this.counter++;
    this.index = this.counter;
    if(this.TempQue.type=="mcq"){
        //console.log("mcq adding");
        this.AddingMcq();
    }

    if(this.TempQue.type=="tf"){
        //console.log("tf adding");
        this.AddingTrue();
    }

    if(this.TempQue.type=="sans"){
      //  console.log("sans adding");
        this.AddingEssay();
    }

  }

  AddingMcq(){
    var temp = {Text:"",Option1:"",Option2:"",Option3:"",Option4:"",type:""};
    var tempans = this.TempQue.Answer;
    temp.Text = this.TempQue.Text;
    temp.Option1 = this.TempQue.Option1;
    temp.Option2 = this.TempQue.Option2;
    temp.Option3 = this.TempQue.Option3;
    temp.Option4 = this.TempQue.Option4;
    temp.type = this.TempQue.type;
    this.quiz.Questions.push(temp);

    //console.log(this.quiz.Questions);
    this.quizanswers.push(tempans);
    console.log(this.quizanswers);
    this.AddMcq();
  }

  Addfromnav() {

        var factory = this.componentFactoryResolver.resolveComponentFactory(McqComponent);
        var ref = this.viewContainerRef.createComponent(factory);
        //expComponent.instance._ref = expComponent;
        ref.instance._ref = ref;
        ref.instance.level = true;
        ref.instance.type = this.quiz.Questions[this.index].type;
        ref.instance.Question = this.quiz.Questions[this.index].Text;
        ref.instance.Option1 = this.quiz.Questions[this.index].Option1;
        ref.instance.Option2 = this.quiz.Questions[this.index].Option2;
        ref.instance.Option3 = this.quiz.Questions[this.index].Option3;
        ref.instance.Option4 = this.quiz.Questions[this.index].Option4;
        ref.instance.corans=this.quizanswers[this.index];
        ref.instance.completed = false;
        //ref.changeDetectorRef.detectChanges();
        var blockInstance = ref.instance as McqComponent;
      //  this.loadquiz.updatequizquestion(this.subjectcode,this.quiz.Questions);
      //  this.loadquiz.updatequizanswer(this.subjectcode,this.quizanswers);

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
            this.counter--;
            console.log(this.quiz.Questions);
            if(this.quiz.Questions.length > 0){
              this.prev();
            }

        });
  }

  AddMcq() {

        var factory = this.componentFactoryResolver.resolveComponentFactory(McqComponent);
        var ref = this.viewContainerRef.createComponent(factory);
        //expComponent.instance._ref = expComponent;
        ref.instance._ref = ref;
        ref.instance.level = true;
        ref.instance.type = this.quiz.Questions[this.counter].type;
        ref.instance.Question = this.quiz.Questions[this.counter].Text;
        ref.instance.Option1 = this.quiz.Questions[this.counter].Option1;
        ref.instance.Option2 = this.quiz.Questions[this.counter].Option2;
        ref.instance.Option3 = this.quiz.Questions[this.counter].Option3;
        ref.instance.Option4 = this.quiz.Questions[this.counter].Option4;
        ref.instance.corans=this.quizanswers[this.counter];
        ref.instance.completed = false;
        //ref.changeDetectorRef.detectChanges();
        var blockInstance = ref.instance as McqComponent;
      //  this.loadquiz.updatequizquestion(this.subjectcode,this.quiz.Questions);
      //  this.loadquiz.updatequizanswer(this.subjectcode,this.quizanswers);

        blockInstance.messageEvent.subscribe((val) => {
            //console.log(val);
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
            this.counter--;
            if(this.quiz.Questions.length > 0){
              this.prev();
            }
            console.log(this.quiz.Questions);
        });

        this.TempQue.Text="";
        this.TempQue.Option1="";
        this.TempQue.Option2="";
        this.TempQue.Option3="";
        this.TempQue.Option4="";
        this.TempQue.Answer="";
        this.answernotselected = Observable.of(true);
  }

  AddingTrue(){
    var temp = {Text:"",type:"tf"};
    temp.Text = this.TempQue.Text;
    var tempans = this.TempQue.Answer;
    this.quiz.Questions.push(temp);
    //console.log(this.quiz.Questions);
    this.quizanswers.push(tempans);
    console.log(this.quizanswers);
    this.AddTrue();
    //this.subjectcode="MA2-bc0001";
  //  this.loadquiz.updatequizquestion(this.subjectcode,this.quiz.Questions);
    //  this.loadquiz.updatequizanswer(this.subjectcode,this.quizanswers);
  }

  AddingEssay(){
    var temp = {Text:"",type:"sans"};
    temp.Text = this.TempQue.Text;
    var tempans = this.TempQue.Answer;
    this.quiz.Questions.push(temp);
    //console.log(this.quiz.Questions);
    this.quizanswers.push(tempans);
    console.log(this.quizanswers);
    this.AddEssay();
  //  this.subjectcode="MA2-bc0001";
  //  this.loadquiz.updatequizquestion(this.subjectcode,this.quiz.Questions);
    //this.loadquiz.updatequizanswer(this.subjectcode,this.quizanswers);
  }

  AddTrue() {

        var factory = this.componentFactoryResolver.resolveComponentFactory(McqComponent);
        var ref = this.viewContainerRef.createComponent(factory);
        //expComponent.instance._ref = expComponent;
        ref.instance._ref = ref;
        ref.instance.level = true;
        ref.instance.Question = this.quiz.Questions[this.counter].Text;
        ref.instance.type = this.quiz.Questions[this.counter].type;
        ref.instance.corans=this.quizanswers[this.counter];
        /*ref.instance.Option1 = this.quiz.Questions[this.counter].Option1;
        ref.instance.Option2 = this.quiz.Questions[this.counter].Option2;
        ref.instance.Option3 = this.quiz.Questions[this.counter].Option3;
        ref.instance.Option4 = this.quiz.Questions[this.counter].Option4;
        //ref.changeDetectorRef.detectChanges();*/
        ref.instance.completed = false;
        var blockInstance = ref.instance as McqComponent;
      //  this.loadquiz.updatequizquestion(this.subjectcode,this.quiz.Questions);
      //  this.loadquiz.updatequizanswer(this.subjectcode,this.quizanswers);

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
            this.counter--;
            console.log(this.quiz.Questions);
            if(this.quiz.Questions.length > 0){
              this.prev();
            }
        });

        this.TempQue.Text="";
        this.TempQue.Option1="";
        this.TempQue.Option2="";
        this.TempQue.Option3="";
        this.TempQue.Option4="";
        this.TempQue.Answer="";
        this.answernotselected = Observable.of(true);
  }

  next(){
    this.index = this.index  + 1 ;
    this.viewContainerRef.remove(0);
    this.Addfromnav();
    if (this.index == this.quiz.Questions.length - 1){
      this.shownext = false;
      this.showprev = true;
    }else{
      this.shownext = true;
      this.showprev = true;
    }

  }

  newform(){
    this.newf = Observable.of(true);
  }

  close(){
    this.newf = Observable.of(false);
  }

  prev(){
    this.index = this.index - 1 ;
    this.viewContainerRef.remove(0);
    this.Addfromnav();
    if (this.index == 0){
      this.showprev = false;
      this.shownext = true;
    }else{
      this.shownext = true;
      this.showprev = true;
    }
  }

  goto(inde){
    if(inde == this.quiz.Questions.length - 1){
      this.shownext = false;
      this.showprev = true;
    }else if ( inde == 0 ){
      this.showprev = false;
      this.shownext = true;
    }else{
      this.shownext = true;
      this.showprev = true;
    }
    this.index = inde;
    this.viewContainerRef.remove(0);
    this.Addfromnav();
  }

  AddEssay() {

        var factory = this.componentFactoryResolver.resolveComponentFactory(McqComponent);
        var ref = this.viewContainerRef.createComponent(factory);
        //expComponent.instance._ref = expComponent;
        ref.instance._ref = ref;
        ref.instance.level = true;
        ref.instance.Question = this.quiz.Questions[this.counter].Text;
        ref.instance.type = this.quiz.Questions[this.counter].type;
        ref.instance.corans=this.quizanswers[this.counter];
        /*ref.instance.Option1 = this.quiz.Questions[this.counter].Option1;
        ref.instance.Option2 = this.quiz.Questions[this.counter].Option2;
        ref.instance.Option3 = this.quiz.Questions[this.counter].Option3;
        ref.instance.Option4 = this.quiz.Questions[this.counter].Option4;
        //ref.changeDetectorRef.detectChanges();*/
        ref.instance.completed = false;
        var blockInstance = ref.instance as McqComponent;
      //  this.loadquiz.updatequizquestion(this.subjectcode,this.quiz.Questions);
      //  this.loadquiz.updatequizanswer(this.subjectcode,this.quizanswers);



        blockInstance.messageEvent.subscribe((val) => {
            //console.log(val);
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
            this.counter--;
            if(this.quiz.Questions.length > 0){
              this.prev();
            }
            console.log(this.quiz.Questions);
        });

        this.TempQue.Text="";
        this.TempQue.Option1="";
        this.TempQue.Option2="";
        this.TempQue.Option3="";
        this.TempQue.Option4="";
        this.TempQue.Answer="";
        this.answernotselected = Observable.of(true);
  }


  submit(){

     this.loadquiz.updatequizquestion(this.subjectcode,this.quiz.Questions);
     this.loadquiz.updatequizanswer(this.subjectcode,this.quizanswers);

     $("#verify").click();


  }

  redirect(){
    this.router.navigate(['../../teacher/modules/module',{subjectname: btoa(this.subjectcode),details:btoa(this.usercode)}]);
  }

  gotolastcreated(){

      this.newf = Observable.of(false);

      this.viewContainerRef.remove(0);
    this.Adding();
    this.shownext = false;
    if(this.counter == 1){
      this.showprev = false;
      this.shownext = false;
    }else{
      this.showprev = true;
    }
  }
  validAnstf(){
    console.log(this.TempQue.Answer);
  }

}
