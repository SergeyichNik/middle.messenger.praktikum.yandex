import { registerComponent, renderDOM } from 'core';

import * as components from 'components';
import { Chat } from './Chat';

Object.values(components).forEach(component => {
  // @ts-expect-error
  registerComponent(component);
});

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new Chat());
});
