import { authApi, SignInModel } from '../../api/authApi';

import { getUser } from './getUser';
import { Dispatch } from '../../core/Store';
import { AppState } from '../rootStore';
import { router } from '../../core/Router';
import { Routes } from '../../router/initRouter';
import { setError } from '../actions';

export const signIn = (model: SignInModel) => async (dispatch: Dispatch<AppState>) => {
  dispatch({ status: 'loading' });
  try {
    await authApi.signIn(model);
    await dispatch(getUser());
    dispatch({ isAuth: true });
    router.navigate(Routes.CHAT);
  } catch (e: any) {
    dispatch(setError(e));
  }
};
