import { createStore } from '../core/Store';

export type AppStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UserPassword {
  oldPassword: string;
  newPassword: string;
}

export interface UserModel {
  avatar: Nullable<string>;
  display_name: Nullable<string>;
  email: string;
  first_name: string;
  id: number;
  login: string;
  phone: string;
  second_name: string;
}

export type UserInChatModel = Omit<UserModel, 'display_name' | 'id'>;

export interface MessageModel {
  user: UserInChatModel;
  time: string;
  content: string;
}

export interface ChatModel {
  id: number;
  title: string;
  avatar: Nullable<string>;
  created_by: number;
  unread_count: number;
  last_message: Nullable<MessageModel>;
}

export interface AppState {
  isAuth: boolean;
  user: UserModel;
  chats: ChatModel[];
  selectedChat: Nullable<ChatModel>;
  selectedChatUsers: UserModel[];
  header: {
    isSettingsMode: boolean;
  };
  searchResultList: any[];
  usersToAdd: number[];
  status: AppStatus;
  error?: Record<string, string>;
  errorStatus?: number;
}

const initialState: AppState = {
  isAuth: false,
  user: {} as UserModel,
  chats: [] as ChatModel[],
  status: 'idle',
  header: {
    isSettingsMode: false,
  },
  searchResultList: [],
  usersToAdd: [],
  selectedChat: null,
  selectedChatUsers: [],
};
export const store = createStore<AppState>(initialState);

export type Dispatch = ReturnType<typeof store.dispatch>;
