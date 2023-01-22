import { api } from './config';
import { UserModel } from '../store/rootStore';

export interface SignUpModel {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export type GetUserRes = UserModel;

export interface ResponseType<Data> {
  data: Data;
  status: number;
}

export type SignInModel = Pick<SignUpModel, 'login' | 'password'>;

export const authApi = {
  signUp: async (data: SignUpModel) => {
    return await api.post('auth/signup', { data });
  },
  signIn: async (data: SignInModel) => {
    return await api.post('auth/signin', { data });
  },
  getUser: async () => {
    return await api.get<undefined, ResponseType<GetUserRes>>('auth/user');
  },
  logout: async () => {
    return await api.post('auth/logout');
  },
};
