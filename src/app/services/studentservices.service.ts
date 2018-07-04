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

  levelModule(studentID,year): Observable<string[]> {

    var Modulelist: any[] = [];
    firebase.database().ref('/Users/'+studentID+"/bnumber").on("value", function(data){
      var batchno = data.val();
    Modulelist = [];
    var x=0;
    firebase.database().ref('/batches/'+batchno+'/students/'+studentID+'/subjects/'+year).on("value", function(data){
        Modulelist[x]=data.val();
        x=x+1;
    });
  });
  console.log(Modulelist);
  return Observable.of(Modulelist);
}

enrol(module,studentID,moduleName,level){
  firebase.database().ref('/Users/'+studentID+"/bnumber").on("value", function(data){
    var batchno = data.val();
      console.log(batchno);
    firebase.database().ref('/batches/'+batchno+'/students/'+studentID+'/subjects/'+level+'/module/').set({
      moduleName
    });
  });


  firebase.database().ref('/classes/'+module+'/students/'+studentID).set({
    id : studentID,
    attendance : "",
    grade:"",
    grademark:""
  });
}


}
