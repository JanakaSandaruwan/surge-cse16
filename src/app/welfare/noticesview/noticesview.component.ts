import { Component, OnInit } from '@angular/core';
import { NoticeserviceService } from '../../services/noticeservice.service';

@Component({
  selector: 'app-noticesview',
  templateUrl: './noticesview.component.html',
  styleUrls: ['./noticesview.component.css']
})
export class NoticesviewComponent implements OnInit {

  contentd : any = [];
  keys : string[] = [];
  selectednotice : any;
  selectedfiles : any = [];
  constructor(private _nservice: NoticeserviceService) { }

  ngOnInit() {
    this._nservice.deletelatenotices();
    this._nservice.getnotices().on("child_added", snapshot =>{
      this.contentd.push(snapshot.val());
      this.keys.push(snapshot.key);
      //$('#messageslist').append('<div  class="list-group-item animated fadeInLeft"><p>'+snapshot.val().content+'</p></div>');
    });
    this._nservice.getnotices().on("child_removed", snapshot =>{
      //this.contentd.remove(snapshot.val().content);
      const index: number = this.contentd.indexOf(snapshot.val().content);
      if (index !== -1) {
          this.contentd.splice(index, 1);
      }
    });



  }

  chooseselect(index){
    this.selectednotice = this.contentd[index];
    var obj = this.selectednotice.files;
    if ( obj != undefined){
      this.selectedfiles = Object.keys(obj).map(function(key) {
          return [Number(key), obj[key]];
      });
    }

    $("#xxx").click();
  }



  deletenotice(index){
    var deletekey = this.keys[index];
    if (index !== -1) {
        this.contentd.splice(index, 1);
        this.keys.splice(index, 1);
    }
    this._nservice.deletenotice(deletekey );
  }

}
