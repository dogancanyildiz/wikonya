/**
 * API functions and endpoints
 */

import { apiClient } from "./client"
import type { Discussion, Comment, User, Topic } from "@/lib/types"

// Discussions API
export const discussionsApi = {
  getAll: (params?: { page?: number; limit?: number; category?: string }) =>
    apiClient.get<{ discussions: Discussion[]; total: number }>("/discussions", {
      params: params as Record<string, string | number>,
    }),

  getById: (id: number) =>
    apiClient.get<Discussion>(`/discussions/${id}`),

  create: (data: { title: string; content: string; category: string }) =>
    apiClient.post<Discussion>("/discussions", data),

  update: (id: number, data: Partial<Discussion>) =>
    apiClient.patch<Discussion>(`/discussions/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<void>(`/discussions/${id}`),
}

// Comments API
export const commentsApi = {
  getByDiscussionId: (discussionId: number) =>
    apiClient.get<Comment[]>(`/discussions/${discussionId}/comments`),

  create: (discussionId: number, data: { content: string }) =>
    apiClient.post<Comment>(`/discussions/${discussionId}/comments`, data),

  update: (id: number, data: Partial<Comment>) =>
    apiClient.patch<Comment>(`/comments/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<void>(`/comments/${id}`),

  vote: (id: number, type: "up" | "down") =>
    apiClient.post<Comment>(`/comments/${id}/vote`, { type }),
}

// Users API
export const usersApi = {
  getCurrent: () =>
    apiClient.get<User>("/users/me"),

  getById: (id: number) =>
    apiClient.get<User>(`/users/${id}`),

  update: (id: number, data: Partial<User>) =>
    apiClient.patch<User>(`/users/${id}`, data),
}

// Topics API
export const topicsApi = {
  getAll: (params?: { page?: number; limit?: number }) =>
    apiClient.get<{ topics: Topic[]; total: number }>("/topics", {
      params: params as Record<string, string | number>,
    }),

  getById: (id: number) =>
    apiClient.get<Topic>(`/topics/${id}`),

  create: (data: { title: string; content: string; category: string; tags?: string[] }) =>
    apiClient.post<Topic>("/topics", data),
}

