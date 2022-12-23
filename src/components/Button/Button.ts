import Block from 'core/Block';
import './style.css';
import { ButtonProps } from './Button.types';

export class Button extends Block {
  static componentName = 'Button';

  constructor({ onClick, type = 'button', ...props }: ButtonProps) {
    super({
      ...props,
      type,
      events: {
        click: onClick,
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="button {{style}}" type={{type}}>
            {{#if iconBefore}}
                <img class="button-icon" alt="icon" src={{iconBefore}} />
            {{/if}}
            {{#if label}}
                <span>{{label}}</span>
            {{/if}}
            {{#if iconAfter}}
                <img class="button-icon" alt="icon" src={{iconAfter}} />
            {{/if}}
        </button>
    `;
  }
}
