import Block from 'core/Block';
import './style.css';
import { PTagProps } from './PTag.types';

export class PTag extends Block<PTagProps> {
  static componentName = 'PTag';

  constructor({ ...props }: PTagProps) {
    super({ ...props });
  }

  protected render(): string {
    // language=hbs
    return `
        <p  class="p-tag {{style}}" id={{id}}>{{value}}</p>
    `;
  }
}
