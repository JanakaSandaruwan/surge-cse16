import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welfare-home',
  templateUrl: './welfare-home.component.html',
  styleUrls: ['./welfare-home.component.css']
})
export class WelfareHomeComponent implements OnInit {

  constructor(private router:Router , private route: ActivatedRoute) { }
  usercode : string;
  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode = params['details'];
    });
  }

  gotoNN(){
    this.router.navigate(['welfare/create' , {details : this.usercode}]);
  }

  gotoVN(){
    this.router.navigate(['welfare/viewnotices', {details : this.usercode}]);
  }
}
