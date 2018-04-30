import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachermcqComponent } from './teachermcq.component';

describe('TeachermcqComponent', () => {
  let component: TeachermcqComponent;
  let fixture: ComponentFixture<TeachermcqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachermcqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachermcqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
