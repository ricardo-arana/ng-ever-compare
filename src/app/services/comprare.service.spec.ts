import { TestBed } from '@angular/core/testing';

import { ComprareService } from './comprare.service';

describe('ComprareService', () => {
  let service: ComprareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
