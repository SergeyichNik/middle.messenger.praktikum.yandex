export interface AvatarPickerProps {
  src?: string;
  hoverText?: string;
  editMode: boolean;
  onClick: (isEnable: boolean) => void;
}

export interface ClassAvatarPickerProps extends Omit<AvatarPickerProps, 'onClick'> {
  events: {
    click: () => void;
  };
}
