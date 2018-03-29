import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaddmitanceComponent } from './addaddmitance.component';

describe('AddaddmitanceComponent', () => {
  let component: AddaddmitanceComponent;
  let fixture: ComponentFixture<AddaddmitanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddaddmitanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddaddmitanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
