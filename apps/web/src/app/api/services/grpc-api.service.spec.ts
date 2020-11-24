import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageDto } from '@api/types';
import { environment } from '@web/env';

import { GrpcApiService } from './grpc-api.service';
import { RestApiService } from './rest-api.service';

describe('GrpcApiService', () => {
  let service: GrpcApiService;
  let apiService: RestApiService;
  const messageDto: MessageDto = { message: 'Welcome to api!' }
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestApiService]
    });
    service = TestBed.inject(GrpcApiService);
    apiService = TestBed.inject(RestApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GET: should return an Observable<Message>', (): void => {
    apiService.get<MessageDto>('/hello').subscribe((result) => {
      expect(result.message).toEqual(messageDto.message);
    });
    const req = httpTestingController.expectOne(`${environment.path}/hello`);
    req.flush(messageDto);
  });
});
