import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmittanceComponent } from './admittance.component';

describe('AdmittanceComponent', () => {
  let component: AdmittanceComponent;
  let fixture: ComponentFixture<AdmittanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmittanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
