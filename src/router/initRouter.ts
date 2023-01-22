import { Auth, Chat, NotFound, Profile, Registration } from 'pages';
import { renderDOM, Store } from 'core';
import { AppState } from 'store/rootStore';
import { RouterType } from 'core/Router';
import { getUser } from 'store/thunks';

export enum Routes {
  AUTH = '/',
  REGISTRATION = '/sign-up',
  CHAT = '/messenger',
  PROFILE = '/settings',
  PROFILE_EDIT_USER_INFO = '/settings/user',
  PROFILE_CHANGE_USER_PASSWORD = '/settings/password',
  NOT_FOUND = '/*',
  SERVER_ERROR = '/server-error',
}

const Pages = [
  {
    path: Routes.AUTH,
    Component: Auth,
    authRequired: false,
  },
  {
    path: Routes.REGISTRATION,
    Component: Registration,
    authRequired: false,
  },
  {
    path: Routes.CHAT,
    Component: Chat,
    authRequired: true,
  },
  {
    path: Routes.PROFILE,
    Component: Profile,
    authRequired: true,
  },
  {
    path: Routes.PROFILE,
    Component: Profile,
    authRequired: true,
  },
  {
    path: Routes.PROFILE_EDIT_USER_INFO,
    Component: Profile,
    authRequired: true,
  },
  {
    path: Routes.PROFILE_CHANGE_USER_PASSWORD,
    Component: Profile,
    authRequired: true,
  },
  {
    path: Routes.NOT_FOUND,
    Component: NotFound,
    authRequired: false,
  },
];

export const initRouter = (router: RouterType, store: Store<AppState>): void => {
  const isAuthorized = store.getState().isAuth;

  Pages.forEach(({ path, Component }) => {
    router.route(path, () => {
      renderDOM('#app', new Component());
    });
  });

  const isUser = !Object.keys(store.getState().user).length;
  if (
    (window.location.pathname === Routes.AUTH && isUser) ||
    (window.location.pathname === Routes.REGISTRATION && isUser)
  ) {
    router.navigate(Routes.CHAT);
  }

  if (isAuthorized) {
    router.init();
  } else {
    store.dispatch(getUser());
  }
};
