import Block from 'core/Block';
import './style.css';
import { FilledInputProps } from './FilledInput.types';

export class FilledInput extends Block {
  static componentName = 'FilledInput';

  constructor({ onInput, ...props }: FilledInputProps) {
    super({ ...props, events: { input: onInput } });
  }

  protected render(): string {
    // language=hbs
    return `
        <label class="search-field {{style}}">
            <input type="text" placeholder={{placeholder}}>
            {{#if icon}}
                <span class="search-field__icon">
            <img src={{icon}} alt="search icon">
        </span>
            {{/if}}
        </label>
    `;
  }
}
