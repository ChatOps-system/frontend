import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { ChatService } from './chat.service';
import { environment } from '../../../environments/environment';

const httpMock = {
  post: vi.fn(),
};

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [ChatService, { provide: HttpClient, useValue: httpMock }],
  });

  httpMock.post.mockReset();
});
it('should call detectIncident endpoint', () => {
  const service = TestBed.inject(ChatService);

  const mockResponse = { isIncident: true };
  httpMock.post.mockReturnValue(of(mockResponse));

  const message = 'system is down';

  service.detectIncident(message).subscribe((res) => {
    expect(res).toEqual(mockResponse);
  });

  expect(httpMock.post).toHaveBeenCalledWith(`${environment.backendUrl}/chat/detect-incident`, {
    message,
  });
});
it('should call generateIncidentDraft endpoint', () => {
  const service = TestBed.inject(ChatService);

  const mockResponse = { title: 'incident' };
  httpMock.post.mockReturnValue(of(mockResponse));

  service.generateIncidentDraft('something').subscribe((res) => {
    expect(res).toEqual(mockResponse);
  });

  expect(httpMock.post).toHaveBeenCalledWith(
    `${environment.backendUrl}/chat/generate-incident-draft`,
    { message: 'something' },
  );
});
