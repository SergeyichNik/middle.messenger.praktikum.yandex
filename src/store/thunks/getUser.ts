import { Dispatch } from 'core/Store';
import { authApi } from '../../api/authApi';
import { AppState } from '../rootStore';
import { router } from '../../core/Router';
import { Routes } from '../../router/initRouter';
import { setError } from 'store/actions';
import { getChats } from './getChats';

export const getUser = () => async (dispatch: Dispatch<AppState>) => {
  try {
    const res = await authApi.getUser();
    dispatch({ isAuth: true, user: res.data });
    dispatch(getChats());
    router.init();
  } catch (e: any) {
    dispatch(setError(e));
    router.navigate(Routes.AUTH, window.location.pathname);
  }
};
