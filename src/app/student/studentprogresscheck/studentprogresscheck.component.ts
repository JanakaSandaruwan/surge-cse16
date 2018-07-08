import { Component, OnInit } from '@angular/core';
import {LoadgradesService} from  "../../services/loadgrades.service" ;
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-studentprogresscheck',
  templateUrl: './studentprogresscheck.component.html',
  styleUrls: ['./studentprogresscheck.component.css']
})
export class StudentprogresscheckComponent implements OnInit {
  subjectname:string;
  username: string;
  finalgrade : string;
  attendance : string;
  quizarr : any[] = [];
  quizfinal : any[] = [];
  constructor(private gradeservice :LoadgradesService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       //this.usercode = params['details'];
       this.subjectname=atob(params['subjectname']);
       this.username=atob(params['details']);
       //console.log((this.usercode));
       console.log((this.subjectname));
    });
  }

  refresh(){
    var x : string;
    var y : string;
    var z : any[] = [];
    this.gradeservice.listgradesdataof(this.subjectname,this.username).on('value',function(data){
      x = data.val().grademark;
      y = data.val().attendance;
    });
    var i = 0;
    this.gradeservice.listquizdataof(this.subjectname,this.username).on('child_added',function(data){
      z[i] = data.val()
      i++
    });
    var j = 0;
    this.finalgrade = x;
    this.attendance = y;
    this.quizfinal = z;
    console.log(z);

  //  console.log("kkkkk"+this.marks);

  }

}
