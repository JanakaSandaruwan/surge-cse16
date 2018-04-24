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
  constructor(private _nservice: NoticeserviceService) { }

  ngOnInit() {
    this._nservice.getnotices().on("child_added", snapshot =>{
      this.contentd.push(snapshot.val());
      this.keys.push(snapshot.key);
      console.log(this.keys);
      console.log(this.contentd);
      //$('#messageslist').append('<div  class="list-group-item animated fadeInLeft"><p>'+snapshot.val().content+'</p></div>');
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

  deletenotice(index){
    console.log(index);
    var deletekey = this.keys[index];
    if (index !== -1) {
        this.contentd.splice(index, 1);
        this.keys.splice(index, 1);
    }
    this._nservice.deletenotice(deletekey );
  }

}
