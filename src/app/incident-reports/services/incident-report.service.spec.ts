import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { vi, it, expect, beforeEach } from 'vitest';

import { environment } from '../../../environments/environment';
import { IncidentReportService } from './incident-report.service';

const httpMock = {
  post: vi.fn(),
};

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [IncidentReportService, { provide: HttpClient, useValue: httpMock }],
  });

  httpMock.post.mockReset();
});
it('should call createIncidentReport endpoint', () => {
  const service = TestBed.inject(IncidentReportService);

  const incident = {
    title: 'A',
    description: 'B',
  } as any;

  const mockResponse = { id: 1 };
  httpMock.post.mockReturnValue(of(mockResponse));

  service.createIncidentReport(incident).subscribe((res) => {
    expect(res).toEqual(mockResponse);
  });

  expect(httpMock.post).toHaveBeenCalledWith(
    `${environment.backendUrl}/incident-reports`,
    incident,
  );
});
