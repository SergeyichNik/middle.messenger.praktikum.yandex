import { Block } from 'core/Block';
import './style.css';
import { ButtonProps, ClassButtonProps } from './Button.types';

export class Button extends Block<ClassButtonProps> {
  static componentName = 'Button';

  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
            <button class="button {{style}}"
                {{#if type}}
                    type={{type}}
                {{else}}
                    type="button"
                {{/if}}
                {{#if disabled}}
                    disabled
                {{/if}}
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
