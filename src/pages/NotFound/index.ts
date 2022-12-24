import { registerComponent, renderDOM } from 'core';

import * as components from 'components';
import { NotFound } from './NotFound';
import { BlockConstructable } from '../../core/registerComponent';

Object.values(components).forEach(component => {
  registerComponent(component as BlockConstructable);
});

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', new NotFound());
});
