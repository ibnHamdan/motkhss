import { Datastore } from '..';
import { User, Opportunity, Like, Comment } from '../../types';

export class InMemoryDataStore implements Datastore {
  private users: User[] = [];
  private opportunities: Opportunity[] = [];
  private comments: Comment[] = [];
  private likes: Like[] = [];

  createUser(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((u) => u.email === email));
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((u) => u.username === username));
  }
  listOpportunities(): Promise<Opportunity[]> {
    return Promise.resolve(this.opportunities);
  }
  creatOpportunity(opportunity: Opportunity): Promise<void> {
    this.opportunities.push(opportunity);
    return Promise.resolve();
  }
  getOpportunity(id: string): Promise<Opportunity | undefined> {
    return Promise.resolve(this.opportunities.find((o) => o.id === id));
  }
  deleteOpportunity(id: string): Promise<void> {
    const index = this.opportunities.findIndex((o) => o.id === id);
    if (index === -1) {
      return Promise.resolve();
    }
    this.opportunities.splice(index, 1);
    return Promise.resolve();
  }
  createLike(like: Like): Promise<void> {
    this.likes.push(like);
    return Promise.resolve();
  }
  createComment(comment: Comment): Promise<void> {
    this.comments.push(comment);
    return Promise.resolve();
  }
  listComment(opportunityId: string): Promise<Comment[]> {
    return Promise.resolve(this.comments.filter((c) => c.id === opportunityId));
  }
  deleteComment(id: string): Promise<void> {
    const index = this.comments.findIndex((c) => c.id === id);
    if (index === -1) {
      return Promise.resolve();
    }
    this.comments.splice(index, 1);
    return Promise.resolve();
  }
}
