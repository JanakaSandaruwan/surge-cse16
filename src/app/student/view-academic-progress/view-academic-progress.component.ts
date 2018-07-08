import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
import { Observable } from 'rxjs/Observable';
import { LoginServiceService } from '../../services/login-service.service';
import {Router} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { LoadgradesService } from '../../services/loadgrades.service';
import { Grade } from '../../models/grade';
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
  results : Grade[] = [];
  years : string[] = ["Year 1", "Year 2", "Year 3", "Year 4"];
  constructor(private storage:LocalStorageService, private router:Router, private lservice : LoginServiceService, private lgservice : LoadgradesService) {
    this.columnDefs = [
          {headerName: "Subject", field:"Subjectname.module" , width: 350},
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
  getresults(year){
    this.lgservice.listgradesof(this.storage.retrieve("uname"),year).subscribe(data =>{
      this.results = data;
      console.log(this.results);
      $("#openmodal").click();
    });
  }
}
