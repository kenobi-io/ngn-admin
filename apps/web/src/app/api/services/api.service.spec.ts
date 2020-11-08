import { TestBed } from '@angular/core/testing';
import { Message } from '@api/types';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let message: Message = { message: 'hello' }
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be invoke get', () => {
    service.get<Message>('/hello').subscribe((result: Message) => {
      expect(result).toEqual(message);
    });
  });
});
