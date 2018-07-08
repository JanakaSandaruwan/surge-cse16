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
  set : boolean = false;
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
  selectedRows : any = [];
  NICtaken : Observable<boolean>;
  Usernametaken : Observable<boolean>;
  showid : boolean = true;
  shownic : boolean = true;
  showadd : boolean = true;
  showcon : boolean = true;
  showname : boolean = true;
  showmail : boolean = true;
  Error : string = "";
  Success : string = "";

  toggleid(){
    this.showid = !this.showid;
    this.gridColumnApi.setColumnVisible("ID",this.showid);
  }

  setted(){
    this.set = true;
  }

  fit(){
      this.gridApi.sizeColumnsToFit();
  }

  onBtnExport(): void {
    if ( this.gridApi.getSelectedRows().length != 0){
      const params = {
        columnGroups: true,
        allColumns: true,
        fileName: 'filename_of_your_choice',
        onlySelected : true
      }
      this.gridApi.exportDataAsCsv(params);
    }else{
      const params = {
        columnGroups: true,
        allColumns: true,
        fileName: 'filename_of_your_choice'
      }
      this.gridApi.exportDataAsCsv(params);
    }
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

  constructor(private _employeeservice: LoademployeesService,
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
    onRDC($event){
      this.DCCRows = this.gridApi.getSelectedRows()[0];
      $('#save').click();
    }
    checkValidity(){
      this.setted();
      this.NICtaken = this._loginservice.checkNICs(this.cemployee.NIC);
    }

    checkUsername(){
      this.setted();
      this.Usernametaken = this._loginservice.checkUsernames(this.cemployee.username);
    }

    Deletebutton(){
      if(this.selectedRows.length == 0 ){
        this.Error = "No rows selected to Delete";
        $("#errorbutton").click();
      }else{
        var i : number = 0;
        for (i=0;i<this.selectedRows.length;i++){
          this._loginservice.removeUser(this.selectedRows[i].username);
          this._employeeservice.saveEmployeelist(this.selectedRows[i].username);
        }
        this.SEmployees = this._employeeservice.listEmployees();
        this.gridApi.setRowData(this.SEmployees);
        this.Success = "Successfuly deleted";
        $('#successbutton').click();
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
    this.cemployee.role = "";
    this.cemployee.username = "";
    this.set = false;
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
    this.Success = "Successfuly Added";
    $('#successbutton').click();
  }

}
