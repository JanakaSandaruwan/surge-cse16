import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
declare var firebase: any;

@Injectable()
export class LoginServiceService {
  constructor(private router:Router){

  }
  login(uname,pass){
    firebase.database().ref("Users").orderByChild("UName").equalTo(uname).once("value",snapshot => {
      const userData = snapshot.val();
      var pas="";
      var rol="";
      if( !userData ){
        console.log("invalid username");
      }else{
        snapshot.forEach(function (childSnapshot) {

            var value = childSnapshot.val();
            pas = value.Password;
            rol = value.role;
            console.log(rol);
        }
        if ( pas != pass ){
          console.log("invalid password");
        }else if (rol == "\"Admin"){
          this.router.navigate(['admin']);
        }
      }
    });
  }

}
