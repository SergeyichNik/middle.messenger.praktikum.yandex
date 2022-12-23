import Block from 'core/Block';
import './style.css';
import { UnderlinedInputProps } from './UnderlinedInput.types';

export class UnderlinedInput extends Block {
  static componentName = 'UnderlinedInput';

  constructor({
    onInput,
    onFocus,
    onBlur,
    type = 'text',
    disabled = false,
    ...props
  }: UnderlinedInputProps) {
    super({
      ...props,
      type,
      disabled,
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
                   type={{type}}
                   placeholder={{placeholder}}
            >
    `;
  }
}
