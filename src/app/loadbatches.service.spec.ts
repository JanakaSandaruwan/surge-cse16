import { TestBed, inject } from '@angular/core/testing';

import { LoadbatchesService } from './loadbatches.service';

describe('LoadbatchesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadbatchesService]
    });
  });

  it('should be created', inject([LoadbatchesService], (service: LoadbatchesService) => {
    expect(service).toBeTruthy();
  }));
});
