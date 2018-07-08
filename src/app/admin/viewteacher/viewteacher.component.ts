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
  set : boolean = false;
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
  selectedRows : any = [];
  Error : string;
  subjectlist : any;
  nextid : number;
  showid : boolean = true;
  shownic : boolean = true;
  showadd : boolean = true;
  showcon : boolean = true;
  showname : boolean = true;
  showmail : boolean = true;
  DCCRows : Teacher = <Teacher>{};
  Success : string;

  setted(){
    this.set = true;
  }

  constructor(private _teacherservice: LoadteacherService,
    private _loginservice : LoginServiceService) {
        this.columnDefs = [
          {headerName: "", field:"", checkboxSelection: true, headerCheckboxSelection: true},
          {headerName: "ID", field: "ID", width: 350},
          {headerName: "Name", field: "fname", width: 475},
          {headerName: "NIC", field: "NIC", width: 350},
          {headerName: "Address", field: "Address", width: 350},
          {headerName: "Email", field: "email", width: 350},
          {headerName: "Contact", field: "contact", width: 350},
          ];
          this.rowSelection = "multiple";
    }
    Deletebutton(){
      if(this.selectedRows.length == 0 ){
        this.Error = "No rows selected to Delete";
        $("#errorbutton").click();
      }else{
        var i : number = 0;
        for (i=0;i<this.selectedRows.length;i++){
          this._loginservice.removeUser(this.selectedRows[i].username);
          this._teacherservice.saveTeacherlist(this.selectedRows[i].username);
        }
        $('#refresher').click();
        this.Success = "Successfuly deleted";
        $('#successbutton').click();
      }
    }

    toggleid(){
      this.showid = !this.showid;
      this.gridColumnApi.setColumnVisible("ID",this.showid);
    }

    fit(){
        this.gridApi.sizeColumnsToFit();
    }

    togglename(){
      this.showname = !this.showname
      this.gridColumnApi.setColumnVisible("fname",this.showname);
    }

    togglenic(){
      this.shownic = !this.shownic
      this.gridColumnApi.setColumnVisible("NIC",this.shownic);
    }

    getdown(){
      $('#menu').first().stop(true, true).slideDown();
    }

    toggleadd(){
      this.showadd = !this.showadd;
      this.gridColumnApi.setColumnVisible("Address",this.showadd);
    }

    togglemail(){
      this.showmail = !this.showmail;
      this.gridColumnApi.setColumnVisible("email",this.showmail);
    }

    togglecon(){
      this.showcon = !this.showcon;
      this.gridColumnApi.setColumnVisible("contact",this.showcon);
    }

    checkValidity(){
      this.setted();
      this.NICtaken = this._loginservice.checkNICs(this.cteacher.NIC);
    }
    onRDC($event){
      this.DCCRows = this.gridApi.getSelectedRows()[0];
      console.log(this.DCCRows);
      $('#save').click();
    }

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

    onGridReady(params) {
      var i : number = 0;
      console.log(this.STeachers);
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.setRowData(this.STeachers);
      this._teacherservice.listTeachers().subscribe(val => {
        this.gridApi.setRowData(val);
      });
      for(;i<10;i++){
        this.refresh();
      }

    }

    onSelectionChanged($event){
      this.selectedRows = this.gridApi.getSelectedRows();
    }

  ngOnInit(): void {
    var i : number = 0;
    this.subjectlist= this._teacherservice.listSubjects();
    this._teacherservice.listTeachers().subscribe(val => {
      console.log(val)
      this.STeachers = val;
    });
    this._teacherservice.gettid().subscribe(val => {
      this.nextid = val;
    });
    for(;i<10;i++){
      this.refresh();
    }
  }

  refresh(){
    this._teacherservice.listTeachers().subscribe(val => {
      this.gridApi.setRowData(val);
    });
  }

  clear(){
    this.set = false;
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
    this.Success = "Successfuly added";
    $('#successbutton').click();
  }
}
