import { Block } from 'core/Block';
import './style.css';
import { PageTitleProps } from './PageTitle.types';

export class PageTitle extends Block<PageTitleProps> {
  static componentName = 'PageTitle';

  constructor({ ...props }: PageTitleProps) {
    super({ ...props });
  }

  protected render(): string {
    // language=hbs
    return `<h2 class="page-title">{{title}}</h2>`;
  }
}
