import { Injectable } from '@angular/core';
declare var firebase : any;

@Injectable()
export class LeaveapproveService {

  constructor() { }

  getleaverequests() : any {
    return firebase.database().ref('/Leaveapplication/leaverequest');
  }

}
