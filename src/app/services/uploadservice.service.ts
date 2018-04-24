import { Injectable } from '@angular/core';
import { Upload } from '../models/upload';
declare var firebase : any;
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UploadserviceService {

  constructor(private _http: HttpClient) { }

  uploadNoticefiles(key , files){
    const storageref = firebase.storage().ref('/notices/'+key);
    var i : number = 0;
    for (i= 0 ; i<files.length ;i++){
      const uploadtask = storageref.child(files[i].file.name).put(files[i].file);
      uploadtask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          console.log("running");
        },
        (error) => {
          // fail
          console.log(error)
        },
        () => {
          // success
          console.log(uploadtask.snapshot.metadata.name);
          //upload.name = upload.file.name;
          this.saveNoticeData(uploadtask.snapshot.downloadURL , key ,uploadtask.snapshot.metadata.name);
        })
    }

  }

  getUrl(uname) : Observable<string>{
    return this._http.get<string>('https://surge-44d21.firebaseio.com/profilepics/'+uname+'/url.json')
        .catch(this.handleError);
  }

  uploadprofilepic(uname, upload){
    const storageref = firebase.storage().ref();
    const uploadtask = storageref.child('/profilepics/'+uname).put(upload.file);
    uploadtask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        console.log("running");
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        upload.url = uploadtask.snapshot.downloadURL;
        console.log(upload.url);
        //upload.name = upload.file.name;
        this.saveFileData(upload , uname);
      }
    );
  }

  private saveFileData(upload: Upload, uname) {
   firebase.database().ref('profilepics/'+uname).set({
     url : upload.url
   });
  }

  private saveNoticeData ( upload : Upload, key , name ){
    firebase.database().ref('notices/'+key+'/files').push({
      url : upload,
      filename : name
    });
  }

  handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
  }

}
