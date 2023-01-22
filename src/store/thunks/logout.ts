import { authApi } from '../../api/authApi';
import { Dispatch } from '../../core/Store';
import { AppState } from '../rootStore';
import { router } from '../../core/Router';
import { Routes } from '../../router/initRouter';

export const logout = () => async (dispatch: Dispatch<AppState>) => {
  dispatch({ status: 'loading' });
  try {
    await authApi.logout();
    dispatch({ isAuth: false, status: 'success' });
    router.navigate(Routes.AUTH);
  } catch (e) {
    dispatch({ status: 'error' });
  }
};
