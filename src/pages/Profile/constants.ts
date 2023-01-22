export interface DefaultUser {
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  phone: string;
  login: string;
}

export interface DefaultPassword {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export const defaultUser: DefaultUser = {
  first_name: 'Chair',
  second_name: 'Sofa',
  display_name: 'Table',
  email: 'mychat@chat.my',
  phone: '+765432154321',
  login: 'Table',
};

export const defaultPassword: DefaultPassword = {
  oldPassword: 'V6seestyorki',
  newPassword: '',
  newPasswordConfirm: '',
};
