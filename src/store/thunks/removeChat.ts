import { Dispatch } from '../../core/Store';
import { AppState } from '../rootStore';
import { chatsApi } from '../../api/chatsApi';
import { setError } from '../actions';
import { getChats } from './getChats';

export const removeChat = (id: number) => async (dispatch: Dispatch<AppState>) => {
  try {
    await chatsApi.removeChat({ chatId: id });
    dispatch({ selectedChat: null });
    dispatch(getChats());
  } catch (e: any) {
    dispatch(setError(e));
  }
};
