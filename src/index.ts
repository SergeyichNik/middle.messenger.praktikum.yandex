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
  initRouter(router, store);
});
