import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi, it, expect } from 'vitest';
import { ChatPage } from './chat-page';
import { ChatService } from '../../services/chat.service';
import {
  IncidentReportCategory,
  IncidentReportSeverity,
} from '../../interfaces/incident-report.interface';

const chatServiceMock = {
  detectIncident: vi.fn(),
  generateIncidentDraft: vi.fn(),
  createIncidentReport: vi.fn(),
};
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ChatPage],
    providers: [{ provide: ChatService, useValue: chatServiceMock }],
  }).compileComponents();
});

it('should open toast when incident is detected', () => {
  chatServiceMock.detectIncident.mockReturnValue(of({ incidentDetected: true }));
  const fixture = TestBed.createComponent(ChatPage);
  const component = fixture.componentInstance;

  const toastSpy = vi.spyOn(component.openIncidentDetectedToast, 'set');
  component.detectIncident();
  expect(chatServiceMock.detectIncident).toHaveBeenCalledWith(component.message());
  expect(toastSpy).toHaveBeenCalledWith(true);
});

it('should set draft and close toast', () => {
  const mockDraft = { title: 'test' };
  chatServiceMock.generateIncidentDraft.mockReturnValue(of(mockDraft));
  const fixture = TestBed.createComponent(ChatPage);
  const component = fixture.componentInstance;
  component.generateIncidentDraft();
  expect(chatServiceMock.generateIncidentDraft).toHaveBeenCalledWith(component.message());
  expect(component.incidentDraft()).toEqual(mockDraft);
  expect(component.openIncidentDetectedToast()).toBe(false);
});

it('should clear message and draft after report creation', () => {
  chatServiceMock.createIncidentReport.mockReturnValue(of({ success: true }));
  const fixture = TestBed.createComponent(ChatPage);
  const component = fixture.componentInstance;
  const payload = {
    title: 't',
    description: 'd',
    severity: 'High' as IncidentReportSeverity,
    category: 'Safety' as IncidentReportCategory,
    location: 'x',
    occurredAt: new Date(),
    immediateActions: 'a',
    recommendations: 'r',
  };
  component.createIncidentReport(payload);
  expect(chatServiceMock.createIncidentReport).toHaveBeenCalledWith(payload);
  expect(component.message()).toBe('');
  expect(component.incidentDraft()).toBeNull();
});
