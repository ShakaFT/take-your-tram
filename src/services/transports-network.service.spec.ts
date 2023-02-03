import { TestBed } from '@angular/core/testing';

import { TransportsNetworkService } from './transports-network.service';

describe('TransportNetworkService', () => {
  let service: TransportsNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportsNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
