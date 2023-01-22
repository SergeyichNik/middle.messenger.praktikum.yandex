import { api } from './config';
import { UserModel, UserPassword } from '../store/rootStore';
import { ResponseType } from './authApi';

export type UserProfileInfo = Omit<UserModel, 'id' | 'avatar'>;

export const userApi = {
  userProfileChange: async (data: UserProfileInfo) => {
    return await api.put<UserProfileInfo, ResponseType<UserModel>>('user/profile', { data });
  },
  userPasswordChange: async (data: UserPassword) => {
    return await api.put<UserPassword, string>('user/password', { data });
  },
  userAvatarChange: async (data: FormData) => {
    return await api.put<FormData, ResponseType<UserModel>>('user/profile/avatar', { data });
  },
  userSearch: async (data: { login: string }) => {
    return await api.post<{ login: string }, ResponseType<UserModel[]>>('user/search', { data });
  },
};
