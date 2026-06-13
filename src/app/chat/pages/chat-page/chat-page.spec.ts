import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi, it, expect } from 'vitest';
import { ChatPage } from './chat-page';
import {
  IncidentReportCategory,
  IncidentReportSeverity,
} from '../../../incident-reports/interfaces/incident-report.interface';
import { IncidentReportService } from '../../../incident-reports/services/incident-report.service';
import { IncidentDetectionService } from '../../../ai/services/incident-detection.service';
import { IncidentSuggestionService } from '../../../ai/services/incident-suggestion.service';

const incidentDetectionServiceMock = {
  detectIncident: vi.fn(),
};
const incidentSuggestionServiceMock = {
  generateIncidentSuggestion: vi.fn(),
};
const incidentReportServiceMock = {
  createIncidentReport: vi.fn(),
};
beforeEach(async () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'show', {
    value: vi.fn(),
    writable: true,
  });

  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    value: vi.fn(),
    writable: true,
  });
  await TestBed.configureTestingModule({
    imports: [ChatPage],
    providers: [
      { provide: IncidentDetectionService, useValue: incidentDetectionServiceMock },
      { provide: IncidentSuggestionService, useValue: incidentSuggestionServiceMock },
      { provide: IncidentReportService, useValue: incidentReportServiceMock },
    ],
  }).compileComponents();
});

it('should open toast when incident is detected', () => {
  incidentDetectionServiceMock.detectIncident.mockReturnValue(of({ incidentDetected: true }));
  const fixture = TestBed.createComponent(ChatPage);
  const component = fixture.componentInstance;

  component.detectIncident();
  expect(incidentDetectionServiceMock.detectIncident).toHaveBeenCalledWith(component.message());
});

it('should set incident suggestion', () => {
  const mockSuggestion = {
    incidentSuggestion: {
      title: 't',
      description: 'd',
      severity: 'High' as IncidentReportSeverity,
      category: 'Safety' as IncidentReportCategory,
      location: 'x',
      immediateActions: 'a',
      recommendations: 'r',
    },
    message: 'incident suggestion generated',
  };
  incidentSuggestionServiceMock.generateIncidentSuggestion.mockReturnValue(of(mockSuggestion));
  const fixture = TestBed.createComponent(ChatPage);
  const component = fixture.componentInstance;

  component.generateIncidentSuggestion();

  expect(incidentSuggestionServiceMock.generateIncidentSuggestion).toHaveBeenCalledWith(
    component.message(),
  );
  expect(component.incidentSuggestion()).toEqual(mockSuggestion.incidentSuggestion);
});

it('should clear message and suggestion after report creation', () => {
  const payload = {
    title: 't',
    description: 'd',
    severity: 'High' as IncidentReportSeverity,
    category: 'Safety' as IncidentReportCategory,
    location: 'x',
    occurredAt: '2026-06-02T10:00',
    immediateActions: 'a',
    recommendations: 'r',
  };
  incidentReportServiceMock.createIncidentReport.mockReturnValue(
    of({
      message: 'ok',
      incidentReport: {
        id: 1,
        ...payload,
      },
    }),
  );
  const fixture = TestBed.createComponent(ChatPage);
  const component = fixture.componentInstance;
  component.createIncidentReport(payload);
  expect(incidentReportServiceMock.createIncidentReport).toHaveBeenCalledWith(payload);
  expect(component.message()).toBe('');
  expect(component.incidentSuggestion()).toBeNull();
});
