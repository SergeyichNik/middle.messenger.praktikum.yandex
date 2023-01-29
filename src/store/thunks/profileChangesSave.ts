import { AppState } from '../rootStore';
import { Dispatch } from '../../core/Store';

import { userApi, UserProfileInfo } from '../../api/userApi';
import { router } from '../../core/Router';
import { Routes } from '../../router/initRouter';
import { setError, setUser } from 'store/actions';

export const profileChangesSave =
  (model: UserProfileInfo) => async (dispatch: Dispatch<AppState>) => {
    try {
      const res = await userApi.userProfileChange(model);
      dispatch(setUser(res.data));
      router.navigate(Routes.PROFILE);
    } catch (e: any) {
      dispatch(setError(e));
    }
  };
