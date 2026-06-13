import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { vi, it, expect, beforeEach } from 'vitest';

import { environment } from '../../../environments/environment';
import { IncidentDetectionService } from './incident-detection.service';

const httpMock = {
  post: vi.fn(),
};

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [IncidentDetectionService, { provide: HttpClient, useValue: httpMock }],
  });

  httpMock.post.mockReset();
});
it('should call detectIncident endpoint', () => {
  const service = TestBed.inject(IncidentDetectionService);

  const mockResponse = { isIncident: true };
  httpMock.post.mockReturnValue(of(mockResponse));

  const message = 'system is down';

  service.detectIncident(message).subscribe((res) => {
    expect(res).toEqual(mockResponse);
  });

  expect(httpMock.post).toHaveBeenCalledWith(`${environment.backendUrl}/ai/detect-incident`, {
    message,
  });
});
