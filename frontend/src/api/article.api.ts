import { apiFetch } from './client.api';
import type { ArticleType, DifficultyLevel, ArticleResponseDto } from '../types';

export interface ArticleRequestDto {
  title: string;
  content: string;
  summary?: string;
  mainImageUrl?: string;
  type: ArticleType;
  level: DifficultyLevel;
  categoryId: number;
  published?: boolean;
}

export const articleApi = {
  getAll: async (): Promise<ArticleResponseDto[]> => {
    const res = await apiFetch<ArticleResponseDto[]>('/api/articles', { skipAuth: true });
    return res || [];
  },

  getBySlug: async (slug: string): Promise<ArticleResponseDto | null> => {
    return await apiFetch<ArticleResponseDto>(`/api/articles/${slug}`, { skipAuth: true });
  },

  create: async (data: ArticleRequestDto): Promise<ArticleResponseDto | null> => {
    return await apiFetch<ArticleResponseDto>('/api/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};