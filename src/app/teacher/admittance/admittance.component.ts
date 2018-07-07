import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
import {LoadgradesService} from  "../../services/loadgrades.service" ;
declare var firebase: any;
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admittance',
  templateUrl: './admittance.component.html',
  styleUrls: ['./admittance.component.css'],
  providers:[LoadgradesService]
})
export class AdmittanceComponent implements OnInit {

	rowdisplay="block";
	adddisplay="none";
	viewdisplay="none";
  columnDefs : any[];
  rowData : any[];
  rowSelection : any;
  gridApi : any;
  gridColumnApi : any;
  selectedRows : any;
  newvalue:any;
  subjectname:string;
  //addmitancetable=[{ID:"2223",addmitance:70,present:1},{ID:"2123",addmitance:90,present:0},{ID:"2293",addmitance:78,present:1}];

  constructor(private gradeservice:LoadgradesService,private router:Router,private route: ActivatedRoute) {
    this.columnDefs = [
          {headerName: "ID", field: "id", width: 350},
          {headerName: "Total Precentage", field: "attendance", width: 250,editable:true},
          //{headerName: "Addmitance", field: "present", width: 350,editable:true},

      ];
      this.rowSelection = "single";
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
       //this.usercode = params['details'];
       console.log(params['subjectname']);
       this.subjectname=atob(params['subjectname']);
       //console.log((this.usercode));
       console.log((this.subjectname));
    });


  }

  gotoview(){
  	this.rowdisplay="none";
  	this.viewdisplay="block";

  }

  gotoadd(){
  	this.rowdisplay="none";
  	this.adddisplay="block";

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gradeservice.listgrades(this.subjectname).subscribe(val => {
     this.gridApi.setRowData(val);
   });
  }

  refresh(){
  //  this.gridApi.setRowData(this.addmitancetable);
   this.gradeservice.listgrades(this.subjectname).subscribe(val => {
    this.gridApi.setRowData(val);
  });
  }

  valuechange($event){
    this.newvalue=this.gridApi.getSelectedRows();
    console.log(this.newvalue);

    var num=Number(this.newvalue[0]["attendance"]);
    if(isNaN(num)){
      firebase.database().ref('classes/'+this.subjectname+'/students/'+this.newvalue[0]["id"]).update({
        attendance:""
      });

       this.refresh();
    }else{
      if(num>100 || num < 0){
        firebase.database().ref('classes/'+this.subjectname+'/students/'+this.newvalue[0]["id"]).update({
          attendance:""
        });

         this.refresh();
      }else{
        firebase.database().ref('classes/'+this.subjectname+'/students/'+this.newvalue[0]["id"]).update({
          attendance:Number(this.newvalue[0]["attendance"])
        });

         this.refresh();
      }

    }
}
}
