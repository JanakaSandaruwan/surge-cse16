import { TestBed, inject } from '@angular/core/testing';

import { UploadserviceService } from './uploadservice.service';

describe('UploadserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadserviceService]
    });
  });

  it('should be created', inject([UploadserviceService], (service: UploadserviceService) => {
    expect(service).toBeTruthy();
  }));
});
