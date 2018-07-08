import { Component, OnInit } from '@angular/core';
import { Batch } from '../../models/batch';
import { LoadbatchesService } from '../../services/loadbatches.service';
import { Student } from '../../models/student';
import { LoginServiceService } from '../../services/login-service.service';
import { GridOptions } from "ag-grid";
import { Observable } from 'rxjs/Observable';
import { LoadgradesService } from '../../services/loadgrades.service';
import { Grade } from '../../models/grade';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  Success : string;
  set : boolean = false;
  dtOptions: DataTables.Settings = {};
  name : string;
  phone : string;
  nextid : number;
  cstudent : Student = <Student>{};
  SStudents: any;
  selected: string;
  sbatch : Batch;
  batches : Batch[];
  columnDefs : any[];
  rowData : any[];
  rowSelection : any;
  gridApi : any;
  gridColumnApi : any;
  selectedRows : Student[] = [];
  DCCRows : Student = <Student>{};
  NICtaken : Observable<boolean>;
  showid : boolean = true;
  shownic : boolean = true;
  showadd : boolean = true;
  showcon : boolean = true;
  showname : boolean = true;
  showmail : boolean = true;
  Error : string = "";
  gridApi2 : any;
  columnDefs2 : any[];
  gridColumnApi2 : any;
  results : Grade[];

  setted(){
    this.set = true;
  }
  toggleid(){
    this.showid = !this.showid;
    this.gridColumnApi.setColumnVisible("ID",this.showid);
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

  onBtnExport(): void {
    console.log(this.gridApi.getSelectedRows());
    if (this.selected == undefined){
        this.Error = "No batch selected";
        $("#errorbutton").click();
    }else if ( this.gridApi.getSelectedRows().length != 0){
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

  constructor(private _batchservice: LoadbatchesService, private _lgrades : LoadgradesService,
    private _loginservice : LoginServiceService , private lgservice : LoadgradesService) {
      this.columnDefs = [
            {headerName: "", field:"", checkboxSelection: true, headerCheckboxSelection: true},
            {headerName: "ID", field: "ID", width: 350},
            {headerName: "Name", field: "fname", width: 475},
            {headerName: "NIC", field: "NIC", width: 350},
            {headerName: "Address", field: "Address", width: 350},
            {headerName: "Email", field: "email", width: 350},
            {headerName: "Contact", field: "contact", width: 350},

        ];
        this.columnDefs2 = [
              {headerName: "Subject", field:"Subjectname.module"},
              {headerName: "Grade", field: "grade"},
              {headerName: "Attendance", field: "attendance"}


          ];
        this.rowSelection = "multiple";
    }

    fit(){
        this.gridApi.sizeColumnsToFit();
    }

    onGridReady2(params) {
      this.gridApi2 = params.api;
      this.gridColumnApi2 = params.columnApi;
      this.gridApi2.setRowData(this.results);

    }

    SendtoNextlevel(){

      if(this.selected == undefined){
        this.Error = "No batch selected";
        $("#errorbutton").click();
      }else if(this.selectedRows.length == 0 ){
        this.Error = "No rows selected to Delete";
        $("#errorbutton").click();
      }else{
        var i : number = 0;
        for (i=0;i<this.selectedRows.length;i++){
          this._batchservice.NextLevel(this.selectedRows[i].username,this.selected,this.SStudents.length);
        }
        this.SStudents = this._batchservice.listStudents(this.selected);
        this.gridApi.setRowData(this.SStudents);
      }

    }

    Deletebutton(){
      if(this.selected == undefined){
        this.Error = "No batch selected";
        $("#errorbutton").click();
      }else if(this.selectedRows.length == 0 ){
        this.Error = "No rows selected to Delete";
        $("#errorbutton").click();
      }else{
        var i : number = 0;
        for (i=0;i<this.selectedRows.length;i++){
          this._loginservice.removeUser(this.selectedRows[i].username);
          this._batchservice.saveBatchlist(this.selectedRows[i].username,this.selected,this.SStudents.length);
        }
        this.SStudents = this._batchservice.listStudents(this.selected);
        this.gridApi.setRowData(this.SStudents);
        this.Success = "Successfuly deleted";
        $('#successbutton').click();
      }

    }
    checkValidity(){
      this.setted();
      this.NICtaken = this._loginservice.checkNICs(this.cstudent.NIC);
    }

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    }

    onSelectionChanged($event){
      this.selectedRows = this.gridApi.getSelectedRows();
      console.log(this.selectedRows);
    }

    onRDC($event){
      this.DCCRows = this.gridApi.getSelectedRows()[0];
      this.lgservice.listgradesofall(this.DCCRows.ID).subscribe(data => {
        this.results = data;
        this.gridApi2.setRowData(this.results);
        console.log(this.results);
      });
      console.log(this.DCCRows);
      $('#save').click();
    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      info: false,
      language: {
        emptyTable: "Click on a Student to see more details",
        zeroRecords : ""
      }
    };
    this._batchservice.listBatches()
        .subscribe(students => {
          console.log(students);
          this.batches = students;
        });

  }

  clear(){
    this.set = false;
    this.cstudent.fname = "";
    this.cstudent.NIC = "";
    this.cstudent.Address = "";
    this.cstudent.contact = "";
    this.cstudent.email = "";
    $('#div4').prop('hidden','true');
  }

  AddStudent(){
    if ( this.selected == undefined ){
      this.Error = "Batch hasn't been selected";
      $("#errorbutton").click();
    }else{
      this.cstudent.batchcode = this.sbatch.name;
      this.cstudent.bindex = this.selected;
      this.cstudent.Level = "Year 1";
      this.cstudent.password = "student123";
      this.cstudent.role = "student";
        if (this.nextid < 10){
          this.cstudent.ID = this.cstudent.batchcode+"000"+this.nextid;
        }else if (this.nextid < 100){
          this.cstudent.ID = this.cstudent.batchcode+"00"+this.nextid;
        }else if (this.nextid < 1000){
          this.cstudent.ID = this.cstudent.batchcode+"0"+this.nextid;
        }else{
          this.cstudent.ID = this.cstudent.batchcode+this.nextid;
        }
        this.nextid = this.nextid + 1 ;
        this.cstudent.username = this.cstudent.ID;
        this._batchservice.Addnewstudent(this.cstudent, this.SStudents.length , this.nextid);
      this._loginservice.adduser(this.cstudent);
      this.cstudent.fname = "";
      this.cstudent.NIC = "";
      this.cstudent.Address = "";
      this.cstudent.contact = "";
      this.cstudent.email = "";
      $('#button79').click();
      this.SStudents = this._batchservice.listStudents(this.selected);
      this.gridApi.setRowData(this.SStudents);
    }
    this.Success = "Successfuly added";
    $('#successbutton').click();
  }



  changebatch(batchno,batch){
    batch.active = !batch.active;
    this.selected = batchno;
    this.sbatch = batch;
    this.nextid = batch.nextid;
    this.SStudents = this._batchservice.listStudents(this.selected);
    //this.gridApi.setRowData(this.SStudents);
      //this.rowData = this.SStudents;

  }

}
