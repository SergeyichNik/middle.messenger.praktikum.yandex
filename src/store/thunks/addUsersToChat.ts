import { chatsApi } from '../../api/chatsApi';
import { Dispatch } from '../../core/Store';
import { AppState } from '../rootStore';
import { setError } from '../actions';
import { getUsersChat } from './getUsersChat';

export const addUsersToChat =
  (id: number, cb?: () => void) => async (dispatch: Dispatch<AppState>, state: AppState) => {
    try {
      await chatsApi.addUserToChat({ chatId: state.selectedChat?.id as number, users: [id] });
      dispatch(getUsersChat(state.selectedChat?.id as number));
      cb?.();
    } catch (e: any) {
      setError(e);
    }
  };
