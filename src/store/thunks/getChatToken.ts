import { Dispatch } from '../../core/Store';
import { AppState } from '../rootStore';
import { setError } from '../actions';
import { chatsApi } from '../../api/chatsApi';

export const getChatToken = (id: number) => async (dispatch: Dispatch<AppState>) => {
  try {
    const res = await chatsApi.getChatToken(id);
    dispatch({ activeChatToken: res.data.token });
  } catch (e: any) {
    setError(e);
  }
};
