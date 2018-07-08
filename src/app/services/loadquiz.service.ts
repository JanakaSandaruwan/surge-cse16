import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs/Observable';
import { Teacher } from '../models/teacher';
import { Subject } from '../models/subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
declare var firebase: any;

@Injectable()
export class LoadquizService {

  constructor(private _http: HttpClient) { }

  getNumQuiz(subjectcode):number{
    var x : number;
    x = 0;
    firebase.database().ref('/classes/'+subjectcode+'/Quiz/numofquiz').on('value', function(snapshot) {
      x = snapshot.val();
    });
    return x;
  }

  updatequizno(subjectcode){

    firebase.database().ref('/classes/'+subjectcode+'/Quiz').update({
      numofquiz:(this.getNumQuiz(subjectcode)+1)
    });
  }

  updatequizquestion(subjectcode,quizes){

    firebase.database().ref('/classes/'+subjectcode+'/Quiz/quiz'+this.getNumQuiz(subjectcode)).update({
      question:quizes
    });


  }

  updatequizmarkstudent(student,modulen,quiznu,answer, marks){
    firebase.database().ref('/classes/'+modulen+'/students/'+student+'/quiz/quiz'+quiznu+'').set({
      ans : answer,
      mark : marks,
      complete : true
    });
  }

  checkcomplete(student,modulen,quiznu) : Observable<boolean>{
    var completed : boolean;
    firebase.database().ref('/classes/'+modulen+'/students/'+student+'/quiz/quiz'+quiznu+'/complete').on('value', function(data){
      console.log(data.val());
      completed = data.val();
    });
    return Observable.of(completed);
  }

  checkcorrect(student,modulen,quiznu) : Observable<number>{
    var right : number;
    firebase.database().ref('/classes/'+modulen+'/students/'+student+'/quiz/quiz'+quiznu+'/mark').on('value', function(data){
      console.log(data.val());
      right = data.val();
    });
    right = Math.round(right / 100 * 3);
    return Observable.of(right);
  }

  checkans(student,modulen,quiznu) : Observable<string[]>{
    var ans : string[];
    firebase.database().ref('/classes/'+modulen+'/students/'+student+'/quiz/quiz'+quiznu+'/ans').on('value', function(data){
      console.log(data.val());
      ans = data.val();
    });
    return Observable.of(ans);
  }

  checkforcomplete(modulen,student,quizname) :Observable<boolean>{

    var completed : boolean;
    firebase.database().ref('/classes/'+modulen+'/students/'+student+'/quiz/'+quizname+'/complete').on('value', function(data){
      console.log(data.val());
      completed = data.val();
    });
    return Observable.of(completed);
  }

  checktime(modulen,quiznu): Observable<boolean>{
    var timebeg : string;
    var timeend : string;
    var qdate : string;
    var ontime : boolean;
    firebase.database().ref('/classes/'+modulen+'/Quiz/quiz'+quiznu).on('value', function(data){
      console.log(data.val());
      console.log(quiznu,modulen);
      timebeg = data.val().starttime;
      timeend = data.val().endtime;
      qdate = data.val().date;
      const d: Date = new Date();
      if(d.getFullYear()==+qdate.substring(0,4) && d.getMonth()+1 == +qdate.substring(5,7) && d.getDate() == +qdate.substring(8.10)){
        if (+timebeg.substring(0,2) < d.getHours() && d.getHours() < +timeend.substring(0,2)){
          ontime = true;
        }else if (+timebeg.substring(0,2) ==  d.getHours() && d.getMinutes() > +timebeg.substring(3,5)){
          ontime = true;
        }else if (+timeend.substring(0,2) ==  d.getHours() && d.getMinutes() < +timeend.substring(3,5)){
          ontime = true;
        }else{
          ontime = false;
        }
      }else{
        ontime = false;
      }


    });
    console.log(ontime);
    return Observable.of(ontime);
  }

  updatequizanswer(subjectcode,ans){

    firebase.database().ref('/classes/'+subjectcode+'/Quiz/quiz'+this.getNumQuiz(subjectcode)).update({
      answer:ans
    });

  }

  loadquizInfo(subjectcode,quizname,quizdate,startquiztime,endquiztime){
    console.log("working");
    this.updatequizno(subjectcode);

    console.log(quizname+" "+quizdate);

    firebase.database().ref('/classes/'+subjectcode+'/Quiz/quiz'+this.getNumQuiz(subjectcode)).set({
       name:quizname,
       date:quizdate,
       starttime:startquiztime,
       endtime:endquiztime,
       question:"",
       answer:"",
    });
  }

  quizMarks(subjectname):any [] {
    var finallist :any[];
    finallist = [];
    var nodata = 0;
    firebase.database().ref('classes/'+subjectname+'/students').on('child_added', function(data) {
        finallist[nodata]=data.val();
        nodata = nodata + 1;
      });
      return finallist;

  }

  quizeslist(subjectname):any[]{
    var finallist :any[];
    finallist = [];
    var nodata = 0;
    firebase.database().ref('classes/'+subjectname+'/Quiz').on('child_added', function(data) {
        finallist[nodata-1]=data.val();
        nodata = nodata + 1;


      });
    //  delete finallist[0]
      return finallist;
    }

    stdanswers(student,quizname,modulen):any[]{
      console.log(student,quizname,modulen);
      var finallist :any[];
      finallist = [];
      var nodata = 0;
      firebase.database().ref('/classes/'+modulen+'/students/'+student+'/quiz/'+quizname+'/ans').on('child_added', function(data){
        finallist[nodata]=data.val();
        nodata = nodata + 1;
      });
      return finallist;
    }


}
