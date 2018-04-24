import { Component, OnInit } from '@angular/core';
import { LeaveapproveService } from '../../services/leaveapprove.service';

@Component({
  selector: 'app-viewleave',
  templateUrl: './viewleave.component.html',
  styleUrls: ['./viewleave.component.css']
})
export class ViewleaveComponent implements OnInit {

  contentd : any = [];
  keys : string[] = [];
  constructor(private _lservice: LeaveapproveService) { }

  ngOnInit() {
    this._lservice.getleaverequests().on("child_added", snapshot =>{
      this.contentd.push(snapshot.val());

      /*this.keys.push(snapshot.key);
      console.log(this.keys);*/
      //$('#messageslist').append('<div  class="list-group-item animated fadeInLeft"><p>'+snapshot.val().content+'</p></div>');
    });
    console.log(this.contentd);
    this._lservice.getleaverequests().on("child_removed", snapshot =>{
      //this.contentd.remove(snapshot.val().content);
      const index: number = this.contentd.indexOf(snapshot.val().content);
      if (index !== -1) {
          this.contentd.splice(index, 1);
      }
      console.log(snapshot.val().content);
    });



  }

  /*deletenotice(index){
    console.log(index);
    var deletekey = this.keys[index];
    if (index !== -1) {
        this.contentd.splice(index, 1);
        this.keys.splice(index, 1);
    }
    this._nservice.deletenotice(deletekey );
  }*/

}
