import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {UploadService} from '../../../services/upload.service';
import { Upload } from '../../../models/upload';
import { Quiz } from '../../../models/quiz';
import {LoadquizService} from '../../../services/loadquiz.service';
declare var firebase: any;

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
  providers:[UploadService,LoadquizService]
})
export class ModuleComponent implements OnInit {
  usercode:string;
  subjectname:string;
  files:Upload[];
/*  quizes=[{name:"quiz1",questions : [{Text: "Bob has x candybars. He gives you and Paul y candybars each. You give a x-y of your candy bars to Paul at the end you have z,2z and 3z bars respectively whats the value of y?"
  , Option1: "65", Option2: "13", Option3: "43", Option4: "none of the above", type:"mcq"},
{Text: "The moon is also called luna and is place where the gravitational field is 1/6th than that of earth. If you were to throw a ball of the same mass on the moon and the earth at the same velocity what will be the ration of the two times taken to hit the ground", Option1: "1", Option2: "2", Option3: "3sada", Option4: "4", type:"mcq"},
{Text: "Is there cheese on the moon?", type:"tf"}, {Text: "What is the answer to life and the universe?", type:"sans"}]},{name:"quiz2",questions : [{Text: "Bob has x candybars. He gives you and Paul y candybars each. You give a x-y of your candy bars to Paul at the end you have z,2z and 3z bars respectively whats the value of y?"
, Option1: "65", Option2: "13", Option3: "43", Option4: "none of the above", type:"mcq"},
{Text: "The moon is also called luna and is place where the gravitational field is 1/6th than that of earth. If you were to throw a ball of the same mass on the moon and the earth at the same velocity what will be the ration of the two times taken to hit the ground", Option1: "1", Option2: "2", Option3: "3sada", Option4: "4", type:"mcq"},
{Text: "Is there cheese on the moon?", type:"tf"}, {Text: "What is the answer to life and the universe?", type:"sans"}]}];*/

  quizes:any[];

  constructor(private router:Router, private route: ActivatedRoute, private upSvc:UploadService,private quizsvc:LoadquizService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usercode = params['details'];
       this.subjectname=atob(params['subjectname']);
       //console.log((this.usercode));
       console.log((this.subjectname));
    });

    this.refresh();

 }

  gotoProgress(){
    this.router.navigate(['../../teacher/progresscheck',{subjectname: btoa(this.subjectname)}]);
    console.log("navigate to progresscheck");
  }

  gotoAdmittance(){
    this.router.navigate(['../../teacher/admittance',{subjectname: btoa(this.subjectname)}]);
    console.log("navigate to Admittance");
  }

  gotoQuiz(){
    this.router.navigate(['../../teacher/quiz/displaymark',{subjectname: btoa(this.subjectname)}]);
    console.log("navigate to Admittance");
  }

  gotoaddquiz(){
    this.router.navigate(['../../teacher/quiz',{subjectname: btoa(this.subjectname)}]);
    console.log("navigate to add quiz");
  }

  gotomaterial(){
    this.router.navigate(['../../teacher/studymaterial',{subjectname: btoa(this.subjectname)}]);
    console.log("navigate to material");
  }

  gotodisplayquiz(quizname){
    this.router.navigate(['../../teacher/quiz/preview',{quizname: (quizname),subjectname:btoa(this.subjectname)}]);
    console.log("navigate to preview");
    console.log(this.subjectname);
    console.log(quizname);
  }

  refresh(){
    this.files=this.upSvc.listFiles(this.subjectname);
    console.log(this.files);

    this.quizes=this.quizsvc.quizeslist(this.subjectname);
    console.log(this.quizes);

  }

  delete(filename){
    console.log(filename);
    var storageRef=firebase.storage().ref().child('studymaterial/'+filename).delete().then(function() {
      // File deleted successfully
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });;

    var query =   firebase.database().ref('classes/'+this.subjectname+'/studymaterial').orderByChild('name').equalTo(filename);
    console.log(query);
    query.on('value', function(messagesSnapshot) {
    messagesSnapshot.forEach(function(messageSnapshot) {
        messageSnapshot.ref().remove();
    });
  })
  }


}
