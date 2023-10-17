import { Comment } from '../types';

export interface CommentDao {
  createComment(comment: Comment): void;
  listComment(opportunityId: string): Comment[];
  deleteComment(id: string): void;
}
