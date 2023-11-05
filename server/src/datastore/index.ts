import { CommentDao } from './dao/CommentDao';
import { LikeDao } from './dao/LikeDao';
import { opportunityDao } from './dao/Opportunity';
import { UserDao } from './dao/UserDao';
///import { InMemoryDataStore } from './memorydb';
import { SqlDataStore } from './sql';

export interface Datastore extends UserDao, opportunityDao, LikeDao, CommentDao {}

export let db: Datastore;

export async function initDB(dbPath: string) {
  db = await new SqlDataStore().openDb(dbPath);
}
