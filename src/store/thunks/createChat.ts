import { Dispatch } from '../../core/Store';
import { AppState } from '../rootStore';
import { setError } from '../actions';
import { chatsApi } from '../../api/chatsApi';
import { getChats } from './getChats';

export const createChat =
  (title: string, cb: () => void) => async (dispatch: Dispatch<AppState>) => {
    try {
      await chatsApi.createChat({ title });
      dispatch(getChats());
      cb();
    } catch (e: any) {
      dispatch(setError(e));
    }
  };
