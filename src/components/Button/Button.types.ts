export interface ButtonProps {
  iconLeft?: string;
  iconType?: string;
  iconRight?: string;
  style?: string;
  type?: string;
  label?: string;
  dataAttribute?: string;
  dataAttributeValue?: string;
  name?: string;
  onClick?: () => void;
}

export interface ClassButtonProps extends Omit<ButtonProps, 'onClick'> {
  events?: {
    click?: () => void;
  };
}
