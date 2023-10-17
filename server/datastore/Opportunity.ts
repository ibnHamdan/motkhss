import { Opportunity } from '../types';

export interface opportunityDao {
  listOpportunities(): Opportunity[];
  creatOpportunity(opportunity: Opportunity): void;
  getOpportunity(id: string): Opportunity | undefined;
  deleteOpportunity(id: string): void;
}
