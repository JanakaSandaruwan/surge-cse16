import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendleaveComponent } from './sendleave.component';

describe('SendleaveComponent', () => {
  let component: SendleaveComponent;
  let fixture: ComponentFixture<SendleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
