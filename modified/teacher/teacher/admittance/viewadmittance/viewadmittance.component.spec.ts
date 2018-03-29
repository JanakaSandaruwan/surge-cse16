import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewadmittanceComponent } from './viewadmittance.component';

describe('ViewadmittanceComponent', () => {
  let component: ViewadmittanceComponent;
  let fixture: ComponentFixture<ViewadmittanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewadmittanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewadmittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
