export interface CommentResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  articleId: number;
  authorId: number;
  authorUsername: string;
}

export interface CommentRequest {
  content: string;
}