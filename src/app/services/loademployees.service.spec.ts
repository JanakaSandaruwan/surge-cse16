import { TestBed, inject } from '@angular/core/testing';

import { LoademployeesService } from './loademployees.service';

describe('LoademployeesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoademployeesService]
    });
  });

  it('should be created', inject([LoademployeesService], (service: LoademployeesService) => {
    expect(service).toBeTruthy();
  }));
});
