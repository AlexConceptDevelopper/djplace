import { apiFetch } from './client.api';

export const uploadApi = {
  uploadImage: async (file: File, category: string = 'general'): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const response = await apiFetch<{ url: string }>('/api/uploads', {
      method: 'POST',
      body: formData,
    });

    return response?.url || null;
  },
};