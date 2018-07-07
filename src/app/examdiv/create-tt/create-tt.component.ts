import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
import { Observable } from 'rxjs/Observable';
import { LoginServiceService } from '../../services/login-service.service';
import {Router} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { LoadgradesService } from '../../services/loadgrades.service';
import { Grade } from '../../models/grade';
@Component({
  selector: 'app-create-tt',
  templateUrl: './create-tt.component.html',
  styleUrls: ['./create-tt.component.css']
})
export class CreateTtComponent implements OnInit {

  gridApi : any;
  columnDefs : any[];
  rowSelection : any;
  gridColumnApi : any;
  indexnoexists : Observable<boolean> = Observable.of(true);
  modelearly : Observable<boolean> = Observable.of(false);
  modelcheck : Observable<boolean> = Observable.of(false);
  model = { year:undefined ,month:undefined, day:undefined};
  date : string;
  index:string;
  year:string;
  message:string;
  validyear:Observable<boolean> = Observable.of(false);
  calinvalid : Observable<boolean> = Observable.of(false);
  Indextaken :Observable<boolean>;

  results : Grade[] = [];
  constructor(private storage:LocalStorageService, private router:Router, private lservice : LoginServiceService, private lgservice : LoadgradesService) {
    this.columnDefs = [
          {headerName: "Subject", field:"Subjectname.module" , width: 350},
          {headerName: "Grade", field: "grade", width: 100},


      ];
      this.rowSelection = "multiple"; }

      onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.setRowData(this.results);

      }

      cancel(){
        this.router.navigate(['examdiv/home', {details : btoa(this.storage.retrieve("uname"))}],{ skipLocationChange: true });
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

      checkindex(){
        if(this.index.substring(0,2) != "bc"){
          this.indexnoexists = Observable.of(false);
        }else{
          console.log(this.lservice.checkUsernames(this.index));
          this.indexnoexists = this.lservice.checkUsernames(this.index);
        }
      }

      changes(){
        this.model.year = this.date.substring(0,4);
        this.model.month = this.date.substring(5,7);
        this.model.day = this.date.substring(8,10);
        const d: Date = new Date();
        if(d.getFullYear() > +this.model.year){
          console.log(d.getFullYear());
          this.calinvalid = Observable.of(true);
        }else if(d.getFullYear() == +this.model.year){
          if(d.getMonth() + 1 > +this.model.month){
            console.log("k1");
            this.calinvalid = Observable.of(true);
          }else if(d.getMonth() + 1 == +this.model.month){
            if(d.getDate() > +this.model.day){
              console.log("k2");
              this.calinvalid = Observable.of(true);
            }else{
              this.calinvalid = Observable.of(false);
            }
          }else{
            this.calinvalid = Observable.of(false);
          }
        }else{
          this.calinvalid = Observable.of(false);
        }
      }


  ngOnInit() {
  }

  getresults(){
    this.lgservice.listgradesof(this.index,"Year "+this.year).subscribe(data =>{
      this.results = data;
      console.log(this.results);
      $("#openmodal").click();
    });
  }
  validYear(){
    if ( this.year == "1" || this.year=="2" || this.year=="3"|| this.year=="4" || this.year==""){
      this.validyear=Observable.of(false);
    }else{
      this.message="wrong year!!!";
      this.validyear=Observable.of(true);
    }
  }

}
