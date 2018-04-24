import { TestBed, inject } from '@angular/core/testing';

import { NoticeserviceService } from './noticeservice.service';

describe('NoticeserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoticeserviceService]
    });
  });

  it('should be created', inject([NoticeserviceService], (service: NoticeserviceService) => {
    expect(service).toBeTruthy();
  }));
});
