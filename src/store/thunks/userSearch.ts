import { Dispatch } from '../../core/Store';
import { AppState, UserModel } from '../rootStore';
import { setError } from '../actions';
import { userApi } from '../../api/userApi';

export const userSearch =
  (login: string, cb: (data: UserModel[]) => void) => async (dispatch: Dispatch<AppState>) => {
    try {
      const res = await userApi.userSearch({ login });
      cb(res.data);
    } catch (e: any) {
      dispatch(setError(e));
    }
  };
