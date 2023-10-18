import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { Datastore } from '..';
import { User, Opportunity, Like, Comment } from '../../types';

export class SqlDataStore implements Datastore {
  public async openDb() {
    const db = await open({
      filename: path.join(__dirname, 'motkhss.sqlite'),
      driver: sqlite3.Database,
    });

    await db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });

    return this;
  }
  createUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  listOpportunities(): Promise<Opportunity[]> {
    throw new Error('Method not implemented.');
  }
  creatOpportunity(opportunity: Opportunity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getOpportunity(id: string): Promise<Opportunity | undefined> {
    throw new Error('Method not implemented.');
  }
  deleteOpportunity(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createLike(like: Like): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listComment(opportunityId: string): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }
  deleteComment(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
