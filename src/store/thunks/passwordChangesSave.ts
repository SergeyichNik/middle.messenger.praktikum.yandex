import { AppState, UserPassword } from '../rootStore';
import { Dispatch } from '../../core/Store';

import { userApi } from '../../api/userApi';
import { Routes } from '../../router/initRouter';
import { router } from '../../core/Router';
import { setError } from '../actions';

export const passwordChangesSave =
  (model: UserPassword) => async (dispatch: Dispatch<AppState>) => {
    try {
      await userApi.userPasswordChange(model);
      router.navigate(Routes.PROFILE);
    } catch (e: any) {
      dispatch(setError(e));
    }
  };
