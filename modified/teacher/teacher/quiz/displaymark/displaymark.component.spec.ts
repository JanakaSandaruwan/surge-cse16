import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaymarkComponent } from './displaymark.component';

describe('DisplaymarkComponent', () => {
  let component: DisplaymarkComponent;
  let fixture: ComponentFixture<DisplaymarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaymarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaymarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
