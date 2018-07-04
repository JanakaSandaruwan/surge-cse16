import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';
import {Observable} from 'rxjs/Observable';
declare var firebase:any;
@Injectable()
export class StudentservicesService {

    constructor() { }

  listModule(year): Observable<Subject[]> {
    var finallist : Subject[];
    finallist = [];
    var x=0;
    firebase.database().ref('subjects/'+year).on('child_added', function(data) {
        finallist[x]=data.val();
        x=x+1;
      });
      return Observable.of(finallist);
  }



}
