import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsviewComponent } from './ansview.component';

describe('AnsviewComponent', () => {
  let component: AnsviewComponent;
  let fixture: ComponentFixture<AnsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
