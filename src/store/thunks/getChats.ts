import { Dispatch } from '../../core/Store';
import { AppState } from '../rootStore';
import { ChatQueries, chatsApi } from '../../api/chatsApi';
import { setError } from '../actions';
import { setChats } from '../actions/actions';

export const getChats =
  (data: ChatQueries = {}) =>
  async (dispatch: Dispatch<AppState>) => {
    try {
      const res = await chatsApi.getChats(data);
      dispatch(setChats(res.data));
    } catch (e: any) {
      dispatch(setError(e));
    }
  };
