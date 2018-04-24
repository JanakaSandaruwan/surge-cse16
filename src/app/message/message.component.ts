import { Component, OnInit } from '@angular/core';
import { UpdatemessagesService } from '../services/updatemessages.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  contentd : string[] = [];
  constructor(private _msgservice: UpdatemessagesService) { }

  ngOnInit() {
    this._msgservice.getmessages().on("child_added", snapshot =>{
      this.contentd.push(snapshot.val().content);
      console.log(this.contentd);
      //$('#messageslist').append('<div  class="list-group-item animated fadeInLeft"><p>'+snapshot.val().content+'</p></div>');
    });
    this._msgservice.getmessages().on("child_removed", snapshot =>{
      //this.contentd.remove(snapshot.val().content);
      const index: number = this.contentd.indexOf(snapshot.val().content);
      if (index !== -1) {
          this.contentd.splice(index, 1);
      }
      console.log(snapshot.val().content);
    });



  }


}
