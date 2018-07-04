import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {LoadteacherService} from '../../services/loadteacher.service';
import { Teacher } from '../../models/teacher';
import { Subject } from '../../models/subject';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css'],
  providers:[LoadteacherService]
})
export class ModulesComponent implements OnInit {

  usercode:string;
  fname:string;
  STeachers: any;
  nums:any;


 modules=[];

  constructor(private router:Router, private route: ActivatedRoute,private loadteacher:LoadteacherService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
       this.usercode = atob(params['details']);
       console.log((this.usercode));
    });


    //console.log(this.loadteacher.fname(this.usercode));
    this.refresh();

  }

  refresh(){
    var tempmodules = [];
    var fname = this.loadteacher.fname(this.usercode);
    console.log(this.usercode);
    this.loadteacher.listTSubjects(this.usercode).subscribe(data => {
      this.nums= data;
      console.log(this.nums);
    })
    /*var i=0;
    while(i<this.nums.length){
      //console.log(this.nums[i]);
        //console.log(this.nums[i]);
        var module={
            name:this.nums[i].code+this.nums[i].batch
        }
        console.log(module);
        tempmodules.push(module);
        i++;
      }*/
//[routerLink]="['./module',module.name]"


    this.modules = tempmodules;
    console.log(this.modules);
  }

redirect(subject){
  this.router.navigate(['teacher/modules/module',{subjectname: btoa(subject),details:btoa(this.usercode)}]);
}

}
