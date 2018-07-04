import { Component, OnInit } from '@angular/core';
import { LeaveapproveService } from '../../services/leaveapprove.service';
import { Leave } from '../../models/leave'
@Component({
  selector: 'app-viewleave',
  templateUrl: './viewleave.component.html',
  styleUrls: ['./viewleave.component.css']
})
export class ViewleaveComponent implements OnInit {

  contentd : any = [];
  keys : string[] = [];
  selected = { to:undefined ,from:undefined, reason:undefined, discription:undefined, leaverequest:undefined, numofleaves:undefined};
  constructor(private _lservice: LeaveapproveService) { }

  ngOnInit() {
    this._lservice.getleaverequests().on("child_added", snapshot =>{
      if(snapshot.val().accept == "pending"){
        this.contentd.push(snapshot.val());
        this.keys.push(snapshot.key);
      }
      //$('#messageslist').append('<div  class="list-group-item animated fadeInLeft"><p>'+snapshot.val().content+'</p></div>');
    });
    console.log(this.contentd);
    /*this._lservice.getleaverequests().on("child_removed", snapshot =>{
      //this.contentd.remove(snapshot.val().content);
      const index: number = this.contentd.indexOf(snapshot.val().content);
      if (index !== -1) {
          this.contentd.splice(index, 1);
      }
      console.log(snapshot.val().content);
    });*/



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
  movedownl(x,y){
    this.selected = y;
    console.log(x);
      var K = "#"+x;
      $(K).slideToggle();

  }
  acceptleave(c){
    /*this._lservice.acceptrequest(this.contentd[c]);
    this.deletenotice(c);*/
    this._lservice.acceptrequest(this.keys[c]);
    this.contentd  = [];
    this.keys  = [];
    this._lservice.getleaverequests().on("child_added", snapshot =>{
      if(snapshot.val().accept == "pending"){
        this.contentd.push(snapshot.val());
        this.keys.push(snapshot.key);
      }
      //$('#messageslist').append('<div  class="list-group-item animated fadeInLeft"><p>'+snapshot.val().content+'</p></div>');
    });
  }

  refuseleave(c){
    /*this._lservice.acceptrequest(this.contentd[c]);
    this.deletenotice(c);*/
    this._lservice.refuseleave(this.keys[c]);
    this.contentd  = [];
    this.keys  = [];
    this._lservice.getleaverequests().on("child_added", snapshot =>{
      if(snapshot.val().accept == "pending"){
        this.contentd.push(snapshot.val());
        this.keys.push(snapshot.key);
      }
      //$('#messageslist').append('<div  class="list-group-item animated fadeInLeft"><p>'+snapshot.val().content+'</p></div>');
    });
  }
  /*deletenotice(index){
    var deletekey = this.keys[index];
    if (index !== -1) {
        this.contentd.splice(index, 1);
        this.keys.splice(index, 1);
    }
    this._lservice.deletenotice(deletekey);
  }*/
}
