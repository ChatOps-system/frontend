import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { vi, it, expect, beforeEach } from 'vitest';

import { environment } from '../../../environments/environment';
import { IncidentSuggestionService } from './incident-suggestion.service';

const httpMock = {
  post: vi.fn(),
};

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [IncidentSuggestionService, { provide: HttpClient, useValue: httpMock }],
  });

  httpMock.post.mockReset();
});
it('should call generateIncidentSuggestion endpoint', () => {
  const service = TestBed.inject(IncidentSuggestionService);

  const mockResponse = { title: 'incident' };
  httpMock.post.mockReturnValue(of(mockResponse));

  service.generateIncidentSuggestion('something').subscribe((res) => {
    expect(res).toEqual(mockResponse);
  });

  expect(httpMock.post).toHaveBeenCalledWith(
    `${environment.backendUrl}/ai/generate-incident-suggestion`,
    { message: 'something' },
  );
});
