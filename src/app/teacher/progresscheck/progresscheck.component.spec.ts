import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresscheckComponent } from './progresscheck.component';

describe('ProgresscheckComponent', () => {
  let component: ProgresscheckComponent;
  let fixture: ComponentFixture<ProgresscheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgresscheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresscheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
