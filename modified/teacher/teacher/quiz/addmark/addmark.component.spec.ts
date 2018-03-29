import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmarkComponent } from './addmark.component';

describe('AddmarkComponent', () => {
  let component: AddmarkComponent;
  let fixture: ComponentFixture<AddmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
