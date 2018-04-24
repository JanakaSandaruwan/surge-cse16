import { TestBed, inject } from '@angular/core/testing';

import { LeaveapproveService } from './leaveapprove.service';

describe('LeaveapproveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveapproveService]
    });
  });

  it('should be created', inject([LeaveapproveService], (service: LeaveapproveService) => {
    expect(service).toBeTruthy();
  }));
});
