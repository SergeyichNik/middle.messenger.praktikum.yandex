import Block from 'core/Block';
import './style.css';
import { UnderlinedInputControllerProps } from './UnderlinedInput.types';
import { validateForm } from '../../utils/validateForm';

export class UnderlinedInputController extends Block {
  static componentName = 'UnderlinedInputController';

  constructor({ disabled, ...props }: UnderlinedInputControllerProps) {
    super({
      ...props,
      disabled,
      onBlur: (e: FocusEvent): void => {
        const input = e.target as HTMLInputElement;
        const { error } = validateForm([
          {
            type: this.props.name,
            value: input.value,
          },
        ]);
        this.refs.errorRef.setProps({
          text: error[this.props.name],
        });
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <label class="underlined-input__controller">
            {{{ UnderlinedInput
                    required="required"
                    onInput=onInput
                    onFocus=onFocus
                    onBlur=onBlur
                    value=value
                    type=type
                    disabled=disabled
                    placeholder=placeholder
                    error=text
                    name=name
            }}}
            <span class="input-label">{{label}}</span>
            
            {{{UnderlinedInputError ref=innerRef text=error}}}
        </label>
    `;
  }
}
