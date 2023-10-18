import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { Datastore } from '..';
import { User, Opportunity, Like, Comment } from '../../types';

export class SqlDataStore implements Datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb() {
    this.db = await open({
      filename: path.join(__dirname, 'motkhss.sqlite'),
      driver: sqlite3.Database,
    });

    this.db.run(' PRAGMA foreign_keys = ON;');

    await this.db.migrate({
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
    return this.db.all<Opportunity[]>(`SELECT * FROM opportunities`);
  }
  async creatOpportunity(opportunity: Opportunity): Promise<void> {
    await this.db.run(
      'INSERT INTO opportunities (id, title, url, postedAt, userId) VALUES (?,?,?,?,?)',
      opportunity.id,
      opportunity.title,
      opportunity.url,
      opportunity.postedAt,
      opportunity.userId
    );
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
