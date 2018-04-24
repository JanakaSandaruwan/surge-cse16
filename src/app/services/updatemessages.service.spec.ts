import { TestBed, inject } from '@angular/core/testing';

import { UpdatemessagesService } from './updatemessages.service';

describe('UpdatemessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatemessagesService]
    });
  });

  it('should be created', inject([UpdatemessagesService], (service: UpdatemessagesService) => {
    expect(service).toBeTruthy();
  }));
});
