import Block from 'core/Block';
import './style.css';
import { LinkProps } from './Link.types';

export class Link extends Block {
  static componentName = 'Link';

  constructor({ ...props }: LinkProps) {
    super({ ...props });
  }

  protected render(): string {
    // language=hbs
    return `<a class="link" href={{href}}>{{text}}</a>`;
  }
}
