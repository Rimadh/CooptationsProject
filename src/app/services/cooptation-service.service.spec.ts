import { TestBed } from '@angular/core/testing';

import { CooptationService } from './cooptation-service.service';

describe('CooptationServiceService', () => {
  let service: CooptationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooptationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
