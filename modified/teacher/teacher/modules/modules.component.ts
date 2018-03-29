import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

 modules=[

   {
     name:"Module1"

   },

   {
     name:"Module2"
   },
   {
     name:"Module3"
   },
   {
     name:"Module4"
   },
   {
     name:"Module5"
   }
 ];

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  gotoaddmitance(){
  	this.router.navigate(['teacher/admittance']);
  }

}
