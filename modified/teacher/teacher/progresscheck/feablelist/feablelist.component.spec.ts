import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeablelistComponent } from './feablelist.component';

describe('FeablelistComponent', () => {
  let component: FeablelistComponent;
  let fixture: ComponentFixture<FeablelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeablelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeablelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
