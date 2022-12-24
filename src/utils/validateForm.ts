export type ValidateRuleType =
  | 'phone'
  | 'email'
  | 'login'
  | 'display_name'
  | 'password'
  | 'password_confirm'
  | 'oldPassword'
  | 'newPassword'
  | 'newPasswordConfirm'
  | 'first_name'
  | 'second_name'
  | 'message';

const PHONE_PATTERN = /^(\+|\d)?\d{10,14}$/;
const EMAIL_PATTERN =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
const NAME_PATTERN = /^[A-ZА-Я][A-ZА-Яa-za-я-]+$/;
const NON_NUMERIC_PATTERN = /^\d+$/;
const LOGIN_PATTERN = /^[a-zA-Z\d_-]+$/;
const PASSWORD_PATTERN = /^.*[A-Z][.\d].*$/;

export interface ValidateRule {
  value: string;
  type: ValidateRuleType;
}

interface ReturnValidate {
  error: Record<string, string>;
  isValid: boolean;
}

export const validateForm = (rules: ValidateRule[]): ReturnValidate => {
  const error: Record<string, string> = {};

  rules.forEach(({ value, type }) => {
    if (type === 'login') {
      if (value?.length === 0) {
        error[type] = 'Login can not be empty';
      } else if (value?.length < 4) {
        error[type] = 'Login should contains more than 3 letters';
      } else if (value?.length > 20) {
        error[type] = 'Login should contains no more than 20 letters';
      } else if (!LOGIN_PATTERN.test(value) || NON_NUMERIC_PATTERN.test(value)) {
        error[type] = 'Login can contain Latin letters, numbers, dashes and underscores';
      } else {
        error[type] = '';
      }
    }
    if (
      type === 'password' ||
      type === 'password_confirm' ||
      type === 'oldPassword' ||
      type === 'newPassword' ||
      type === 'newPasswordConfirm'
    ) {
      if (value?.length === 0) {
        error[type] = 'Password can not be empty';
      } else if (value?.length < 8) {
        error[type] = 'Password should contains more than 7 letters';
      } else if (value?.length > 40) {
        error[type] = 'Password should contains no more than 40 letters';
      } else if (!PASSWORD_PATTERN.test(value)) {
        error[type] = 'Password must contain at least one uppercase letter and a number';
      } else {
        error[type] = '';
      }
    }
    if (type === 'email') {
      if (!EMAIL_PATTERN.test(value)) {
        error[type] = 'Invalid email format';
      }
    }
    if (type === 'phone') {
      if (!PHONE_PATTERN.test(value)) {
        error[type] = 'Phone must contains 10 to 15 digits';
      }
    }
    if (type === 'first_name' || type === 'second_name') {
      if (value?.length === 0) {
        error[type] = 'Field can not be empty';
      } else if (value?.length < 4) {
        error[type] = 'Field should contains more than 3 letters';
      } else if (!NAME_PATTERN.test(value)) {
        error[type] = 'Field must contain Latin or Cyrillic, the first letter must be capitalized';
      }
    }
    if (type === 'message') {
      if (value?.length === 0) {
        error[type] = 'Empty message';
      }
    }
  });

  const isValid = Object.values(error).every(error => !error);

  return { error, isValid };
};
