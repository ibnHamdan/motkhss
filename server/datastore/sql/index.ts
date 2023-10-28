import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { Datastore } from '..';
import { User, Opportunity, Like, Comment } from '@motkhss/shared';

export class SqlDataStore implements Datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb(dbPath: string) {
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
  async getOpportunity(id: string): Promise<Opportunity | undefined> {
    return await this.db.get<Opportunity>('SELECT * FROM opprtunities id =?', id);
  }
  async deleteOpportunity(id: string): Promise<void> {
    await this.db.run('Delete FROM opportunities WHERE id = ?', id);
  }
  async createLike(like: Like): Promise<void> {
    await this.db.run('INSERT INTO likes(userId, postId) VALUES(?,?)', like.userId, like.opportunityId);
  }
  async createComment(comment: Comment): Promise<void> {
    await this.db.run('INSERT INTO Comments(id, userId, comment, postedAt) VALUES(?,?,?,?,?)'),
      comment.id,
      comment.userId,
      comment.opportunityId,
      comment.postedAt;
  }
  async listComments(opportunityId: string): Promise<Comment[]> {
    return await this.db.all<Comment[]>(
      'SELECT * FROM comments WHERE ooportunityId = ? ORDER BY postedAt DESC',
      opportunityId
    );
  }
  async deleteComment(id: string): Promise<void> {
    await this.db.run('DELETE FROM comments WHERE id = ?', id);
  }
  async countComment(opportunityId: string): Promise<number> {
    const resutl = await this.db.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM comments WHERE  opportunityId = ? ',
      opportunityId
    );
    return resutl?.count ?? 0;
  }

  async getLikes(opportunityId: string): Promise<number> {
    let result = await this.db.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM likes WHERE opportunityId = ?',
      opportunityId
    );
    return result?.count ?? 0;
  }

  async exists(like: Like): Promise<boolean> {
    let awaitResult = await this.db.get<number>(
      'SELECT 1 FROM likes WHERE opportunityId = ? and userId = ?',
      like.opportunityId,
      like.userId
    );
    let val: boolean = awaitResult === undefined ? false : true;
    return val;
  }
}
