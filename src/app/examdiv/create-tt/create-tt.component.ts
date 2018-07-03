import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";

@Component({
  selector: 'app-create-tt',
  templateUrl: './create-tt.component.html',
  styleUrls: ['./create-tt.component.css']
})
export class CreateTtComponent implements OnInit {

  gridApi : any;
  columnDefs : any[];
  rowSelection : any;


  results = [
    {subject: 'Mathematics', grade: "A+"},
    {subject: 'Electrical Componenets', grade: "B+" }

  ]
  constructor() {
    this.columnDefs = [
          {headerName: "Subject", field:"subject" , width: 350},
          {headerName: "Grade", field: "grade", width: 100},


      ];
      this.rowSelection = "multiple"; }

      onBtnExport(): void {
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

  ngOnInit() {
  }

}
