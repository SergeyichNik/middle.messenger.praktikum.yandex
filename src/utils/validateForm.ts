export enum ValidateRuleType {
  Login = 'login',
  Password = 'password',
}

interface ValidateRule {
  value: string;
  type: ValidateRuleType;
}

interface ErrorMessageType {
  errorMessage: string;
}

export const validateForm = (rules: ValidateRule[]): ErrorMessageType => {
  let errorMessage = '';

  rules.forEach(({ value, type }) => {
    if (type === ValidateRuleType.Login) {
      if (value.length === 0) {
        errorMessage = 'Login can not be empty';
      } else if (value.length < 4) {
        errorMessage = 'Login should contains more than 3 letters';
      }
    }
  });

  return { errorMessage };
};
