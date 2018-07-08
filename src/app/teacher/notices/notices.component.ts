import { Component, OnInit } from '@angular/core';
import { NoticeserviceService } from '../../services/noticeservice.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  contentd : any = [];
  keys : string[] = [];
  selectednotice : any;
  selectedfiles : any = [];
  constructor(private storage:LocalStorageService, private _nservice: NoticeserviceService) { }

  ngOnInit() {
    if(this.storage.retrieve("role")=="teacher"){
      this._nservice.getTeachernotices().on("child_added", snapshot =>{
        this.contentd.push(snapshot.val());
        this.keys.push(snapshot.key);
        console.log(this.keys);
        console.log(this.contentd);
        //$('#messageslist').append('<div  class="list-group-item animated fadeInLeft"><p>'+snapshot.val().content+'</p></div>');
      });
      this._nservice.getTeachernotices().on("child_removed", snapshot =>{
        //this.contentd.remove(snapshot.val().content);
        const index: number = this.contentd.indexOf(snapshot.val().content);
        if (index !== -1) {
            this.contentd.splice(index, 1);
        }
        console.log(snapshot.val().content);
      });
    }

    if(this.storage.retrieve("role")=="student"){
      this._nservice.getStudentnotices().on("child_added", snapshot =>{
        this.contentd.push(snapshot.val());
        this.keys.push(snapshot.key);
        console.log(this.keys);
        console.log(this.contentd);
        //$('#messageslist').append('<div  class="list-group-item animated fadeInLeft"><p>'+snapshot.val().content+'</p></div>');
      });
      this._nservice.getnotices().on("child_added", snapshot =>{
        this.contentd.push(snapshot.val());
        this.keys.push(snapshot.key);
        console.log(this.keys);
        console.log(this.contentd);
        //$('#messageslist').append('<div  class="list-group-item animated fadeInLeft"><p>'+snapshot.val().content+'</p></div>');
      });
      this._nservice.getStudentnotices().on("child_removed", snapshot =>{
        //this.contentd.remove(snapshot.val().content);
        const index: number = this.contentd.indexOf(snapshot.val().content);
        if (index !== -1) {
            this.contentd.splice(index, 1);
        }
        console.log(snapshot.val().content);
      });
      this._nservice.getnotices().on("child_removed", snapshot =>{
        //this.contentd.remove(snapshot.val().content);
        const index: number = this.contentd.indexOf(snapshot.val().content);
        if (index !== -1) {
            this.contentd.splice(index, 1);
        }
        console.log(snapshot.val().content);
      });
    }




  }

  chooseselect(index){
    this.selectednotice = this.contentd[index];
    console.log(this.selectednotice);
    var obj = this.selectednotice.files;
    if ( obj != undefined){
      this.selectedfiles = Object.keys(obj).map(function(key) {
          return [Number(key), obj[key]];
      });
    }

    console.log(this.selectedfiles);
    $("#xxx").click();
  }



  deletenotice(index){
    console.log(index);
    var deletekey = this.keys[index];
    if (index !== -1) {
        this.contentd.splice(index, 1);
        this.keys.splice(index, 1);
    }
    this._nservice.deleteTeachernotices(deletekey );
  }

}
