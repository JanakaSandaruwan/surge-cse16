import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-exam-home',
  templateUrl: './exam-home.component.html',
  styleUrls: ['./exam-home.component.css']
})
export class ExamHomeComponent implements OnInit {
  events : any;
  viewDate : any;
  usercode : string;
  username: string;
  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode = params['details'];
       console.log(this.usercode);
    });
  }

  changedata(){
    this.router.navigate(['examdiv/updatedetails', {details : this.usercode}]);
  }

  gotonotices(){
    this.router.navigate(['examdiv/writenotice', {details : this.usercode}]);
  }

  gotoexamresults(){
    this.router.navigate(['examdiv/create-tt', {details : this.usercode}]);
  }

  gotohome(){
    this.router.navigate(['examdiv/home', {details : this.usercode}]);
  }



  redirectLeave(){
    console.log(this.username);
    this.router.navigate(['examdiv/leaveapplication',{details: btoa(this.username)}]);
  }

}
