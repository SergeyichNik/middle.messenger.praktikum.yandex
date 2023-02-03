import { AppState, AppStatus, ChatModel, UserModel } from '../rootStore';
import { Dispatch } from '../../core/Store';
import { chatsApi } from '../../api/chatsApi';

export interface ErrorThunk {
  data: Record<string, string>;
  status: number;
}

export const setStatus = (status: AppStatus): Record<string, string> => {
  return {
    status,
  } as const;
};

export const setError = (error: ErrorThunk): Record<string, any> => {
  return {
    status: 'error',
    error: error.data,
    errorStatus: error.status,
  } as const;
};

export const setUser = (model: UserModel): Record<string, any> => {
  return { user: model };
};

export const toggleIsLoading = (isLoading: boolean): Record<string, boolean> => {
  return {
    isLoading,
  };
};

export const setChats = (model: ChatModel[]): Record<string, any> => {
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
