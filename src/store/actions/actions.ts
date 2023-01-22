import { AppState, AppStatus, ChatModel, UserModel } from '../rootStore';
import { Dispatch } from '../../core/Store';
import { getUsersChat } from '../thunks/getUsersChat';

export interface ErrorThunk {
  data: Record<string, string>;
  status: number;
}

export const setStatus = (status: AppStatus) => {
  return {
    status,
  } as const;
};

export const setError = (error: ErrorThunk) => {
  return {
    status: 'error',
    error: error.data,
    errorStatus: error.status,
  } as const;
};

export const setUser = (model: UserModel) => {
  return { user: model };
};

export const setChats = (model: ChatModel[]) => {
  return { chats: model };
};

export const selectChat = (id: number) => (dispatch: Dispatch<AppState>, state: AppState) => {
  const chat = state.chats.find(chat => chat.id === id);
  dispatch(getUsersChat(id));
  if (chat) {
    dispatch({ selectedChat: chat });
  }
};
