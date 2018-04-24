import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
import {LoadquizService} from '../../../services/loadquiz.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-displaymark',
  templateUrl: './displaymark.component.html',
  styleUrls: ['./displaymark.component.css'],
  providers:[LoadquizService]
})
export class DisplaymarkComponent implements OnInit {

  columnDefs : any[];
  rowData : any[];
  rowSelection : any;
  gridApi : any;
  gridColumnApi : any;
  selectedRows : any;
  subjectname:string;
  //mark=[{ID:"bc20150000",quiz1:"45",quiz2:"55",quiz3:"55"},{ID:"bc20150001",quiz1:"45",quiz2:"15",quiz3:"85"}];
  mark=[];
  constructor(private router:Router, private loadquiz:LoadquizService, private route: ActivatedRoute) {
    this.columnDefs = [
          {headerName: "ID", field: "ID", width: 400},
          {headerName: "Quiz1", field: "quiz1", width: 200},
          {headerName: "Quiz2", field: "quiz2", width: 200},
          {headerName: "Quiz3", field: "quiz3", width: 200,editable:true}

      ];
      this.rowSelection = "single";
        //this.columnDefs.editable=true;

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.usercode = params['details'];
       this.subjectname=atob(params['subjectname']);
       //console.log((this.usercode));
       console.log((this.subjectname));
    });

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  refresh(){

     var list=this.loadquiz.quizMarks(this.subjectname);
     var i=0;
     console.log("this.mark");
     while(i<list.length){
       var ls={};
       ls["quiz"+(i+1)]=list[i]["quiz"]["quiz"+(i+1)]["mark"];
       ls["ID"]=list[i]["ID"];
       //console.log(list[i]["quiz"]);
       this.mark.push(ls);
       i=i+1;
     }

     console.log(this.mark);
    this.gridApi.setRowData(this.mark);

  }

  addQuizMark(){
    console.log("add new column");
    this.columnDefs.push({headerName: "Quiz4", field: "quiz4", width: 200,editable:true});
    this.mark[0]["quiz4"]="nodata";
    this.mark[1]["quiz4"]="nodata";
    //console.log(this.columnDefs);
    //console.log(this.mark);
    this.gridApi.setColumnDefs(this.columnDefs);
    this.gridApi.setRowData(this.mark);
  }


}
