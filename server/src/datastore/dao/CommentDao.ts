import { Comment } from '@motkhss/shared';

export interface CommentDao {
  createComment(comment: Comment): Promise<void>;
  countComment(opportunityId: string): Promise<number>;
  listComments(opportunityId: string): Promise<Comment[]>;
  deleteComment(id: string): Promise<void>;
}
