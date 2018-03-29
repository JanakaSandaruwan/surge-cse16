import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admittance',
  templateUrl: './admittance.component.html',
  styleUrls: ['./admittance.component.css']
})
export class AdmittanceComponent implements OnInit {

	rowdisplay="block";
	adddisplay="none";
	viewdisplay="none";

  constructor() { }

  ngOnInit() {
  }

  gotoview(){
  	this.rowdisplay="none";
  	this.viewdisplay="block";

  }

  gotoadd(){
  	this.rowdisplay="none";
  	this.adddisplay="block";
  	
  }

}
