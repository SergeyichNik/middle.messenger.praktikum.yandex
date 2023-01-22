import { SignInModel } from '../../api/authApi';
import { AppStatus, UserPassword } from '../../store/rootStore';
import { UserProfileInfo } from '../../api/userApi';

export type ProfilePath = 'user' | 'password' | '';

interface RouteParams {
  parent: string;
  path: ProfilePath;
}

export interface ProfileProps {
  onSubmit: (currentKey: ProfilePath) => void;
  onInput: (e: InputEvent) => void;
  route: RouteParams;
  dataAttributeValue: ProfilePath;
  editAvatarMode: boolean;
  editProfileMode: 'disabled' | '';
  editPasswordMode: boolean;
  editMode: boolean;
  disableAvatarEditMode: () => void;
  enableAvatarEditMode: () => void;
  onSetEditProfileMode: () => void;
  onSetEditPasswordMode: () => void;
  onEndWithoutSave: () => void;
  onSaveChanges: (e: MouseEvent) => void;
  onSaveNewAvatar: () => void;
  user: UserProfileInfo;
  status: AppStatus;
  logout?: (model: SignInModel) => void;
  profileChangesSave: (model: UserProfileInfo) => void;
  passwordChangesSave: (model: UserPassword) => void;
  userAvatarChange: (data: FormData, cb: () => void) => void;
}

export interface ClassProfileProps extends ProfileProps {}
