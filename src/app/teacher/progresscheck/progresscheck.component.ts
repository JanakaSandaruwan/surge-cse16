import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
import {LoadgradesService} from  "../../services/loadgrades.service" ;
declare var firebase: any;
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-progresscheck',
  templateUrl: './progresscheck.component.html',
  styleUrls: ['./progresscheck.component.css'],
  providers: [LoadgradesService]
})
export class ProgresscheckComponent implements OnInit {

  columnDefs : any[];
  rowData : any[];
  rowSelection : any;
  gridApi : any;
  gridColumnApi : any;
  selectedRows : any;
  newvalue:any;
  len:number;
  subjectname:string;

  constructor(private gradeservice :LoadgradesService,private router:Router,private route: ActivatedRoute) {
    this.columnDefs =[
          {headerName: "ID", field: "ID", width: 350},
          {headerName: "Final mark", field: "grade", width: 350, editable:true},
          {headerName: "Grade", field: "grademark", width: 350},

      ];
      this.rowSelection = "single";
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gradeservice.listgrades(this.subjectname).subscribe(val => {
      this.gridApi.setRowData(val);
    });
  }

  refresh(){
    var list=this.gradeservice.listgrades(this.subjectname);
    this.gradeservice.listgrades(this.subjectname).subscribe(val => {
      this.gridApi.setRowData(val);
    });
  //  console.log("kkkkk"+this.marks);

  }

  valuechange($event){
    this.newvalue=this.gridApi.getSelectedRows();
   console.log(this.newvalue[0]["ID"]);
   firebase.database().ref('classes/'+this.subjectname+'/students/'+this.newvalue[0]["ID"]).update({
     grade:Number(this.newvalue[0]["grade"]),
     grademark:this.getGrade(Number(this.newvalue[0]["grade"]))
   });

    this.refresh();

  }

  getGrade(mark):string{
    if(mark>=85){
      return "A+";
    }else if(mark>=75){
      return "A";
    }else if(mark>=70){
      return "A-";
    }else if(mark>=65){
      return "B+";
    }else if(mark>=60){
      return "B";
    }else if(mark>=55){
      return "B-";
    }else if(mark>=50){
      return "C+";
    }else if(mark>=45){
      return "C";
    }else if(mark>=40){
      return "C-";
    }
    else{
      return "F";

    }
  }

  onSelectionChanged($event){
    this.selectedRows = this.gridApi.getSelectedRows();
    //console.log(this.selectedRows);

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       //this.usercode = params['details'];
       this.subjectname=atob(params['subjectname']);
       //console.log((this.usercode));
       console.log((this.subjectname));
    });
  }

}
