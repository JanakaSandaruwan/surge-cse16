import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentprogresscheckComponent } from './studentprogresscheck.component';

describe('StudentprogresscheckComponent', () => {
  let component: StudentprogresscheckComponent;
  let fixture: ComponentFixture<StudentprogresscheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentprogresscheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentprogresscheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
