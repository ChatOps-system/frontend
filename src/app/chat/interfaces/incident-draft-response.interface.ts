import { IncidentDraft } from './incident-draft.interface';

export interface IncidentDraftResponse {
  incident_draft: IncidentDraft;
  message: string;
}
