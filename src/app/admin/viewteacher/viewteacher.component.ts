import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { LoadteacherService } from '../../services/loadteacher.service';
import { Student } from '../../models/student';
import { LoginServiceService } from '../../services/login-service.service';
import { GridOptions } from "ag-grid";
import { Subject } from "../../models/subject"
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-viewteacher',
  templateUrl: './viewteacher.component.html',
  styleUrls: ['./viewteacher.component.css']
})
export class ViewteacherComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  name : string;
  phone : string;
  NICtaken : Observable<boolean>;
  cteacher : Teacher = <Teacher>{};
  STeachers: any;
  selected: string;
  columnDefs : any[];
  rowData : any[];
  rowSelection : any;
  gridApi : any;
  gridColumnApi : any;
  selectedRows : any;
  subjectlist : any;
  nextid : number;
  DCCRows : Teacher = <Teacher>{};


  constructor(private _teacherservice: LoadteacherService,
    private _loginservice : LoginServiceService) {
      this.columnDefs = [
            {headerName: "ID", field: "ID", width: 350},
            {headerName: "Name", field: "fname", width: 475},
            {headerName: "NIC", field: "NIC", width: 350},

        ];
        this.rowSelection = "single";
    }
    Deletebutton(){
      this._loginservice.removeUser(this.selectedRows[0].username);
      console.log(this.selectedRows[0].username);
      this._teacherservice.saveTeacherlist(this.selectedRows[0].username);
      $('#refresher').click();
    }
    checkValidity(){
      this.NICtaken = this._loginservice.checkNICs(this.cteacher.NIC);
    }
    onRDC($event){
      this.DCCRows = this.gridApi.getSelectedRows()[0];
      console.log(this.DCCRows);
      $('#save').click();
    }

    onGridReady(params) {
      console.log(this.STeachers);
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.setRowData(this.STeachers);
      this._teacherservice.listTeachers().subscribe(val => {
        this.gridApi.setRowData(val);
      });
    }

    onSelectionChanged($event){
      this.selectedRows = this.gridApi.getSelectedRows();
    }

  ngOnInit(): void {
    this.subjectlist= this._teacherservice.listSubjects();
    this._teacherservice.listTeachers().subscribe(val => {
      this.STeachers = val;
    });
    this._teacherservice.gettid().subscribe(val => {
      this.nextid = val;
    });
  }

  refresh(){
    this._teacherservice.listTeachers().subscribe(val => {
      this.gridApi.setRowData(val);
    });
  }

  clear(){
    this.cteacher.fname = "";
    this.cteacher.NIC = "";
    this.cteacher.Address = "";
    this.cteacher.contact = "";
    this.cteacher.email = "";

  }

  AddTeacher(){
    this._teacherservice.gettid().subscribe(val => {
      this.nextid = val;
    });
    console.log(this.nextid);
    this.cteacher.password = "teacher123";
    this.cteacher.role = "teacher";
    console.log(this.nextid);
      if (this.nextid < 10){
        this.cteacher.ID = "tc000"+this.nextid;
      }else if (this.nextid< 100){
        this.cteacher.ID = "tc00"+this.nextid;
      }else if (this.nextid < 1000){
        this.cteacher.ID = "tc0"+this.nextid;
      }else{
        this.cteacher.ID = "tc"+this.nextid;
      }
      this.nextid = this.nextid + 1;
      this.cteacher.username = this.cteacher.ID;
      this._teacherservice.AddnewTeacher(this.cteacher, this.nextid);

    this._loginservice.adduser(this.cteacher);
    this.cteacher.fname = "";
    this.cteacher.NIC = "";
    this.cteacher.Address = "";
    this.cteacher.contact = "";
    this.cteacher.email = "";
    $('#refresher').click();
    $('#button79').click();
  }
}
