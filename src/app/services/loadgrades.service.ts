import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs/Observable';
import { Teacher } from '../models/teacher';
import { Grade } from '../models/grade';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
declare var firebase: any;

@Injectable()
export class LoadgradesService {

  constructor() { }

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


}
