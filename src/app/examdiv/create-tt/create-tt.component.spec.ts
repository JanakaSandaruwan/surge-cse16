import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTtComponent } from './create-tt.component';

describe('CreateTtComponent', () => {
  let component: CreateTtComponent;
  let fixture: ComponentFixture<CreateTtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
