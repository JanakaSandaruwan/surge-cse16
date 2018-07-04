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
  selectedRows : any = [];
  Error : string;
  levels  = [{name:"Year 1"}, {name:"Year 2"}, {name:"Year 3"}, {name:"Year 4"}];
  availTeachers : Teacher[];
  batches : Batch[];
  noteacher : Observable<boolean> = Observable.of(true);
  classtaken : Observable<boolean>;
  showid : boolean = true;
  showname : boolean = true;


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

  constructor(private _teacherservice: LoadteacherService, private _batchservice: LoadbatchesService) {
    this.columnDefs = [
          {headerName: "", field:"", checkboxSelection: true, headerCheckboxSelection: true},
          {headerName: "Subject Code", field: "code", width: 350},
          {headerName: "Subject", field: "name", width: 475}

      ];
      this.rowSelection = "multiple";
  }
  changed(){
    console.log("ok");
  }
  Deletebutton(){
    if(this.selectedRows.length == 0 ){
      this.Error = "No rows selected to Delete";
      $("#errorbutton").click();
    }else{
      var i : number = 0;
      for (i=0;i<this.selectedRows.length;i++){
        this._teacherservice.saveSubjectlist(this.selectedRows[i].code,this.selectedRows[i].level,this.selectedRows[i].batch,this.selectedRows[i].tccode);
      }
    }
    this.SSubject = this._teacherservice.listSubjects();
    this.gridApi.setRowData(this.SSubject);
  }

  toggleid(){
    this.showid = !this.showid;
    this.gridColumnApi.setColumnVisible("code",this.showid);
  }

  fit(){
      this.gridApi.sizeColumnsToFit();
  }

  togglename(){
    this.showname = !this.showname
    this.gridColumnApi.setColumnVisible("name",this.showname);
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
