import Block from 'core/Block';
import './style.css';
import { ClassProfileProps, ProfilePath, ProfileProps } from './Profile.types';
import { connect, MapDispatchToProps, MapStateToProps } from '../../lib/utils/connect';
import { AppState, UserPassword } from '../../store/rootStore';
import { withRouter } from '../../lib/utils/withRouter';
import { logout, passwordChangesSave, profileChangesSave, userAvatarChange } from 'store/thunks';
import { router } from '../../core/Router';
import { Routes } from '../../router/initRouter';

import { UserProfileInfo } from '../../api/userApi';
import { validateForm, ValidateRule } from '../../lib/utils/validateForm';

class ProfileContainer extends Block<Partial<ClassProfileProps>> {
  static componentName = 'Profile';

  constructor(props: Partial<ProfileProps>) {
    super(props);
    this.state = {
      user: {
        email: this.props.user?.email,
        login: this.props.user?.login,
        display_name: this.props.user?.display_name,
        first_name: this.props.user?.first_name,
        second_name: this.props.user?.second_name,
        phone: this.props.user?.phone,
      },
      password: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      },
    };
    this.setProps({
      dataAttributeValue: this.props.route?.path,
      editProfileMode: this.props.route?.path === 'user' ? '' : 'disabled',
      onSubmit: this.onSubmit.bind(this),
      onInput: (e: InputEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        const currentKey = this.props.dataAttributeValue;
        if (currentKey) {
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
        }
      },
      editAvatarMode: false,
      editPasswordMode: this.props.route?.path === 'password',
      disableAvatarEditMode: this.disableAvatarEditMode.bind(this),
      enableAvatarEditMode: this.enableAvatarEditMode.bind(this),
      editMode: !!this.props.route?.path,
      onSetEditProfileMode: this.onSetEditProfileMode.bind(this),
      onSetEditPasswordMode: this.onSetEditPasswordMode.bind(this),
      onEndWithoutSave: this.onEndWithoutSave.bind(this),
      onSaveChanges: this.onSaveChanges.bind(this),
    });
  }

  onSubmit(currentKey: ProfilePath): void {
    const data = this.state[currentKey];

    const rules = Object.entries(data).map(
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
      if (currentKey === 'user') {
        if (this.props?.profileChangesSave) {
          this.props?.profileChangesSave({
            display_name: data.display_name,
            email: data.email,
            first_name: data.first_name,
            login: data.login,
            phone: data.phone,
            second_name: data.second_name,
          });
        }
      }
      if (currentKey === 'password') {
        if (this.props.passwordChangesSave) {
          this.props.passwordChangesSave({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
          });
        }
      }
    }
  }

  onSetEditProfileMode(): void {
    router.navigate(Routes.PROFILE_EDIT_USER_INFO);
  }

  onSetEditPasswordMode(): void {
    router.navigate(Routes.PROFILE_CHANGE_USER_PASSWORD);
  }

  enableAvatarEditMode = (): void => {
    this.setProps({
      editAvatarMode: true,
    });
  };

  disableAvatarEditMode = (): void => {
    this.setProps({
      editAvatarMode: false,
    });
  };

  onSaveChanges(e: MouseEvent): void {
    const target = e.currentTarget as HTMLButtonElement;

    if (!target.dataset.submit) {
      return;
    }
    this.onSubmit(target.dataset.submit as ProfilePath);
  }

  onEndWithoutSave(): void {
    if (this.props.route?.path) {
      router.navigate(Routes.PROFILE);
    } else {
      router.navigate(Routes.CHAT);
    }
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="container">
            {{#if editAvatarMode}}
               
                {{{ ModalAvatarPicker onCloseModal=disableAvatarEditMode avatarChange=userAvatarChange }}}

            {{/if}}
            <div class="profile">
                <div class="profile-header">
                    <div class="back-button">
                        {{{ Button onClick=onEndWithoutSave
                                   style="primary round"
                                   iconType="chevron-left-icon"
                                   iconLeft=true
                        }}}
                    </div>
                    {{{ AvatarPicker onClick=enableAvatarEditMode src=user.avatar hoverText="Сменить фото" }}}
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
                        {{{ UnderlinedInputController value=user.email
                                                      disabled=editProfileMode
                                                      label="Почта"
                                                      type="text"
                                                      name="email"
                                                      ref="emailInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                        {{{ UnderlinedInputController value=user.login
                                                      disabled=editProfileMode
                                                      label="Логин"
                                                      type="text"
                                                      name="login"
                                                      ref="loginInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                        {{{ UnderlinedInputController value=user.display_name
                                                      disabled=editProfileMode
                                                      label="Имя в чате"
                                                      type="text"
                                                      name="display_name"
                                                      ref="display_nameInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                        {{{ UnderlinedInputController value=user.first_name
                                                      disabled=editProfileMode
                                                      label="Имя"
                                                      type="text"
                                                      name="first_name"
                                                      ref="first_nameInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                        {{{ UnderlinedInputController value=user.second_name
                                                      disabled=editProfileMode
                                                      label="Фамилия"
                                                      type="text"
                                                      name="second_name"
                                                      ref="second_nameInputRef"
                                                      innerRef="errorRef"
                                                      onInput=onInput
                                                      onFocus=onFocus
                        }}}
                        {{{ UnderlinedInputController value=user.phone
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
                        {{{ Button label="Выйти" onClick=logout style="text"}}}
                    </div>
                {{/if}}

            </div>
        </div>
    `;
  }
}

const mapStateToProps: MapStateToProps<AppState> = state => {
  return {
    user: state.user,
    status: state.status,
  };
};

const mapDispatchToProps: MapDispatchToProps<AppState> = dispatch => {
  return {
    logout: () => dispatch(logout()),
    profileChangesSave: (model: UserProfileInfo) => dispatch(profileChangesSave(model)),
    passwordChangesSave: (model: UserPassword) => dispatch(passwordChangesSave(model)),
    userAvatarChange: (data: FormData, cb: () => void) => dispatch(userAvatarChange(data, cb)),
  };
};

// @ts-expect-error
export const Profile = connect(withRouter(ProfileContainer), mapStateToProps, mapDispatchToProps);
