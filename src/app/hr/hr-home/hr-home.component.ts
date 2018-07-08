import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hr-home',
  templateUrl: './hr-home.component.html',
  styleUrls: ['./hr-home.component.css']
})
export class HrHomeComponent implements OnInit {
  usercode : string;
  constructor(private router:Router , private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode = params['details'];
    });
  }
  gotoleave(){
    this.router.navigate(['hr/viewleave',{details : this.usercode}]);
  }



}
