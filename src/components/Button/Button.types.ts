export interface ButtonProps {
  iconLeft?: string;
  iconType?: string;
  iconRight?: string;
  style?: string;
  type?: string;
  label?: string;
  disabled?: boolean;
  dataAttribute?: string;
  dataAttributeValue?: string;
  name?: string;
  onClick?: () => void;
}

export interface ClassButtonProps extends ButtonProps {
  events?: {
    click?: () => void;
  };
}
