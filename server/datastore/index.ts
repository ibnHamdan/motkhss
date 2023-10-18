import { CommentDao } from './dao/CommentDao';
import { LikeDao } from './dao/LikeDao';
import { opportunityDao } from './dao/Opportunity';
import { UserDao } from './dao/UserDao';
import { InMemoryDataStore } from './memorydb';

export interface Datastore extends UserDao, opportunityDao, LikeDao, CommentDao {}

export const db = new InMemoryDataStore();
