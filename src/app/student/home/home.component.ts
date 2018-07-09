import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usercode:string;

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode =atob(params['details']);
       console.log((this.usercode));
    });
  }


  changedata(){
    this.router.navigate(['student/updatedetails', {details : btoa(this.usercode)}]);
  }


  gotocourse(){
    this.router.navigate(['student/mycourses',{details: btoa(this.usercode)}]);

  }
  gotoenrolment(){
    this.router.navigate(['student/enrolment',{details: btoa(this.usercode)}]);

  }
  gotoprogress(){
    this.router.navigate(['student/viewprogress',{details: btoa(this.usercode)}]);

  }
  gotocomplain(){
    this.router.navigate(['student/complain',{details: btoa(this.usercode)}]);

  }
  gotoleave(){
    this.router.navigate(['student/leave',{details: btoa(this.usercode)}]);

  }
  gotoscholar(){
    this.router.navigate(['student/scholarship',{details: btoa(this.usercode)}]);

  }

  gotoVN(){
    this.router.navigate(['student/notices',{details: btoa(this.usercode)}]);

  }

}
