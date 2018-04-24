import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { LoademployeesService } from '../../services/loademployees.service';
import { LoginServiceService } from '../../services/login-service.service';
import { GridOptions } from "ag-grid";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-viewemployees',
  templateUrl: './viewemployees.component.html',
  styleUrls: ['./viewemployees.component.css']
})
export class ViewemployeesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  name : string;
  phone : string;
  cemployee : Employee = <Employee>{};
  SEmployees: any;
  selected: string;
  columnDefs : any[];
  rowSelection : any;
  gridApi : any;
  gridColumnApi : any;
  DCCRows : Employee = <Employee>{};
  selectedRows : any;
  NICtaken : Observable<boolean>;

  constructor(private _employeeservice: LoademployeesService,
    private _loginservice : LoginServiceService) {
      this.columnDefs = [
            {headerName: "ID", field: "ID", width: 350},
            {headerName: "Name", field: "fname", width: 475},
            {headerName: "Role", field: "role", width: 350},

        ];
        this.rowSelection = "single";
    }
    onRDC($event){
      this.DCCRows = this.gridApi.getSelectedRows()[0];
      console.log(this.DCCRows);
      $('#save').click();
    }
    checkValidity(){
      this.NICtaken = this._loginservice.checkNICs(this.cemployee.NIC);
    }
    Deletebutton(){
      if(this._loginservice.getloginstatus(this.selectedRows[0].username) == true){
        console.log("cannot delete a currently logged in user");
        $('#save2').click();
      }else{
        this._loginservice.removeUser(this.selectedRows[0].username);
        console.log(this.selectedRows[0].username);
        this._employeeservice.saveEmployeelist(this.selectedRows[0].username);
        $('#refresher').click();
      }
    }
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this._employeeservice.listEmployees().subscribe(val =>{
        this.gridApi.setRowData(val);
      });
    }

    onSelectionChanged($event){
      this.selectedRows = this.gridApi.getSelectedRows();
    }

  ngOnInit() {
    this._employeeservice.listEmployees().subscribe(val =>{
      this.SEmployees = val;
    });
  }

  refresh(){
    this._employeeservice.listEmployees().subscribe(val =>{
      this.SEmployees = val;
    });
    this.gridApi.setRowData(this.SEmployees);
  }

  clear(){
    this.cemployee.fname = "";
    this.cemployee.NIC = "";
    this.cemployee.Address = "";
    this.cemployee.contact = "";
    this.cemployee.email = "";
    this.cemployee.ID = "";
  }

  AddEmployee(){
    this.cemployee.password = "user123";
    this.cemployee.ID = this.cemployee.username;
    this._employeeservice.AddnewEmployee(this.cemployee);
    this._loginservice.adduser(this.cemployee);
    this.cemployee.fname = "";
    this.cemployee.ID = "";
    this.cemployee.NIC = "";
    this.cemployee.Address = "";
    this.cemployee.contact = "";
    this.cemployee.email = "";
    $('#refresher').click();
    $('#button79').click();
  }

}
