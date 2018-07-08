import { Component, OnInit, Input, ElementRef , EventEmitter, Output } from '@angular/core';
import { Question } from '../../../models/question';
@Component({
  selector: 'app-mcqs',
  templateUrl: './mcqs.component.html',
  styleUrls: ['./mcqs.component.css']
})
export class McqsComponent implements OnInit {

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
  selected : string ;
  wrong : boolean ;
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
    console.log(this.completed);
    if(this.selected != this.corans){
      this.wrong = true;
    }



  }
}
