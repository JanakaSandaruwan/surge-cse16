import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {LoadLeaveService} from '../../services/load-leave.service';
import {LoadteacherService} from '../../services/loadteacher.service';
import { GridOptions } from "ag-grid";

declare var firebase:any;
@Component({
  selector: 'app-leaveapplication',
  templateUrl: './leaveapplication.component.html',
  styleUrls: ['./leaveapplication.component.css'],
  providers:[LoadLeaveService,LoadteacherService]
})
export class LeaveapplicationComponent implements OnInit {
  usercode:string;
  reason:string;
  from:string;
  to:string;
  discription:string;
  leavenum: number;
  num:string;
  columnDefs : any[];
  rowData : any[];
  rowSelection : any;
  gridApi : any;
  gridColumnApi : any;
  selectedRows : any;

  //list=[{from:"22222",to:"55555",reoson:"ttttt",test:{accept:"ryue"}},{from:"22222",to:"55555",reoson:"ttttt",test:{accept:"ryue"}},{from:"22222",to:"55555",reoson:"ttttt",test:{accept:"ryue"}},{from:"23333",to:"55335",reoson:"ttttt",test:{accept:"ryue"}}];
  constructor(private router:Router, private route: ActivatedRoute,private leave:LoadLeaveService,private teacher:LoadteacherService) {}




  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode = atob(params['details']);
       console.log((this.usercode));
    });
}

  gotosend(){
    this.router.navigate(['../teacher/leaveapplication/sendleave', {details : btoa(this.usercode)}]);
    console.log("navigate to leaveapplication/sendleave");

  }

  gotoinfo(){
    this.router.navigate(['../teacher/leaveapplication/leaveinfo', {details : btoa(this.usercode)}]);
    console.log("navigate to leaveapplication");
  }







}
