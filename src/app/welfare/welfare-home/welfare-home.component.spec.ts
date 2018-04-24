import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelfareHomeComponent } from './welfare-home.component';

describe('WelfareHomeComponent', () => {
  let component: WelfareHomeComponent;
  let fixture: ComponentFixture<WelfareHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelfareHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelfareHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
