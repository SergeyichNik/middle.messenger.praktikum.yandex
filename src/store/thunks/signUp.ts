import { authApi, SignUpModel } from '../../api/authApi';
import { Dispatch } from '../../core/Store';
import { AppState } from '../rootStore';
import { setError } from '../actions';
import { router } from '../../core/Router';
import { Routes } from '../../router/initRouter';

export const signUp = (model: SignUpModel) => async (dispatch: Dispatch<AppState>) => {
  try {
    await authApi.signUp(model);
    router.navigate(Routes.CHAT);
  } catch (e: any) {
    dispatch(setError(e));
  }
};
