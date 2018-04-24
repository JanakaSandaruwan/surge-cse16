import { TestBed, inject } from '@angular/core/testing';

import { LoadLeaveService } from './load-leave.service';

describe('LoadLeaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadLeaveService]
    });
  });

  it('should be created', inject([LoadLeaveService], (service: LoadLeaveService) => {
    expect(service).toBeTruthy();
  }));
});
