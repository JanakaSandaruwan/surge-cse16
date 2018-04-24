import { Component, OnInit } from '@angular/core';
import { Subject } from '../../models/subject';
import { LoadteacherService } from '../../services/loadteacher.service';
import { GridOptions } from "ag-grid";
import { Teacher } from "../../models/teacher";
import { Batch } from '../../models/batch';
import { LoadbatchesService } from '../../services/loadbatches.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-viewsubjects',
  templateUrl: './viewsubjects.component.html',
  styleUrls: ['./viewsubjects.component.css']
})
export class ViewsubjectsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  csubject : Subject = <Subject>{};
  SSubject: any;
  columnDefs : any[];
  rowData : any[];
  rowSelection : any;
  gridApi : any;
  gridColumnApi : any;
  selectedRows : any;
  levels  = [{name:"Year 1"}, {name:"Year 2"}, {name:"Year 3"}, {name:"Year 4"}];
  availTeachers : Teacher[];
  batches : Batch[];
  noteacher : Observable<boolean> = Observable.of(true);
  classtaken : Observable<boolean>;

  constructor(private _teacherservice: LoadteacherService, private _batchservice: LoadbatchesService) {
    this.columnDefs = [
          {headerName: "Subject Code", field: "code", width: 350},
          {headerName: "Subject", field: "name", width: 475}

      ];
      this.rowSelection = "single";
  }
  changed(){
    console.log("ok");
  }
  Deletebutton(){
    console.log(this.selectedRows[0].code);
    this._teacherservice.saveSubjectlist(this.selectedRows[0].code);
    this.SSubject = this._teacherservice.listSubjects();
    this.gridApi.setRowData(this.SSubject);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.SSubject = this._teacherservice.listSubjects();
    console.log(this.SSubject);
    this.gridApi.setRowData(this.SSubject);
  }

  checkValidity(){
    this.classtaken = this._teacherservice.checkclassid(this.csubject.code,this.csubject.batch);
  }

  onSelectionChanged($event){
    this.selectedRows = this.gridApi.getSelectedRows();

  }

  ngOnInit(): void {
    this._teacherservice.listTeachers().subscribe(val => {
      this.availTeachers = val;
    });
    this._batchservice.listBatches()
        .subscribe(students => {
          console.log(students);
          this.batches = students;
        });

  }

  clear(){
    this.csubject.name = "";
    this.csubject.code = "";

  }

  refresh(){
    this.SSubject = this._teacherservice.listSubjects();
    this.gridApi.setRowData(this.SSubject);
  }

  AddSubject(){
    this._teacherservice.AddnewSubject(this.csubject);
    this.csubject.name = "";
    this.csubject.code = "";
    $('#button79').click();
  }


}
