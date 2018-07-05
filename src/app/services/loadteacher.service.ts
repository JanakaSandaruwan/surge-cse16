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
export class LoadteacherService {

  constructor(private _http: HttpClient) { }

  AddnewTeacher(teacher, nextid) {
    firebase.database().ref().update({
      nexttid : nextid
    });
    firebase.database().ref('/teachers/'+teacher.ID).set({
      Address : teacher.Address,
      ID : teacher.ID,
      NIC : teacher.NIC,
      contact : teacher.contact,
      email : teacher.email,

      fname : teacher.fname,
      password : teacher.password,
      role : teacher.role,
      username : teacher.username
    });
  }

  listTeachers(): Observable<Teacher[]> {
    /*this.af.database.list('teachers').subscribe(
      val => console.log(val)
    );*/
    var finallist : Teacher[];
    finallist = [];
    var nodata = 0;
    firebase.database().ref('teachers').on('child_added', function(data) {
        finallist[nodata]=data.val();
        nodata = nodata + 1;
      });
      return Observable.of(finallist);
  }

  handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
  }

  saveTeacherlist(teacher){
    console.log("k");
    firebase.database().ref('/teachers/'+teacher+'/subjects').on('child_added', function(data) {
      console.log('/subjects/'+data.val().level+'/'+data.key);
        firebase.database().ref('/subjects/'+data.val().level+'/'+data.key).remove();
      });
    firebase.database().ref('/teachers/'+teacher).remove();
  }

  saveSubjectlist(subjectcode,subjectlevel,subjectbatch,subjectteacher){
    firebase.database().ref('/teachers/'+subjectteacher+'/subjects/'+subjectcode+subjectbatch).remove();
    firebase.database().ref('/subjects/'+subjectlevel+'/'+subjectcode+subjectbatch).remove();
  }

  AddnewSubject(subject){
    firebase.database().ref('/subjects/'+subject.level+'/'+subject.code+subject.batch).set({
      code : subject.code,
      name : subject.name,
      batch : subject.batch,
      teacher : subject.teacher.fname,
      level : subject.level,
      tccode : subject.teacher.username
    });
    firebase.database().ref('/teachers/'+subject.teacher.username+"/subjects/"+subject.code+subject.batch).set({
      name:subject.name,
      level: subject.level });
  }

  checkclassid(code,batch) : Observable<boolean>{
    var exists : boolean = false
    firebase.database().ref('subjects').on('child_added',function(data){
      if((data.val().code == code) && (data.val().batch == batch) ){
        exists = true;
      }
    });
    return Observable.of(exists);
  }

  gettid() : Observable<number> {
    return this._http.get<number>('https://surge-44d21.firebaseio.com/nexttid.json')
        .catch(this.handleError);
  }

  listSubjects(): Subject[] {
    var finallist : Subject[];
    finallist = [];
    var nodata = 0;
    firebase.database().ref('subjects/Year 1').on('child_added', function(data) {
        finallist[nodata]=data.val();
        nodata = nodata + 1;
      });
      firebase.database().ref('subjects/Year 2').on('child_added', function(data) {
          finallist[nodata]=data.val();
          nodata = nodata + 1;
        });
        firebase.database().ref('subjects/Year 3').on('child_added', function(data) {
            finallist[nodata]=data.val();
            nodata = nodata + 1;
          });
          firebase.database().ref('subjects/Year 4').on('child_added', function(data) {
              finallist[nodata]=data.val();
              nodata = nodata + 1;
            });
      return finallist;
  }

  listTSubjects(tname) : Observable<Subject[]> {
    var finallist : Subject[];
    finallist = [];
    var nodata = 0;
    firebase.database().ref('teachers/'+tname+'/subjects').on('child_added', function(data) {

          finallist[nodata]=data.key;
          nodata = nodata + 1;

      });
      return Observable.of(finallist);
  }
  fname(usercode):string{
    var status:string;
    firebase.database().ref('teachers/'+usercode+'/fname').on('value', function(data) {
        status = data.val();
      });

      return status;
  }


}
