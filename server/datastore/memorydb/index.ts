import { Datastore } from '..';
import { User, Opportunity, Like, Comment } from '../../types';

export class InMemoryDataStore implements Datastore {
  private users: User[] = [];
  private opportunities: Opportunity[] = [];
  private comments: Comment[] = [];
  private likes: Like[] = [];

  createUser(user: User): void {
    this.users.push(user);
  }
  getUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }
  getUserByUsername(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }
  listOpportunities(): Opportunity[] {
    return this.opportunities;
  }
  creatOpportunity(opportunity: Opportunity): void {
    this.opportunities.push(opportunity);
  }
  getOpportunity(id: string): Opportunity | undefined {
    return this.opportunities.find((o) => o.id === id);
  }
  deleteOpportunity(id: string): void {
    const index = this.opportunities.findIndex((o) => o.id === id);
    if (index === -1) {
      return;
    }
    this.opportunities.splice(index, 1);
  }
  createLike(like: Like): void {
    this.likes.push(like);
  }
  createComment(comment: Comment): void {
    this.comments.push(comment);
  }
  listComment(opportunityId: string): Comment[] {
    return this.comments.filter((c) => c.id === opportunityId);
  }
  deleteComment(id: string): void {
    const index = this.comments.findIndex((c) => c.id === id);
    if (index === -1) {
      return;
    }
    this.comments.splice(index, 1);
  }
}
