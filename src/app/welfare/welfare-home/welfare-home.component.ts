import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welfare-home',
  templateUrl: './welfare-home.component.html',
  styleUrls: ['./welfare-home.component.css']
})
export class WelfareHomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  gotoNN(){
    this.router.navigate(['welfare/create']);
  }
}
