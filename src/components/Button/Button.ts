import Block from 'core/Block';
import './style.css';
import { ButtonProps, ClassButtonProps } from './Button.types';

export class Button extends Block<ClassButtonProps> {
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
            {{#if iconLeft}}
                <span class="button-icon__left {{iconType}}"></span>
            {{/if}}
            {{#if label}}
                <span>{{label}}</span>
            {{/if}}
            {{#if iconRight}}
                <span class="button-arrow__right"></span>
            {{/if}}
        </button>
    `;
  }
}
