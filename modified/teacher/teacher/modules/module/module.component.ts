import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  weeks=[{
    name:"week1"
  },{
    name:"week2"
  },{
    name:"week3"
  },{
    name:"week4"
  },{
    name:"week5"
  },];
  constructor() { }

  ngOnInit() {
  }

}
