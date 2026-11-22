// src/api/comment.api.ts
import { apiFetch } from './client.api';
import type { CommentRequest, CommentResponse } from '../types/comment';

export const commentApi = {
  getByArticleId: async (articleId: number): Promise<CommentResponse[]> => {
    const res = await apiFetch<CommentResponse[]>(`/api/articles/${articleId}/comments`, {
      skipAuth: true,
    });
    return res || [];
  },

  create: async (articleId: number, data: CommentRequest): Promise<CommentResponse | null> => {
    return await apiFetch<CommentResponse>(`/api/articles/${articleId}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  delete: async (commentId: number): Promise<void> => {
    await apiFetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });
  },
};