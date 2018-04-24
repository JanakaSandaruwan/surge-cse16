import { Injectable } from '@angular/core';
declare var firebase : any;
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UpdatemessagesService {

  constructor() { }

  getmessages() : any {
    return firebase.database().ref('/messages');
  }



}
