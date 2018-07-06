import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
@Component({
  selector: 'app-view-academic-progress',
  templateUrl: './view-academic-progress.component.html',
  styleUrls: ['./view-academic-progress.component.css']
})
export class ViewAcademicProgressComponent implements OnInit {
  gridApi : any;
  columnDefs : any[];
  rowSelection : any;
  gridColumnApi : any;
  results = [
    {subject: 'Mathematics', grade: "A+"},
    {subject: 'Electrical Componenets', grade: "B+" }

  ]
  constructor() {
    this.columnDefs = [
          {headerName: "Subject", field:"subject" , width: 350},
          {headerName: "Grade", field: "grade", width: 100},


      ];
      this.rowSelection = "multiple";
  }

  ngOnInit() {
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.results);

  }
  onBtnExport(): void {
    console.log("k");
    console.log(this.gridApi.getSelectedRows());
    if ( this.gridApi.getSelectedRows().length != 0){
      const params = {
        columnGroups: true,
        allColumns: true,
        fileName: 'filename_of_your_choice',
        onlySelected : true
      }
      this.gridApi.exportDataAsCsv(params);
    }else{
      console.log('d');
      const params = {
        columnGroups: true,
        allColumns: true,
        fileName: 'filename_of_your_choice'
      }
      this.gridApi.exportDataAsCsv(params);
    }
  }
}
