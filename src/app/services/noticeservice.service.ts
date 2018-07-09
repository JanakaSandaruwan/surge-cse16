import { Injectable } from '@angular/core';
declare var firebase : any;
import { UploadserviceService } from './uploadservice.service';

@Injectable()
export class NoticeserviceService {

  constructor(private _upload : UploadserviceService) { }

  postnotice(sub , des , date, files){
    const pushrequest = firebase.database().ref('notices').push({
      subject : sub,
      description : des,
      enddate : date
    });
    const pushkey = pushrequest.key;
    console.log(pushkey);
    console.log(files);
    this._upload.uploadNoticefiles(pushkey,files);
    this.deletelatenotices();
  }

  postspecificnotice(sub , des , date, files , user){
    console.log(user);
    if (user == "Teacher"){const pushrequest = firebase.database().ref('teachernotices').push({
      subject : sub,
      description : des,
      enddate : date
    });
    const pushkey = pushrequest.key;
    console.log(pushkey);
    console.log(files);
    this._upload.uploadNoticefilesSpecific(pushkey,files,user);
  }else{
    const pushrequest = firebase.database().ref('studentnotices').push({
      subject : sub,
      description : des,
      enddate : date
    });
    const pushkey = pushrequest.key;
    console.log(pushkey);
    console.log(files);
    this._upload.uploadNoticefilesSpecific(pushkey,files,user);
  }
}

  getnotices(){
    return firebase.database().ref('/notices');
  }

  getTeachernotices(){
    return firebase.database().ref('/teachernotices');
  }

  getStudentnotices(){
    return firebase.database().ref('/studentnotices');
  }

  deletenotice(key){
    firebase.database().ref('/notices/'+key+'/files').on("child_added", snapshot => {
      var x = snapshot.val().filename ;
      firebase.storage().ref('/notices/'+key+'/'+x).delete();
    })
    firebase.database().ref('/notices/' + key).remove();
  }

  deleteTeachernotices(key){
    firebase.database().ref('/studentnotices/'+key+'/files').on("child_added", snapshot => {
      var x = snapshot.val().filename ;
      firebase.storage().ref('/studentnotices/'+key+'/'+x).delete();
    })
    firebase.database().ref('/studentnotices/' + key).remove();
  }

  deletelatenotices(){
    var year : string;
    var month : string;
    var day : string;
    var deletelater : string[] = [];
    firebase.database().ref('/notices/').on("child_added",snapshot=>{
      year = snapshot.val().enddate.substring(0,4);
      month = snapshot.val().enddate.substring(5,7);
      day = snapshot.val().enddate.substring(8,10);
      console.log(month);
      const d: Date = new Date();
      if(d.getFullYear() > +year){
        console.log(d.getFullYear());
        this.deletenotice(snapshot.key);
      }else if(d.getFullYear() == +year){
        if(d.getMonth() + 1 > +month){
          this.deletenotice(snapshot.key);
        }else if(d.getMonth() + 1 == +month){
          if(d.getDate() > +day){
            console.log(1);
            this.deletenotice(snapshot.key);
          }
        }
      }
    });
    firebase.database().ref('/studentnotices/').on("child_added",snapshot=>{
      year = snapshot.val().enddate.substring(0,4);
      month = snapshot.val().enddate.substring(5,7);
      day = snapshot.val().enddate.substring(8,10);
      console.log(month);
      const d: Date = new Date();
      if(d.getFullYear() > +year){
        console.log(d.getFullYear());
        this.deletenotice(snapshot.key);
      }else if(d.getFullYear() == +year){
        if(d.getMonth() + 1 > +month){
          this.deletenotice(snapshot.key);
        }else if(d.getMonth() + 1 == +month){
          if(d.getDate() > +day){
            console.log(1);
            this.deletenotice(snapshot.key);
          }
        }
      }
    });
    firebase.database().ref('/teachernotices/').on("child_added",snapshot=>{
      year = snapshot.val().enddate.substring(0,4);
      month = snapshot.val().enddate.substring(5,7);
      day = snapshot.val().enddate.substring(8,10);
      console.log(month);
      const d: Date = new Date();
      if(d.getFullYear() > +year){
        console.log(d.getFullYear());
        this.deletenotice(snapshot.key);
      }else if(d.getFullYear() == +year){
        if(d.getMonth() + 1 > +month){
          this.deletenotice(snapshot.key);
        }else if(d.getMonth() + 1 == +month){
          if(d.getDate() > +day){
            console.log(1);
            this.deletenotice(snapshot.key);
          }
        }
      }
    });
  }

}
