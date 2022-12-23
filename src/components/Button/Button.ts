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
        <button class="button {{style}}" 
                type={{type}} 
            {{#if dataAttribute}}
                data-{{dataAttribute}}={{dataAttributeValue}}
            {{/if}}
        >
            {{#if arrowLeft}}
                <span class="button-arrow__left"></span>
            {{/if}}
            {{#if label}}
                <span>{{label}}</span>
            {{/if}}
            {{#if arrowRight}}
                <span class="button-arrow__right"></span>
            {{/if}}
        </button>
    `;
  }
}
