import Block from 'core/Block';
import './style.css';
import { validateForm, ValidateRule } from '../../utils/validateForm';
import { connect, MapDispatchToProps, MapStateToProps } from '../../lib/utils/connect';
import { withRouter } from '../../lib/utils/withRouter';
import { SignUpModel } from '../../api/authApi';
import { signIn } from 'store/thunks';
import { AppState } from 'store/rootStore';
import { AuthProps, ClassAuthProps } from './Auth.types';
import { logger } from '../../utils/logger';

class AuthContainer extends Block<ClassAuthProps> {
  static componentName = 'Auth';

  constructor(props: AuthProps) {
    super(props);
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
      errorMessage: '',
    });
  }

  componentDidMount(props: ClassAuthProps): void {
    logger('did mount');
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
      if (this.props.signIn) {
        this.props.signIn({
          login: this.state.login,
          password: this.state.password,
        });
      }
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
                    {{{ Link text="Нет аккаунта?" linkTo="/sign-up"}}}
                </div>
            </div>
        </div>
    `;
  }
}

const mapStateToProps: MapStateToProps<AppState> = state => {
  return {
    status: state.status,
  };
};

const mapDispatchToProps: MapDispatchToProps<AppState> = dispatch => {
  return {
    signIn: (model: SignUpModel) => dispatch(signIn(model)),
  };
};

// @ts-expect-error
export const Auth = connect(withRouter(AuthContainer), mapStateToProps, mapDispatchToProps);
