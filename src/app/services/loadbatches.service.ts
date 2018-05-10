import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs/Observable';
import { Batch } from '../models/batch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
declare var firebase: any;

@Injectable()
export class LoadbatchesService {

  constructor(private _http: HttpClient) { }

  NextLevel(username, selected, length){
    var current: string;
    console.log('https://surge-44d21.firebaseio.com/batches/'+selected+'/students/' +username+'/Level.json');
    this._http.get<Batch[]>('https://surge-44d21.firebaseio.com/batches/'+selected+'/students/' +username+'/Level.json')
    .catch(this.handleError).subscribe(data => {
      current = data;
      if ( current == "entry"){

      }else if ( current == ""){

      }
    });
  }

  createBatch(batch: Batch, index: number): Observable<Batch> {
      return this._http.put<Batch>('https://surge-44d21.firebaseio.com/batches/' + index + '.json', batch)
          .catch(this.handleError);
  }

  saveBatchlist(username, selected, length){
    firebase.database().ref('/batches/' +selected).update({
      total : length-1
    });
    firebase.database().ref('/batches/' +selected+'/students/' +username).remove();
  }

  listBatches(): Observable<Batch[]> {
      return this._http.get<Batch[]>('https://surge-44d21.firebaseio.com/batches.json')
          .catch(this.handleError);
  }

  handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
  }

  listStudents(batchcode): Student[] {
    var finallist : Student[];
    finallist = [];
    var nodata = 0;
    firebase.database().ref('batches/' + batchcode+'/students/').on('child_added', function(data) {
        finallist[nodata]=data.val();
        nodata = nodata + 1;
      });
      console.log(finallist);
      return finallist;
  }
  Addnewstudent(student, index, nextid){
    firebase.database().ref('/batches/' +student.bindex).update({
      nextid : nextid,
      total : index+1
    });
    firebase.database().ref('/batches/' +student.bindex+'/students/'+student.ID).set({
      Address : student.Address,
      ID : student.ID,
      Level : student.Level,
      NIC : student.NIC,
      batchcode : student.batchcode,
      bindex : student.bindex,
      contact : student.contact,
      email : student.email,
      fname : student.fname,
      password : student.password,
      role : student.role,
      ps : student.ps,
      username : student.username
    });

  }
}
