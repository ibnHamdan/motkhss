import { CommentDao } from './CommentDao';
import { LikeDao } from './LikeDao';
import { opportunityDao } from './Opportunity';
import { UserDao } from './UserDao';
import { InMemoryDataStore } from './memorydb';

export interface Datastore
  extends UserDao,
    opportunityDao,
    LikeDao,
    CommentDao {}

export const db = new InMemoryDataStore();
