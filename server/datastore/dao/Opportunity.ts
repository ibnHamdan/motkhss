import { Opportunity } from '../../types';

export interface opportunityDao {
  listOpportunities(): Promise<Opportunity[]>;
  creatOpportunity(opportunity: Opportunity): Promise<void>;
  getOpportunity(id: string): Promise<Opportunity | undefined>;
  deleteOpportunity(id: string): Promise<void>;
}
