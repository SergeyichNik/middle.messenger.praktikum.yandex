import { api } from './config';

import { ChatModel, UserModel } from '../store/rootStore';
import { ResponseType } from './authApi';

interface RemovedChatModel {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  };
}

export interface AddUserToChat {
  users: number[];
  chatId: number;
}

export interface ChatQueries {
  offset?: number;
  limit?: number;
  title?: string;
}

export const chatsApi = {
  getChats: async (data: ChatQueries) => {
    return await api.get<ChatQueries, ResponseType<ChatModel[]>>('chats', { data });
  },
  createChat: async (data: { title: string }) => {
    return await api.post<{ title: string }, ResponseType<ChatModel>>('chats', { data });
  },
  removeChat: async (data: { chatId: number }) => {
    return await api.delete<{ chatId: number }, ResponseType<RemovedChatModel>>('chats', {
      data,
    });
  },
  addUserToChat: async (data: AddUserToChat) => {
    return await api.put<AddUserToChat, ResponseType<string>>('chats/users', {
      data,
    });
  },
  removeUserFromChat: async (data: AddUserToChat) => {
    return await api.delete<AddUserToChat, ResponseType<string>>('chats/users', {
      data,
    });
  },
  getUsersChat: async (id: number) => {
    return await api.get<number, ResponseType<UserModel[]>>(`chats/${id}/users`);
  },
};
