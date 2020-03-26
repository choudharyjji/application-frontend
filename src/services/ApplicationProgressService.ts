import { LeadApplicationProgressState } from '../state/lead-application/interface';

export class ApplicationProgressService {
  states: LeadApplicationProgressState[] = [];

  public addState(state: LeadApplicationProgressState): this {
    this.states.push(state);
    return this;
  }
}
