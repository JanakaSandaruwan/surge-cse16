import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit {

  usercode : string;

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode =atob(params['details']);
       console.log((this.usercode));
    });
  }

  gotoLeave(){
    this.router.navigate(['./teacher/leaveapplication', {details : btoa(this.usercode)}]);
    console.log("navigate to leaveapplication");
  }

  gotoModule(){
    this.router.navigate(['./teacher/modules', {details : btoa(this.usercode)}]);
    console.log("navigate to modules");
  }



}
