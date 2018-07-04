import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritenoticeComponent } from './writenotice.component';

describe('WritenoticeComponent', () => {
  let component: WritenoticeComponent;
  let fixture: ComponentFixture<WritenoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritenoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritenoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
