import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewemployeesComponent } from './viewemployees.component';

describe('ViewemployeesComponent', () => {
  let component: ViewemployeesComponent;
  let fixture: ComponentFixture<ViewemployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewemployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewemployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
