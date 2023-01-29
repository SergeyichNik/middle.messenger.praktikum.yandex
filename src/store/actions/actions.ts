import { AppState, AppStatus, ChatModel, UserModel } from '../rootStore';
import { Dispatch } from '../../core/Store';
import { getUsersChat } from '../thunks/getUsersChat';
import { getChatToken } from '../thunks/getChatToken';

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

export const selectChat = (id: number) => async (dispatch: Dispatch<AppState>, state: AppState) => {
  try {
    const chat = state.chats.find(chat => chat.id === id);
    if (chat) {
      await dispatch(getChatToken(id));
      await dispatch(getUsersChat(id));
      await dispatch({ selectedChat: chat });
    }
  } catch (e: any) {
    setError(e);
  }
};
