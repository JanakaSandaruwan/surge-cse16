import { TestBed, inject } from '@angular/core/testing';

import { StudentservicesService } from './studentservices.service';

describe('StudentservicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentservicesService]
    });
  });

  it('should be created', inject([StudentservicesService], (service: StudentservicesService) => {
    expect(service).toBeTruthy();
  }));
});
