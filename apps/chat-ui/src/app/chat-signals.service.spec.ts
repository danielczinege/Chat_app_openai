import { TestBed } from '@angular/core/testing';

import { ChatSignalsService } from './chat-signals.service';

describe('ChatSignalsService', () => {
  let service: ChatSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
