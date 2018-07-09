import { Component, OnInit } from '@angular/core';
import { NoticeserviceService } from '../../services/noticeservice.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-createnotice',
  templateUrl: './createnotice.component.html',
  styleUrls: ['./createnotice.component.css']
})
export class CreatenoticeComponent implements OnInit {
  noticesubject : string;
  noticedes : string;
  files : any = [];
  descheck : Observable<boolean> = Observable.of(false);
  subcheck : Observable<boolean> = Observable.of(false);
  modelcheck : Observable<boolean> = Observable.of(false);
  modelearly : Observable<boolean> = Observable.of(false);
  model : any;

  constructor(private _post : NoticeserviceService) { }

  ngOnInit() {
  }

  onRemoved(event){
    var i = 0;
    var index = -1;
    for ( i =0 ; i< this.files.length ; i++){
      if (event.src == this.files[i].src){
        index = i;
        break;
      }
    }
    if (index !== -1) {
        this.files.splice(index, 1);
    }
  }
  onUploadFinished(event){
    this.files.push(event);
  }
  yay(file){
    console.log(file);
  }

  activate(){
    $("#x").click();
  }

  Postnotice(){
    this._post.postnotice(this.noticesubject,this.noticedes,this.model, this.files);
    $('#successrbutton').click();
  }

  reset(){
    this.noticedes = undefined;
    this.noticesubject = undefined;
    this.model = undefined;
    this.descheck = Observable.of(false);
    this.subcheck  = Observable.of(false);
    this.modelcheck  = Observable.of(false);
    this.modelearly = Observable.of(false);
    $('.image-ul-clear').click();
  }
  doublecheckdate(){
    var today = new Date();
    if ( this.model == undefined ){
      this.modelcheck = Observable.of(true);
    }else{
      this.modelcheck = Observable.of(false);
      var pickedDate = new Date(Date.parse(this.model.replace(/-/g, " ")));
      if( pickedDate <= today){
        this.modelearly = Observable.of(true);
      }else{
        this.modelearly = Observable.of(false);
      }
    }


  }
  doublechecknotice(){
    if ( this.noticedes == undefined || this.noticedes == null){
      this.descheck = Observable.of(true);
    }else{
      this.descheck = Observable.of(false);
    }
  }
  doublechecksub(){
    if ( this.noticesubject == undefined ){
      this.subcheck = Observable.of(true);
    }else{
      this.subcheck = Observable.of(false);
    }
  }
  justletters(){
    var today = new Date();
    var x = false;
    if ( this.model == undefined ){
      this.modelcheck = Observable.of(true);
      x = true;
    }else{
      this.modelcheck = Observable.of(false);
      var pickedDate = new Date(Date.parse(this.model.replace(/-/g, " ")));
      if( pickedDate <= today){
        x = true;
        this.modelearly = Observable.of(true);
      }else{
        this.modelearly = Observable.of(false);
      }
    }
    if ( this.noticedes == undefined || this.noticedes == "" ){
      x= true;
      this.descheck = Observable.of(true);
    }else{
      this.descheck = Observable.of(false);
    }
    if ( this.noticesubject == undefined || this.noticesubject == ""){
      x = true;
      this.subcheck = Observable.of(true);
    }else{
      this.subcheck = Observable.of(false);
    }
    if ( !x ){
      $('#button79').click();
    }
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
