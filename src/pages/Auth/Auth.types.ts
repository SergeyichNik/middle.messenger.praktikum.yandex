import { SignInModel } from '../../api/authApi';

export interface AuthProps {
  signIn?: (model: SignInModel) => void;
  onSubmit: () => void;
  onInput: (e: InputEvent) => void;
  errorMessage: string;
}

export interface ClassAuthProps extends AuthProps {}
