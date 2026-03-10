import { apiClient } from '../api-client';
import { Post, Category, ApiResponse } from '@/types';
import { MOCK_POSTS, MOCK_CATEGORIES } from '../mock-data';

// Toggle this to use real API or mock data
const USE_MOCK = true;

export const postsApi = {
  getAll: async (params?: any): Promise<ApiResponse<Post[]>> => {
    if (USE_MOCK) {
      return { data: MOCK_POSTS, meta: { total: MOCK_POSTS.length, page: 1, limit: 10 } };
    }
    return apiClient.get('/posts', { params });
  },

  getBySlug: async (slug: string): Promise<Post> => {
    if (USE_MOCK) {
      const post = MOCK_POSTS.find(p => p.slug === slug);
      if (!post) throw new Error('Post not found');
      return post;
    }
    return apiClient.get(`/posts/${slug}`);
  },

  create: async (data: Partial<Post>): Promise<Post> => {
    return apiClient.post('/posts', data);
  },

  update: async (id: string, data: Partial<Post>): Promise<Post> => {
    return apiClient.put(`/posts/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete(`/posts/${id}`);
  },

  getCategories: async (): Promise<Category[]> => {
    if (USE_MOCK) return MOCK_CATEGORIES;
    return apiClient.get('/categories');
  }
};
