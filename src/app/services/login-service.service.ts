import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpModule, Response } from '@angular/http';
import { Router } from '@angular/router';
declare var firebase: any;
import { Teacher } from '../models/teacher';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import 'rxjs/add/observable/of';

@Injectable()
export class LoginServiceService {
  constructor(private router:Router, private _http: HttpClient){

  }
  handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
  }
  removeUser(username){
    firebase.database().ref('Users/' + username).remove();
  }
  login(uname,pass) :   Observable<any>{
    return this._http.get<any>('https://surge-44d21.firebaseio.com/Users/'+uname+'.json').catch(this.handleError);
  }
  loginteacher(uname) :   Observable<any>{
    return this._http.get<any>('https://surge-44d21.firebaseio.com/teachers/'+uname+'.json')
    .map((response : Response) => {return response});
  }

  loginstudent(uname,bnumber){
    return this._http.get<any>('https://surge-44d21.firebaseio.com/batches/'+bnumber+'/students/'+uname+'.json')
    .map((response : Response) => {return response});
  }
  loginemployee(uname) :   Observable<any>{
    return this._http.get<any>('https://surge-44d21.firebaseio.com/employees/'+uname+'.json').map((response : Response) => {return response});
  }
  loginuser(uname){
    firebase.database().ref('Users/' + uname).update({
      loggedin: true,
    });
  }
  getloginstatus(uname) : boolean {
    var status : boolean;
    status = true;
    firebase.database().ref('Users/'+uname+'/loggedin').on('value', function(data) {
        status = data.val();
      });
    return status;
    //return status;
  }
  logoutuser(uname){
    firebase.database().ref('Users/' + uname).update({
      loggedin: false,
    });
  }
  adduser(newuser){
    firebase.database().ref('Users/' + newuser.ID).set({
      UName: newuser.username,
      Password: newuser.password,
      role : newuser.role,
      NIC : newuser.NIC
    });
    if(newuser.role == "student"){
      console.log(newuser.ID);
      console.log()
      firebase.database().ref('Users/' + newuser.ID).update({
        bnumber : newuser.bindex
      });
    }
  }
  checkNICs(nic) : Observable<boolean>{
    var exists : boolean = false
    firebase.database().ref('Users').on('child_added',function(data){
      if(data.val().NIC == nic ){
        exists = true;
      }
    });
    return Observable.of(exists);
  }

  updatepassword ( uname , pass ){
    firebase.database().ref('Users/' + uname).update({
      Password: pass,
    });
  }
  updatedetails (uname, role , fbday , name , fadd , fcontact, fcontact2 , femail ){
    console.log(role);
    if (role == "admin"){
      firebase.database().ref('employees/'+uname).update({
        fname : name,
        Address : fadd,
        email : femail,
        contact : fcontact,

      });
      if ( fcontact2 != undefined){
        firebase.database().ref('employees/'+uname).update({
          econtact : fcontact2
        });
      }
      if ( fbday != undefined){
        firebase.database().ref('employees/'+uname).update({
          bday : fbday
        });
      }
    }
  }
}
