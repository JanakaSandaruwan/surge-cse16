import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  usercode : string;
  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode = params['details'];
    });
  }
  gotoVB(){
    this.router.navigate(['admin/viewbatches', {details : this.usercode}]);
  }

  gotoVS(){
    this.router.navigate(['admin/createstudent', {details : this.usercode}]);
  }

  gotoVT(){
    this.router.navigate(['admin/createTeacher', {details : this.usercode}]);
  }

  gotoVE(){
    this.router.navigate(['admin/createemployee', {details :this.usercode}]);
  }

  gotoVSub(){
    this.router.navigate(['admin/createsubject', {details : this.usercode}]);
  }
}
