import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leaveapplication',
  templateUrl: './leaveapplication.component.html',
  styleUrls: ['./leaveapplication.component.css']
})
export class LeaveapplicationComponent implements OnInit {

  appdisplay="none";
  rowdisplay="block";
  infodisplay="none";

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  gotosend(){
    //this.router.navigate(['sendleave']);
    this.appdisplay="block";
    this.rowdisplay="none";
    console.log('is this ok');
  }

  gotoinfo(){
    this.infodisplay="block";
    this.rowdisplay="none";
    //this.router.navigate(['leaveinfo']);
  }

}
