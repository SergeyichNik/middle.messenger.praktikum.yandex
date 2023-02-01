import { registerComponent } from 'core';
import './style.css';
import * as components from 'components';

import { BlockConstructable } from './core/registerComponent';
import { router } from './core/Router';
import { initRouter } from './router/initRouter';
import { store } from './store/rootStore';

Object.values(components).forEach(component => {
  registerComponent(component as BlockConstructable);
});

document.addEventListener('DOMContentLoaded', () => {
  // if (process.env.NODE_ENV === 'development') {
  //   store.on('updated', (prevState, nextState) => {
  //     console.log('%cstore updated', 'background: #222; color: #bada55', nextState);
  //   });
  // }

  initRouter(router, store);
});
