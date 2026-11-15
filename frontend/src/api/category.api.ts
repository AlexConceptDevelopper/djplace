import { apiFetch } from './client.api';
import type { CategoryResponseDto, CategoryRequestDto } from '../types';

export const categoryApi = {
  getAll: async (): Promise<CategoryResponseDto[]> => {
    const res = await apiFetch<CategoryResponseDto[]>('/api/categories', { skipAuth: true });
    return res || [];
  },

  create: async (data: CategoryRequestDto): Promise<CategoryResponseDto | null> => {
    return await apiFetch<CategoryResponseDto>('/api/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};