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

}
