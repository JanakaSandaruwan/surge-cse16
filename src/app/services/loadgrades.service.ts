import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs/Observable';
import { Teacher } from '../models/teacher';
import { Grade } from '../models/grade';
import { StudentservicesService } from '../services/studentservices.service';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Subject } from '../models/subject';
declare var firebase: any;

@Injectable()
export class LoadgradesService {

  constructor(private sservice :StudentservicesService) { }

  listgrades(subjectname):Observable<Grade[]>{

    var finallist : Grade[];
    finallist=[];
    var nodata = 0;
    firebase.database().ref('classes/'+subjectname+'/students').on('child_added', function(data) {
        finallist[nodata]=data.val();
        nodata = nodata + 1;

      });
     console.log(finallist);
     return Observable.of(finallist);
  }

  listgradesof(student,year):Observable<Grade[]>{
    var SubofYear : any[] = [];
    var grade : Grade[] =[]
    this.sservice.levelModule(student,year).subscribe(data => {
      SubofYear = data;
      var i = 0 ;
      for (;i<SubofYear.length;i++){
        console.log('classes/'+SubofYear[i].moduleNo+'/students/'+student);
        firebase.database().ref('classes/'+SubofYear[i].moduleNo+'/students/'+student).on('value', function(data){
          grade[i]= <Grade>{};
          grade[i].Subjectname = SubofYear[i];
          grade[i].ID = student;
          grade[i].attendance = data.val().attendance;
          grade[i].grade = data.val();
        });
      }
    });
    return Observable.of(grade);
  }


}
