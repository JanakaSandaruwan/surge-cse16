import { Injectable } from '@angular/core';
declare var firebase: any;
import { Upload } from '../models/upload';

@Injectable()
export class UploadService {

  constructor() { }
  //private af: AngularFire, private db: AngularFireDatabase
  private basePath:string = '/studymaterial';
  //uploads: FirebaseListObservable<Upload[]>;

  pushUpload(upload: Upload,subjectname) {
    console.log("File start uploaded");
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    console.log("File uploaded");


    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload,subjectname)
      }
    );
  }

  listFiles(subjectname): Upload[] {
    var finallist : Upload[];
    finallist = [];
    var nodata = 0;
    firebase.database().ref('classes/'+subjectname+'/studymaterial').on('child_added', function(data) {
        finallist[nodata]=data.val();
        nodata = nodata + 1;
      });
      return finallist;
  }



  // Writes the file details to the realtime db
  private saveFileData(upload: Upload,subjectname) {
    //this.db.list(`${this.basePath}/`).push(upload);
    firebase.database().ref('classes/'+subjectname+'/studymaterial').push({
      name:upload.name,
      url:upload.url,
      createdAt:upload.createdAt
    });

  }

  delete(subjectname,filename){


  }

}
