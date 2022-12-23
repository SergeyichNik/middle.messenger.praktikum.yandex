import Block from 'core/Block';
import './style.css';
import { validateForm } from '../../utils/validateForm';

export class Registration extends Block {
  static componentName = 'Registration';

  constructor() {
    super();
    this.state = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      password: '',
      password_confirm: '',
    };

    this.setProps({
      onSubmit: this.onSubmit.bind(this),

      onInput: (e: InputEvent) => {
        const input = e.currentTarget as HTMLInputElement;

        Object.keys(this.state).forEach(key => {
          // @ts-expect-error
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
    const { error, isValid } = validateForm([
      {
        type: 'email',
        value: this.state.email,
      },
      {
        type: 'login',
        value: this.state.login,
      },
      {
        type: 'first_name',
        value: this.state.first_name,
      },
      {
        type: 'second_name',
        value: this.state.second_name,
      },
      {
        type: 'phone',
        value: this.state.phone,
      },
      {
        type: 'password',
        value: this.state.password,
      },
      {
        type: 'password_confirm',
        value: this.state.password_confirm,
      },
    ]);

    Object.entries(error).forEach(([key, value]) => {
      // @ts-expect-error
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
            <div class="registration-page">
                <form class="registration-page__top">
                    {{{ PageTitle title="Регистрация"}}}
                    {{{ UnderlinedInputController onInput=onInput 
                                                  onFocus=onFocus 
                                                  innerRef="errorRef" 
                                                  ref="emailInputRef" 
                                                  name="email" 
                                                  label="Почта" 
                                                  type="text"
                    }}}
                    {{{ UnderlinedInputController onInput=onInput 
                                                  onFocus=onFocus 
                                                  innerRef="errorRef" 
                                                  ref="loginInputRef" 
                                                  name="login" 
                                                  label="Логин" 
                                                  type="text"
                    }}}
                    {{{ UnderlinedInputController onInput=onInput 
                                                  onFocus=onFocus 
                                                  innerRef="errorRef" 
                                                  ref="first_nameInputRef" 
                                                  name="first_name" 
                                                  label="Имя" 
                                                  type="text"
                    }}}
                    {{{ UnderlinedInputController onInput=onInput 
                                                  onFocus=onFocus 
                                                  innerRef="errorRef" 
                                                  ref="second_nameInputRef" 
                                                  name="second_name" 
                                                  label="Фамилия" 
                                                  type="text"
                    }}}
                    {{{ UnderlinedInputController onInput=onInput 
                                                  onFocus=onFocus 
                                                  innerRef="errorRef" 
                                                  ref="phoneInputRef" 
                                                  name="phone" 
                                                  label="Телефон" 
                                                  type="tel"
                    }}}
                    {{{ UnderlinedInputController onInput=onInput 
                                                  onFocus=onFocus 
                                                  innerRef="errorRef" 
                                                  ref="passwordInputRef" 
                                                  name="password" 
                                                  label="Пароль" 
                                                  type="password"
                    }}}
                    {{{ UnderlinedInputController onInput=onInput 
                                                  onFocus=onFocus 
                                                  innerRef="errorRef" 
                                                  ref="password_confirmInputRef"
                                                  name="password_confirm" 
                                                  label="Подтердить пароль" 
                                                  type="password"}}}
                </form>
                <div class="registration-page__bottom">
                    {{{ Button style="primary fill" 
                               label="Зарегестрироваться"
                               onClick=onSubmit
                               type="submit"
                    }}}
                    {{{ Link text="Войти" href="#"}}}
                </div>
            </div>
        </div>
    `;
  }
}
