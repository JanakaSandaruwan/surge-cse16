import { Component, OnInit, Input, ElementRef , EventEmitter, Output } from '@angular/core';
import { Question } from '../../../../models/question';
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
  selected : string ;
  type:string;
  final : Question = <Question>{};;
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
    this._ref.destroy();
  }

  ngOnInit() {
  }

}
