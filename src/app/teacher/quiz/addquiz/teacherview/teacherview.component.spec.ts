import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherviewComponent } from './teacherview.component';

describe('TeacherviewComponent', () => {
  let component: TeacherviewComponent;
  let fixture: ComponentFixture<TeacherviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
