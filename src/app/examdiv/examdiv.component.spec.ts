import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamdivComponent } from './examdiv.component';

describe('ExamdivComponent', () => {
  let component: ExamdivComponent;
  let fixture: ComponentFixture<ExamdivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamdivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamdivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
