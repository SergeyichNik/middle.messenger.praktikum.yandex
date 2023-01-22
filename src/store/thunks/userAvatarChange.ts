import { Dispatch } from '../../core/Store';
import { AppState } from '../rootStore';
import { setError, setUser } from '../actions';
import { userApi } from '../../api/userApi';

export const userAvatarChange =
  (data: FormData, cb: () => void) => async (dispatch: Dispatch<AppState>) => {
    try {
      const res = await userApi.userAvatarChange(data);
      dispatch(setUser(res.data));
      cb();
    } catch (e: any) {
      dispatch(setError(e));
    }
  };
