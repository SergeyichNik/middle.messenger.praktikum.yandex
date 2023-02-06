import { AppState, AppStatus, ChatModel, UserModel } from '../rootStore';
import { Dispatch } from '../../core/Store';
import { chatsApi } from '../../api/chatsApi';

export interface ErrorThunk {
  data: Record<string, string>;
  status: number;
}

export const setStatus = (status: AppStatus): Partial<AppState> => {
  return {
    status,
  } as const;
};

export const setError = (error: ErrorThunk): Partial<AppState> => {
  return {
    status: 'error',
    error: error.data,
    errorStatus: error.status,
  } as const;
};

export const setUser = (model: UserModel): Partial<AppState> => {
  return { user: model };
};

export const toggleIsLoading = (isLoading: boolean): Partial<AppState> => {
  return {
    isLoading,
  };
};

export const setChats = (model: ChatModel[]): Partial<AppState> => {
  return { chats: model };
};

export const selectChat = (id: number) => async (dispatch: Dispatch<AppState>, state: AppState) => {
  try {
    dispatch(toggleIsLoading(true));
    const chat = state.chats.find(chat => chat.id === id);
    if (chat) {
      const fetchedToken = await chatsApi.getChatToken(id);
      const fetchedUsers = await chatsApi.getUsersChat(id);
      await dispatch({
        selectedChat: chat,
        isLoading: false,
        activeChatToken: fetchedToken.data.token,
        selectedChatUsers: fetchedUsers.data,
      });
    }
  } catch (e: any) {
    setError(e);
  }
};
