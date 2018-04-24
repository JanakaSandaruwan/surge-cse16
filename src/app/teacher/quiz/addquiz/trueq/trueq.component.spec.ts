import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueqComponent } from './trueq.component';

describe('TrueqComponent', () => {
  let component: TrueqComponent;
  let fixture: ComponentFixture<TrueqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrueqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrueqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
