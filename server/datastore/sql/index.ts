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

    this.db.run('PRAGMA foreign_keys = ON;');

    await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });

    return this;
  }
  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO users (id, email, password, firstName, lastName, userName) VALUES (?,?,?,?,?,?)',
      user.id,
      user.email,
      user.password,
      user.firstName,
      user.lastName,
      user.username
    );
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get(`SELECT * FROM users WHERE email = ?`, email);
  }
  getUserById(id: string): Promise<User | undefined> {
    return this.db.get(`SELECT * FROM users WHERE id = ?`, id);
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    return this.db.get(`SELECT * FROM users WHERE username = ?`, username);
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
