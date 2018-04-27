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



  constructor(private upSvc:UploadService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.subjectname = atob(params['subjectname']);
       console.log((this.subjectname));
    });


  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    console.log(this.selectedFiles);
      let file = this.selectedFiles.item(0);
      
      this.currentUpload = new Upload(file);
      this.upSvc.pushUpload(this.currentUpload,this.subjectname);
      console.log("File uploaded kk");
    }



}
