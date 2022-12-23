import { registerComponent, renderDOM } from 'core';

import * as components from 'components';
import { Profile } from './Profile';

Object.entries(components).forEach(([, component]) => {
  // @ts-expect-error
  registerComponent(component);
});

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new Profile());
});
