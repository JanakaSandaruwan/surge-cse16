import { Component, OnInit } from '@angular/core';
import { Batch } from '../../models/batch';
import { Observable } from 'rxjs/Observable';
declare var firebase : any;
import { LoadbatchesService } from '../../services/loadbatches.service';
@Component({
  selector: 'app-viewbatches',
  templateUrl: './viewbatches.component.html',
  styleUrls: ['./viewbatches.component.css']
})
export class ViewbatchesComponent implements OnInit {
  batches: any;
  set : boolean = false;
  cb : Batch = <Batch>{};
  show : boolean;
  invalidyears : Observable<boolean> = Observable.of(false);
  Success : string;
  batchtaken : Observable<boolean> = Observable.of(false);

  constructor(private _batchservice: LoadbatchesService) {

  }

  checkyears(){
    this.setted();
    if(+this.cb.grad <= +this.cb.com){
      this.invalidyears = Observable.of(true);
    }else{
      this.invalidyears = Observable.of(false);
    }
  }

  clear(){
    this.cb.grad= null;
    this.cb.com = null;
    this.cb.name ="";
    this.set = false;
  }

  setted(){
    this.set = true;
  }

  ngOnInit() {
    this._batchservice.listBatches()
        .subscribe(students => {
          console.log(students);
          this.batches = students;
        });

  }

  submitStudent() {
    this.cb.total = 0;
    console.log(this.cb);
    if(this.batches == null){
      this.cb.nextid = 0;
      this._batchservice.createBatch(this.cb, 0)
                .subscribe(createdbatch => {
                  console.log(createdbatch);
                  this._batchservice.listBatches()
                          .subscribe(students => {
                          console.log(students);
                          this.batches = students;
                      });
                });
    }else{
    let index = this.batches.length;
    this.cb.nextid = 0;
    this._batchservice.createBatch(this.cb, index)
              .subscribe(createdbatch => {
                console.log(createdbatch);
                this._batchservice.listBatches()
                        .subscribe(students => {
                        console.log(students);
                        this.batches = students;
                    });
              });
        }
        this.set = false;
        this.Success = "Successfuly added";
        $('#successbutton').click();
    }
    checkbname(){
      this.setted();
      this.batchtaken = this._batchservice.checkbatchname(this.cb.name);
    }


}
