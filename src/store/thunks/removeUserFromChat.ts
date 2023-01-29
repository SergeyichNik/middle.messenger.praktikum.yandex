import { Dispatch } from '../../core/Store';
import { AppState } from '../rootStore';
import { setError } from '../actions';
import { chatsApi } from '../../api/chatsApi';
import { getUsersChat } from './getUsersChat';

export const removeUserFromChat =
  (id: number) => async (dispatch: Dispatch<AppState>, state: AppState) => {
    try {
      await chatsApi.removeUserFromChat({ users: [id], chatId: state.selectedChat?.id as number });
      dispatch(getUsersChat(state.selectedChat?.id as number));
    } catch (e: any) {
      setError(e);
    }
  };
