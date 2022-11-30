import { HttpErrorResponse } from '@angular/common/http';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { OptionsRest } from './options-rest';
import { RestApiService } from './rest-api.service';

class MessageDto {
    message?: string;
}
class RequestDto {
    id?: string;
    body?: string;
}

class ResponseDto {
    id?: string;
    body?: string;
}

describe('#ApiService', () => {
    let apiService: RestApiService;
    const messageDto: MessageDto = { message: 'Welcome to api!' };
    let httpTestingController: HttpTestingController;
    const environment = { path: 'api/v1' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        apiService = TestBed.inject(RestApiService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(apiService).toBeTruthy();
    });
    it('GET: should return an Observable<Message>', fakeAsync((): void => {
        apiService
            .get<MessageDto>(`${environment.path}/hello`)
            .subscribe((result) => {
                expect(result.message).toEqual(messageDto.message);
            });
        const req = httpTestingController.expectOne(
            `${environment.path}/hello`
        );
        req.flush(messageDto);
        tick();
    }));
    it('POST: should return an Observable<Message>', fakeAsync((): void => {
        const reqDto: RequestDto = { body: 'body', id: '123' };
        const option: OptionsRest = { observe: 'body', responseType: 'json' };
        apiService
            .post<ResponseDto, RequestDto>(
                `${environment.path}/hello`,
                reqDto,
                option
            )
            .subscribe((result) => {
                expect(result.id).toEqual(reqDto.id);
                expect(result.body).toEqual(reqDto.body);
            });
        const req = httpTestingController.expectOne(
            `${environment.path}/hello`
        );
        expect(req.request.body).toBe(reqDto);
        req.flush(reqDto, { status: 200, statusText: 'Ok' });
        tick();
    }));
    it('PUT: should return an Observable<Message>', fakeAsync((): void => {
        const reqDto: RequestDto = { body: 'body', id: '123' };
        const option: OptionsRest = { observe: 'body', responseType: 'json' };
        apiService
            .put<ResponseDto, RequestDto>(
                `${environment.path}/hello`,
                reqDto,
                option
            )
            .subscribe((result) => {
                expect(result.id).toEqual(reqDto.id);
                expect(result.body).toEqual(reqDto.body);
            });
        const req = httpTestingController.expectOne(
            `${environment.path}/hello`
        );
        expect(req.request.body).toBe(reqDto);
        req.flush(reqDto, { status: 200, statusText: 'Ok' });
        tick();
    }));

    it('PATCH: should return an Observable<Message>', fakeAsync((): void => {
        const reqDto: RequestDto = { body: 'body', id: '123' };
        const option: OptionsRest = { observe: 'body', responseType: 'json' };
        apiService
            .patch<ResponseDto, RequestDto>(
                `${environment.path}/hello`,
                reqDto,
                option
            )
            .subscribe((result) => {
                expect(result.id).toEqual(reqDto.id);
                expect(result.body).toEqual(reqDto.body);
            });
        const req = httpTestingController.expectOne(
            `${environment.path}/hello`
        );
        expect(req.request.body).toBe(reqDto);
        req.flush(reqDto, { status: 200, statusText: 'Ok' });
        tick();
    }));

    it('JSONP: should return an Observable<Message> GET', fakeAsync((
        done: () => void
    ): void => {
        apiService
            .jsonp<MessageDto>(`${environment.path}/hello`, 'myCallback')
            .subscribe(() => {
                done();
            });
        const req = httpTestingController.expectOne({
            method: 'JSONP',
            url: `${environment.path}/hello?myCallback=JSONP_CALLBACK`,
        });
        req.flush(messageDto);
        tick();
    }));

    describe('#make a request for an error response', () => {
        it('ERROR: with a JSON body', (done) => {
            apiService.get(`${environment.path}/hello`).subscribe(
                () => ({} as (value: unknown) => void),
                (res: HttpErrorResponse) => {
                    expect(res.error['message']).toEqual(messageDto.message);
                    done();
                    // eslint-disable-next-line comma-dangle
                }
            );
            httpTestingController
                .expectOne(`${environment.path}/hello`)
                .flush(
                    { message: 'Welcome to api!' },
                    { status: 500, statusText: 'Server error' }
                );
        });
    });
});
