import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
declare var firebase: any;
@Injectable()
export class LoademployeesService {

  constructor(private _http: HttpClient) { }
  AddnewEmployee(employee) {
    firebase.database().ref('/employees/'+employee.ID).set({
      Address : employee.Address,
      ID : employee.ID,
      NIC : employee.NIC,
      contact : employee.contact,
      email : employee.email,
      fname : employee.fname,
      password : employee.password,
      role : employee.role,
      username : employee.username
    });
  }
  saveEmployeelist(EmployeeID){
    firebase.database().ref('/employees/'+EmployeeID).remove();
  }

  listEmployees(): Observable<Employee[]> {
    var finallist : Employee[];
    finallist = [];
    var nodata = 0;
    firebase.database().ref('employees').on('child_added', function(data) {
        finallist[nodata]=data.val();
        nodata = nodata + 1;
      });
      return Observable.of(finallist);
  }
}
