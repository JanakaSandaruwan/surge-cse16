import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsubjectsComponent } from './viewsubjects.component';

describe('ViewsubjectsComponent', () => {
  let component: ViewsubjectsComponent;
  let fixture: ComponentFixture<ViewsubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
