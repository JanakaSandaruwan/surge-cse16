import { TestBed, inject } from '@angular/core/testing';

import { LoadteacherService } from './loadteacher.service';

describe('LoadteacherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadteacherService]
    });
  });

  it('should be created', inject([LoadteacherService], (service: LoadteacherService) => {
    expect(service).toBeTruthy();
  }));
});
