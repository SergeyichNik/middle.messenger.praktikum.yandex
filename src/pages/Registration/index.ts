import { registerComponent, renderDOM } from 'core';

import * as components from 'components';
import { Registration } from './Registration';

Object.entries(components).forEach(([name, component]) => {
  // @ts-expect-error
  registerComponent(component);
});

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new Registration());
});
