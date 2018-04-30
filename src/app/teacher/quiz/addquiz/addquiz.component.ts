import { Component, OnInit } from '@angular/core';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Quiz } from '../../../models/quiz';
import { Question } from '../../../models/question';
import {LoadquizService} from '../../../services/loadquiz.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.css'],
  providers:[LoadquizService]
})

export class AddquizComponent implements OnInit {

  quizname:string;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef, private loadquiz :LoadquizService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      // this.usercode = params['details'];
       this.quizname=atob(params['quizname']);
       //console.log((this.usercode));
       console.log((this.quizname));
    });

  }

  gotoView(){
    this.router.navigate(['../../teacher/quiz/teacherview',{quizname: btoa(this.quizname)}]);
    console.log("navigate to preview");
  }



}
