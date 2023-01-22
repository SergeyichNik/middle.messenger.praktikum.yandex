import Block from 'core/Block';
import './style.css';
import { ClassUnderlinedInputProps, UnderlinedInputProps } from './UnderlinedInput.types';

export class UnderlinedInput extends Block<ClassUnderlinedInputProps> {
  static componentName = 'UnderlinedInput';

  constructor({ onInput, onFocus, onBlur, type = 'text', ...props }: UnderlinedInputProps) {
    super({
      ...props,
      type,
      events: {
        input: onInput,
        focus: onFocus,
        blur: onBlur,
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <input name={{name}}
               required
            {{#if value}}
               value={{value}}
            {{/if}}
            {{#if disabled}}
                {{disabled}}
            {{/if}}
            {{#if placeholder}}
               placeholder={{placeholder}}
            {{/if}}
               type={{type}}

        >
    `;
  }
}
