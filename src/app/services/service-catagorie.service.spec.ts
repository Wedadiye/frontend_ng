import { TestBed } from '@angular/core/testing';

import { ServiceCatagorieService } from './service-catagorie.service';

describe('ServiceCatagorieService', () => {
  let service: ServiceCatagorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCatagorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
