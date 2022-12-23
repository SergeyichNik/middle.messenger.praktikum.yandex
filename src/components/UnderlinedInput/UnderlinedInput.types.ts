export interface UnderlinedInputProps {
  label?: string;
  disabled?: string;
  required?: string;
  error?: string;
  placeholder?: string;
  onInput?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  value?: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'tel';
}

export interface UnderlinedInputControllerProps {
  label?: string;
  disabled?: string;
  innerRef?: string;
  placeholder?: string;
  onInput?: () => void;
  onFocus?: () => void;
  value?: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'tel';
}
