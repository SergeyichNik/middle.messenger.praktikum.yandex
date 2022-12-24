export interface FilledInputProps {
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
