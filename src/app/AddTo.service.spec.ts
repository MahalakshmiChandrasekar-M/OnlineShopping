/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddToService } from './AddTo.service';

describe('Service: AddTo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddToService]
    });
  });

  it('should ...', inject([AddToService], (service: AddToService) => {
    expect(service).toBeTruthy();
  }));
});
