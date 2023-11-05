import { Opportunity } from '@motkhss/shared';

export interface opportunityDao {
  listOpportunities(userId: string): Promise<Opportunity[]>;
  creatOpportunity(opportunity: Opportunity): Promise<void>;
  getOpportunity(id: string, userId: string): Promise<Opportunity | undefined>;
  getOpportunityByUrl(url: string): Promise<Opportunity | undefined>;
  deleteOpportunity(id: string): Promise<void>;
}
