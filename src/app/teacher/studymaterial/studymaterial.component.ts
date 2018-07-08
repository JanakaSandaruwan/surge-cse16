import { Component, OnInit } from '@angular/core';
import {UploadService} from '../../services/upload.service';
import { Upload } from '../../models/upload';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-studymaterial',
  templateUrl: './studymaterial.component.html',
  styleUrls: ['./studymaterial.component.css'],
  providers:[UploadService]
})
export class StudymaterialComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;
  subjectname:string;
  username:string;
  setFile:boolean;
  setsize:boolean;



  constructor(private upSvc:UploadService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.subjectname = atob(params['subjectname']);
       this.username=atob(params['details']);
       console.log((this.subjectname));
    });
    this.setFile=false;
    this.setsize=false;

  }

  detectFiles(event) {

      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    console.log(this.selectedFiles);
      let file = this.selectedFiles.item(0);
      this.setFile=true;
      if(file.size==0){
        this.setsize=true;
      }
      this.currentUpload = new Upload(file);
      //console.log(this.currentUpload.progress);
      this.upSvc.pushUpload(this.currentUpload,this.subjectname);
      //console.log("File uploaded kk");
      //this.router.navigate(['../../teacher/modules/module',{subjectname: btoa(this.subjectname)}]);
    }

    redirect(){

      this.router.navigate(['../../teacher/modules/module',{subjectname: btoa(this.subjectname),details:btoa(this.username)}]);
      console.log("redirect");
    }




}
