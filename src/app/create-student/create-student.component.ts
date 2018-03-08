import { Component, OnInit } from '@angular/core';
import { Batch } from './batch';
import { LoadbatchesService } from '../loadbatches.service';
import { Student } from './student';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  name : string;
  phone : string;
  cstudent : Student = <Student>{};
  SStudents: any;
  selected: string;
  sbatch : Batch;
  constructor(private _batchservice: LoadbatchesService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this._batchservice.listBatches()
        .subscribe(students => {
          console.log(students);
          this.batches = students;
        });

  }

  AddStudent(){
    this.cstudent.batchcode = this.sbatch.name;
    this.cstudent.bindex = this.selected;
    this.cstudent.Level = "Entry";
    if (this.SStudents.length < 10){
      this.cstudent.ID = this.cstudent.batchcode+"000"+this.SStudents.length;
    }else if (this.SStudents.length < 100){
      this.cstudent.ID = this.cstudent.batchcode+"00"+this.SStudents.length;
    }else if (this.SStudents.length < 1000){
      this.cstudent.ID = this.cstudent.batchcode+"0"+this.SStudents.length;
    }else{
      this.cstudent.ID = this.cstudent.batchcode+this.SStudents.length;
    }
    this.cstudent.username = this.cstudent.ID;
    this.cstudent.password = "student123";
    console.log(this.cstudent);
  }

  changebatch(batchno,batch){
    batch.active = !batch.active;
    this.selected = batchno;
    this.sbatch = batch;
    console.log(this._batchservice.listStudents(this.selected);
    this._batchservice.listStudents(this.selected).subscribe(students => {
      this.SStudents= students;
    });
  }

}
