import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hr-home',
  templateUrl: './hr-home.component.html',
  styleUrls: ['./hr-home.component.css']
})
export class HrHomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  gotoleave(){
    this.router.navigate(['hr/viewleave']);
  }


}
