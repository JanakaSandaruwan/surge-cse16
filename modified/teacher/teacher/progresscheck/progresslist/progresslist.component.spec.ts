import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresslistComponent } from './progresslist.component';

describe('ProgresslistComponent', () => {
  let component: ProgresslistComponent;
  let fixture: ComponentFixture<ProgresslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgresslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
