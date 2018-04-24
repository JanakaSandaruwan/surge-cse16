import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesviewComponent } from './noticesview.component';

describe('NoticesviewComponent', () => {
  let component: NoticesviewComponent;
  let fixture: ComponentFixture<NoticesviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticesviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticesviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
