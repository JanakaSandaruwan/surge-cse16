import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {LoadLeaveService} from '../../../services/load-leave.service';
import {LoadteacherService} from '../../../services/loadteacher.service';
import { GridOptions } from "ag-grid";
declare var firebase :any;

@Component({
  selector: 'app-leaveinfo',
  templateUrl: './leaveinfo.component.html',
  styleUrls: ['./leaveinfo.component.css'],
  providers:[LoadLeaveService,LoadteacherService]
})
export class LeaveinfoComponent implements OnInit {
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

  constructor(private router:Router, private route: ActivatedRoute,private leave:LoadLeaveService,private teacher:LoadteacherService) {
    this.columnDefs = [
          {headerName: "From", field: "from", width: 300},
          {headerName: "To", field: "to", width: 300},
          {headerName: "Reason", field: "reason", width: 400},
          {headerName: "Accept", field: "accept", width: 300},
      ];
      this.rowSelection = "single";
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
       this.usercode = atob(params['details']);
       console.log((this.usercode));
    });

    this.leave.getLeaveInfo(this.usercode).subscribe(val => {
      this.gridApi.setRowData(val);
    });

    firebase.database().ref('/leaveapplication/'+this.usercode+'/numofleaves').on('value', function(snapshot) {
      this.leavenum = snapshot.val();
    });

    console.log(this.leavenum);

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.leave.getLeaveInfo(this.usercode).subscribe(val => {
      this.gridApi.setRowData(val);
    });

  /*  var list=[];
    this.leave.getLeaveInfoNum(this.usercode).subscribe(
      val => {
        list.push(val);
      }
    );
    this.leavenum=list[0][0];
    console.log(list[0][0]);
  }*/
}
  refresh(){

  //  console.log(list[1]["num"]);

  /*var list=[];
  console.log(this.leave.getLeaveInfoNum(this.usercode));
  this.leave.getLeaveInfoNum(this.usercode).subscribe(
    val => {
      list.push(val);
      //console.log(val);
    }
  );
  this.leavenum=list[1];
  //console.log(list);
  list=<Array<any>>list;
  console.log(list[1]);
*/
var y=this.leave.get(this.usercode);
console.log(y);
var x:number;
x=0;
firebase.database().ref('/leaveapplication/'+this.usercode+'/numofleaves').on('value', function(snapshot) {
  x= snapshot.val();
});
this.leavenum =x;

console.log("this.leavenum");
console.log(this.leavenum);
    console.log(this.leave.getLeaveInfo(this.usercode));
    this.leave.getLeaveInfo(this.usercode).subscribe(val => {
      this.gridApi.setRowData(val);
    });

  }

  cancel(){

    this.router.navigate(['../teacher/leaveapplication', {details : this.usercode}]);
    console.log("navigate to leaveapplication");
  }

}
