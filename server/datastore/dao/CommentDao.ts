import { Comment } from '@motkhss/shared';

export interface CommentDao {
  createComment(comment: Comment): Promise<void>;
  listComments(opportunityId: string): Promise<Comment[]>;
  deleteComment(id: string): Promise<void>;
}
