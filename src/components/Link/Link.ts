import { Block } from 'core/Block';
import './style.css';
import { ClassLinkProps, LinkProps } from './Link.types';
import { router } from '../../core/Router';

export class Link extends Block<ClassLinkProps> {
  static componentName = 'Link';

  constructor({ ...props }: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          router.navigate(props.linkTo);
        },
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `<a class="link" href={{href}}>{{text}}</a>`;
  }
}
