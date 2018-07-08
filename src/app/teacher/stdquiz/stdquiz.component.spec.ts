import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdquizComponent } from './stdquiz.component';

describe('StdquizComponent', () => {
  let component: StdquizComponent;
  let fixture: ComponentFixture<StdquizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdquizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
