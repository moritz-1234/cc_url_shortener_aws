import { TestBed } from '@angular/core/testing';

import { UrlRestService } from './url-rest.service';

describe('UrlRestService', () => {
  let service: UrlRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
