import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Student } from './batch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class LoadbatchesService {

  constructor(private _http: HttpClient) { }

  createBatch(batch: Batch, index: number): Observable<Batch> {
      return this._http.put<Batch>('https://surge-44d21.firebaseio.com/batches/' + index + '.json', batch)
          .catch(this.handleError);
  }

  listBatches(): Observable<Batch[]> {
      return this._http.get<Batch[]>('https://surge-44d21.firebaseio.com/batches.json')
          .catch(this.handleError);
  }

  handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
  }

  listStudents(batchcode): Observable<Student[]> {
      return this._http.get<Student[]>('https://surge-44d21.firebaseio.com/batches/'+batchcode+'/students.json')
          .catch(this.handleError);
  }
}
