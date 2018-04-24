import { TestBed, inject } from '@angular/core/testing';

import { LoadgradesService } from './loadgrades.service';

describe('LoadgradesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadgradesService]
    });
  });

  it('should be created', inject([LoadgradesService], (service: LoadgradesService) => {
    expect(service).toBeTruthy();
  }));
});
