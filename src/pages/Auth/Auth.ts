import Block from 'core/Block';
import './style.css';
import { validateForm, ValidateRule } from '../../utils/validateForm';

export class Auth extends Block {
  static componentName = 'Auth';

  constructor() {
    super();
    this.state = {
      login: '',
      password: '',
    };

    this.setProps({
      onSubmit: this.onSubmit.bind(this),
      onInput: (e: InputEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        Object.keys(this.state).forEach(key => {
          this.refs?.[`${key}InputRef`].refs.errorRef?.setProps({
            text: '',
          });
        });
        this.setState({
          [input.name]: input.value,
        });
      },
      onFocus: () => null,
      errorMessage: '',
    });
  }

  onSubmit(): void {
    const rules = Object.entries(this.state).map(
      ([key, value]) => ({ type: key, value } as ValidateRule),
    );
    const { error, isValid } = validateForm(rules);

    Object.entries(error).forEach(([key, value]) => {
      this.refs?.[`${key}InputRef`].refs.errorRef?.setProps({
        text: value,
      });
    });

    if (isValid) {
      console.log(this.state);
    }
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="container">
            <div class="auth-page">
                <form class="auth-page__top">
                    {{{ PageTitle title="Вход"}}}
                    {{{ UnderlinedInputController
                            ref="loginInputRef"
                            innerRef="errorRef"
                            onInput=onInput
                            onFocus=onFocus
                            name="login" 
                            label="Логин" 
                            type="text"
                    }}}
                    {{{ UnderlinedInputController
                            ref="passwordInputRef"
                            innerRef="errorRef"
                            onInput=onInput
                            onFocus=onFocus
                            name="password" 
                            label="Пароль" 
                            type="password"
                    }}}
                </form>
                <div class="auth-page__bottom">
                    
                    {{{ Button onClick=onSubmit 
                               style="primary fill" 
                               label="Авторизоваться"
                               type="submit"
                    }}}
                    {{{ Link text="Нет аккаунта?" href="#"}}}
                </div>
            </div>
        </div>
    `;
  }
}
