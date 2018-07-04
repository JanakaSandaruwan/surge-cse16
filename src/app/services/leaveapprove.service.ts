import { Injectable } from '@angular/core';
declare var firebase : any;

@Injectable()
export class LeaveapproveService {

  constructor() { }

  getleaverequests() : any {
    return firebase.database().ref('/Leaveapplication/leaverequest');
  }

  acceptrequest(LeaveInfo){
    firebase.database().ref('/Leaveapplication/leaverequest/' + LeaveInfo).update({
      accept: "accepted"
    });
    /*firebase.database().ref('/teachers/'+LeaveInfo.teachername+'/acceptleave').push({
      From : LeaveInfo.from,
      To : LeaveInfo.to,
      Reason : LeaveInfo.reason
    });
    firebase.database().ref('/teachers/'+LeaveInfo.teachername+'/notifications').push("Leave for the "+LeaveInfo.from+" has been Accepted");*/
  }
  refuseleave(LeaveInfo){
    firebase.database().ref('/Leaveapplication/leaverequest/' + LeaveInfo).update({
      accept : "refused"
    });
    //firebase.database().ref('/teachers/'+LeaveInfo.teachername+'/notifications').push("Leave for the "+LeaveInfo.from+" has been Declined");
  }
  deletenotice(key){
    /*firebase.database().ref('/notices/'+key+'/files').on("child_added", snapshot => {
      var x = snapshot.val().filename ;
      firebase.storage().ref('/notices/'+key+'/'+x).delete();
    })
    firebase.database().ref('/Leaveapplication/leaverequest' + key).remove();*/
  }

}
