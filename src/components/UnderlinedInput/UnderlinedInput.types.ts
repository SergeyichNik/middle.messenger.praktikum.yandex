import { ValidateRuleType } from '../../utils/validateForm';

export interface UnderlinedInputProps {
  label?: string;
  disabled?: string;
  required?: string;
  error?: string;
  placeholder?: string;
  onInput?: () => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: () => void;
  value?: string;
  name: ValidateRuleType;
  type?: 'text' | 'email' | 'password' | 'tel';
}

export interface ClassUnderlinedInputProps
  extends Omit<UnderlinedInputProps, 'onInput' | 'onBlur' | 'onFocus'> {
  events?: {
    input?: () => void;
    focus?: () => void;
    blur?: (e: FocusEvent) => void;
  };
}

export interface ErrorInstanceProps {
  text: string;
}
