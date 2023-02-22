import { renderDOM, Block, registerComponent } from '../core';
import * as components from '../components';

export function renderBlock<P extends object>(Block: new (props: P) => Block<P>, props: P): void {
  Object.values(components).forEach((Component: any) => {
    registerComponent(Component);
  });

  const div = document.createElement('div');
  div.setAttribute('id', 'app');
  document.body.appendChild(div);

  renderDOM('#app', new Block(props));
}
