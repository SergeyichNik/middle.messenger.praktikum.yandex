import { registerComponent, renderDOM } from 'core';

import * as components from 'components';
import { Auth } from './Auth';

Object.entries(components).forEach(([, component]) => {
  console.log(component.name);
  // @ts-expect-error
  registerComponent(component);
});

console.log(components);

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new Auth());
});
