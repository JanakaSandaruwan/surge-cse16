import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {LoadLeaveService} from '../../../services/load-leave.service';
import {LoadteacherService} from '../../../services/loadteacher.service';
import { GridOptions } from "ag-grid";
@Component({
  selector: 'app-sendleave',
  templateUrl: './sendleave.component.html',
  styleUrls: ['./sendleave.component.css'],
  providers:[LoadLeaveService,LoadteacherService]

})
export class SendleaveComponent implements OnInit {
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

  constructor(private router:Router, private route: ActivatedRoute,private leave:LoadLeaveService,private teacher:LoadteacherService) {  }

  ngOnInit() {

    this.route.params.subscribe(params => {
       this.usercode =atob( params['details']);
       console.log((this.usercode));
    });

  }

  send(){
    console.log("sending");

    this.leavenum=this.leave.getNumLeave(this.usercode);
    this.leave.addLeaveApplication(this.usercode,this.reason,this.discription,this.from,this.to,this.leavenum);
    console.log("sending ok");
  }

  cancel(){
    console.log("navigate to leaveapplication");
    this.router.navigate(['../teacher/leaveapplication', {details : this.usercode}]);
    console.log("navigate to leaveapplication");
  }

}
