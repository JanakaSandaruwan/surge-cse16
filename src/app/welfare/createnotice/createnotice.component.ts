import { Component, OnInit } from '@angular/core';
import { NoticeserviceService } from '../../services/noticeservice.service';
@Component({
  selector: 'app-createnotice',
  templateUrl: './createnotice.component.html',
  styleUrls: ['./createnotice.component.css']
})
export class CreatenoticeComponent implements OnInit {
  noticesubject : string;
  noticedes : string;
  files : any = [];
  model = { year:undefined ,month:undefined, day:undefined};

  constructor(private _post : NoticeserviceService) { }

  ngOnInit() {
  }

  onRemoved(event){
    console.log(event);
  }
  onUploadFinished(event){
    this.files.push(event);
    console.log(this.files);
    console.log(this.files[0].src);
  }
  yay(file){
    console.log(file);
  }

  activate(){
    $("#x").click();
  }

  Postnotice(){
    this._post.postnotice(this.noticesubject,this.noticedes,this.model, this.files);
  }

  /*detectfiles(event){
    console.log(event);
    this.files = [].slice.call(event.target.files);
    console.log(this.files);
    /*console.log(this.files[0]);
    var reader = new FileReader();
    reader.onload = (event : any) => {
      console.log(event.target.result);
    }
    input.value = this.files.map( f => f.name).join(', ');




  }*/
}
