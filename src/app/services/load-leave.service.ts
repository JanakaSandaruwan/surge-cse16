import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs/Observable';
import {Leave } from '../models/leave';
import { Subject } from '../models/subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
declare var firebase: any;
@Injectable()
export class LoadLeaveService {


  constructor(private _http: HttpClient) { }

  getNumLeave(usercode):number{
    var x : number;
    x = 0;
    firebase.database().ref('/leaveapplication/'+usercode+'/numofleaves/num').on('value', function(snapshot) {
      x = snapshot.val();
    });
    return x;
  }

  addLeaveApplication(id,reasonl,decriptionl,froml,tol,leavenuml){

    /*firebase.database().ref('/Leaveapplication/'+id+'/numofleaves').update({
      num:(leavenuml+1)
    });

    leavenuml=leavenuml+1;
    firebase.database().ref('/Leaveapplication/'+id+'/leaverequest/leave'+leavenuml).set({
       reason:reasonl,
       decription :decriptionl,
       from:froml,
       to:tol,
       accept:false
    });*/


    firebase.database().ref('/Leaveapplication/leaverequest').push({
       teachername:id,
       reason:reasonl,
       decription :decriptionl,
       from:froml,
       to:tol,
       accept:"pending"
    });
  }

  getLeaveInfo(id): Observable<Leave[]>{
    var finallist : Leave[];
    finallist = [];
    var nodata = 0;
    firebase.database().ref('/Leaveapplication/leaverequest').on('child_added', function(data) {
        finallist[nodata]=data.val();
        console.log(finallist[nodata]["teachername"]==id);

        if(data.val()["teachername"]==id){
          finallist[nodata]=data.val();
          nodata = nodata + 1;
        }

      });
      return Observable.of(finallist);

  }

  getLeaveInfoNum(id): Observable<Leave[]>{
    var finallist : Leave[];
    finallist = [];
    var nodata = 0;
    firebase.database().ref('/Leaveapplication/'+id).on('child_added', function(data) {
        finallist[nodata]=data.val();
        nodata = nodata + 1;
      });
      return Observable.of(finallist);

  }

  get(uname) :   Observable<any>{
    return this._http.get<any>('https://surge-44d21.firebaseio.com/Leaveapplication/'+uname+'/numofleaves'+'.json')
    .map((response : Response) => {return response});
  }
}
