import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbatchesComponent } from './viewbatches.component';

describe('ViewbatchesComponent', () => {
  let component: ViewbatchesComponent;
  let fixture: ComponentFixture<ViewbatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
