export interface UnderlinedInputProps {
  label: string;
  disabled: boolean;
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
  label: string;
  disabled: boolean;
  innerRef: string;
  placeholder?: string;
  onInput?: () => void;
  onFocus?: () => void;
  value?: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'tel';
}
