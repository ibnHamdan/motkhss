import { Comment } from '../../types';

export interface CommentDao {
  createComment(comment: Comment): Promise<void>;
  listComment(opportunityId: string): Promise<Comment[]>;
  deleteComment(id: string): Promise<void>;
}
