import Block from 'core/Block';
import './style.css';
import { validateForm, ValidateRule } from 'utils/validateForm';
import { defaultPassword, defaultUser } from './constants';

export class Profile extends Block {
  static componentName = 'Profile';

  constructor() {
    super();
    this.state = {
      user: {
        email: '',
        login: '',
        display_name: '',
        first_name: '',
        second_name: '',
        phone: '',
      },
      password: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      },
    };
    this.setProps({
      ...defaultUser,
      ...defaultPassword,
      dataAttributeValue: '',
      editProfileMode: 'disabled',
      onSubmit: this.onSubmit.bind(this),

      onInput: (e: InputEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        const currentKey = this.props.dataAttributeValue;

        Object.keys(this.state[currentKey]).forEach(key => {
          this.refs?.[`${key}InputRef`].refs?.errorRef?.setProps({
            text: '',
          });
        });
        this.setState({
          [currentKey]: {
            ...this.state[currentKey],
            [input.name]: input.value,
          },
        });
      },
      onFocus: () => null,
      editPasswordMode: false,
      editMode: false,
      onSetEditProfileMode: this.onSetEditProfileMode.bind(this),
      onSetEditPasswordMode: this.onSetEditPasswordMode.bind(this),
      onEndWithoutSave: this.onEndWithoutSave.bind(this),
      onSaveChanges: this.onSaveChanges.bind(this),
    });
  }

  onSubmit(currentKey: string): void {
    const rules = Object.entries(this.state[currentKey]).map(
      ([key, value]) =>
        ({
          type: key,
          value,
        } as ValidateRule),
    );

    const { error, isValid } = validateForm(rules);

    Object.entries(error).forEach(([key, value]) => {
      this.refs?.[`${key}InputRef`].refs.errorRef?.setProps({
        text: value,
      });
    });

    if (isValid) {
      console.log('Submitted!', this.state[currentKey]);
      this.setProps({
        editProfileMode: 'disabled',
        editPasswordMode: false,
        editMode: false,
      });
    }
  }

  onSetEditProfileMode(): void {
    this.setState({
      user: {
        ...defaultUser,
      },
    });
    this.setProps({
      dataAttributeValue: 'user',
      editProfileMode: '',
      editMode: true,
    });
  }

  onSetEditPasswordMode(): void {
    this.setState({
      password: {
        ...defaultPassword,
      },
    });
    this.setProps({
      dataAttributeValue: 'password',
      editPasswordMode: true,
      editMode: true,
    });
  }

  onSaveChanges(e: MouseEvent): void {
    const target = e.currentTarget as HTMLButtonElement;

    if (!target.dataset.submit) {
      return;
    }
    this.onSubmit(target.dataset.submit);
  }

  onEndWithoutSave(): void {
    this.setProps({
      editProfileMode: 'disabled',
      editPasswordMode: false,
      editMode: false,
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="container">
            <div class="profile">
                <div class="profile-header">
                    <div class="back-button">
                        {{{ Button onClick=onEndWithoutSave 
                                   style="primary round" 
                                   iconType="chevron-left-icon" 
                                   iconLeft=true
                        }}}
                    </div>
                    {{{ AvatarPicker hoverText="Сменить фото" }}}
                    <p class="profile-name">{{login}}</p>
                </div>
                <div class="profile-user-info-form">
                    {{#if editPasswordMode}}
                        {{{ UnderlinedInputController value=oldPassword
                                                      label="Старый пароль"
                                                      type="password"
                                                      name="oldPassword"
                                                      ref="oldPasswordInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                        {{{ UnderlinedInputController label="Новый пароль"
                                                      type="password"
                                                      name="newPassword"
                                                      ref="newPasswordInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                        {{{ UnderlinedInputController label="Повторите новый пароль"
                                                      type="password"
                                                      name="newPasswordConfirm"
                                                      ref="newPasswordConfirmInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                    {{else}}
                        {{{ UnderlinedInputController value=email
                                                      disabled=editProfileMode
                                                      label="Почта"
                                                      type="text"
                                                      name="email"
                                                      ref="emailInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                        {{{ UnderlinedInputController value=login
                                                      disabled=editProfileMode
                                                      label="Логин"
                                                      type="text"
                                                      name="login"
                                                      ref="loginInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                        {{{ UnderlinedInputController value=login
                                                      disabled=editProfileMode
                                                      label="Имя в чате"
                                                      type="text"
                                                      name="display_name"
                                                      ref="display_nameInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                        {{{ UnderlinedInputController value=first_name
                                                      disabled=editProfileMode
                                                      label="Имя"
                                                      type="text"
                                                      name="first_name"
                                                      ref="first_nameInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                        {{{ UnderlinedInputController value=second_name
                                                      disabled=editProfileMode
                                                      label="Фамилия"
                                                      type="text"
                                                      name="second_name"
                                                      ref="second_nameInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                        {{{ UnderlinedInputController value=phone
                                                      disabled=editProfileMode
                                                      label="Телефон"
                                                      type="text"
                                                      name="phone"
                                                      ref="phoneInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus

                        }}}
                    {{/if}}
                </div>
                {{#if editMode}}
                    <div class="profile-buttons__save">
                        {{{ Button onClick=onSaveChanges
                                   label="Сохранить"
                                   dataAttribute="submit"
                                   dataAttributeValue=dataAttributeValue
                                   style="primary button-size__medium"
                        }}}
                    </div>
                {{else}}
                    <div class="profile-buttons">
                        {{{ Button onClick=onSetEditProfileMode
                                   label="Изменить данные"
                                   style="text"
                        }}}
                        {{{ Button onClick=onSetEditPasswordMode
                                   label="Изменить пароль"
                                   style="text"
                        }}}
                        {{{ Button label="Выйти" style="text"}}}
                    </div>
                {{/if}}

            </div>
        </div>
    `;
  }
}
