import { Component, OnInit } from '@angular/core';
import { Batch } from './batch';
declare var firebase : any;
import { LoadbatchesService } from '../loadbatches.service';
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
    this.cb.passed = 0;
    this.cb.rem = 0;
    console.log(this.cb);
    let index = this.batches.length;
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
