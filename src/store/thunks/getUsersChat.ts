import { Dispatch } from '../../core/Store';
import { AppState } from '../rootStore';
import { setError } from '../actions';
import { chatsApi } from '../../api/chatsApi';

export const getUsersChat = (id: number) => async (dispatch: Dispatch<AppState>) => {
  try {
    const res = await chatsApi.getUsersChat(id);
    dispatch({ selectedChatUsers: res.data });
  } catch (e: any) {
    setError(e);
  }
};
