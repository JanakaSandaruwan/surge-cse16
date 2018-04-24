import { Component, OnInit } from '@angular/core';
import { Batch } from '../../models/batch';
declare var firebase : any;
import { LoadbatchesService } from '../../services/loadbatches.service';
@Component({
  selector: 'app-viewbatches',
  templateUrl: './viewbatches.component.html',
  styleUrls: ['./viewbatches.component.css']
})
export class ViewbatchesComponent implements OnInit {
  batches: any;
  cb : Batch = <Batch>{};
  show : boolean;
  constructor(private _batchservice: LoadbatchesService) {

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
    }


}
