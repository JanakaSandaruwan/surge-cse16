import { TestBed, inject } from '@angular/core/testing';

import { LoadquizService } from './loadquiz.service';

describe('LoadquizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadquizService]
    });
  });

  it('should be created', inject([LoadquizService], (service: LoadquizService) => {
    expect(service).toBeTruthy();
  }));
});
