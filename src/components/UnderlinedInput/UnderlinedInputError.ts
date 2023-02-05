import { Block } from 'core/Block';
import './style.css';
import { ErrorInstanceProps } from './UnderlinedInput.types';

export class UnderlinedInputError extends Block<ErrorInstanceProps> {
  static componentName = 'UnderlinedInputError';
  protected render(): string {
    // language=hbs
    return `
        <p class="underlined-input__error">{{#if text}} {{text}} {{/if}}</p>
    `;
  }
}
