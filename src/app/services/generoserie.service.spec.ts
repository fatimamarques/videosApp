import { TestBed } from '@angular/core/testing';

import { GeneroserieService } from './generoserie.service';

describe('GeneroserieService', () => {
  let service: GeneroserieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneroserieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
