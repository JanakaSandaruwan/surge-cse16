import { Component, OnInit, Input, ElementRef , EventEmitter, Output } from '@angular/core';
import { Question } from '../../../models/question';
@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css']
})
export class McqComponent implements OnInit {
  _ref:any;
  level: boolean;
  Question :string;
  Option1: string;
  Option2: string;
  Option3: string;
  Option4: string;
  type: string;
  corans : string;
  completed : boolean;
  selected : string = "0";
  wrong : boolean = false;
  final : Question = <Question>{};
  id : string = "";
  constructor(private elRef: ElementRef) { }

  @Output() messageEvent = new EventEmitter<Question>();
  @Output() answerEvent = new EventEmitter<string>();

  newValue(value){
    console.log(this.selected);
    this.answerEvent.emit(this.selected);
  }

  removeObject(){
    this.final.Text = this.Question;
    this.final.Option1 = this.Option1;
    this.final.Option2 = this.Option2;
    this.final.Option3 = this.Option3;
    this.final.Option4 = this.Option4;
    this.messageEvent.emit(this.final);
    console.log(this.messageEvent);
    this._ref.destroy();
  }

  ngOnInit() {
    if(this.completed == false){
      console.log("k2");
      this.wrong = false;
      //$('#mainbody').addClass("incomplete");
    }else{
      if(this.selected == this.corans){
        this.wrong = false;
        //$('#mainbody').addClass("correct");
      }else{
        this.wrong = true;
        //$('#mainbody').addClass("wrong");
      }
    }

  }

}
