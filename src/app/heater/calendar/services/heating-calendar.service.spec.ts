import {TestBed} from '@angular/core/testing';

import {HeatingCalendarService} from './heating-calendar.service';

describe('HeatingCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeatingCalendarService = TestBed.get(HeatingCalendarService);
    expect(service).toBeTruthy();
  });
});
