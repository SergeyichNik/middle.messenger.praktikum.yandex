export interface ModalAvatarPickerProps {
  avatarChange: (data: FormData, cb: () => void) => void;
  onCloseModal: () => void;
  file: Blob;
  fileName: string;
}

export interface ClassModalAvatarPickerProps
  extends Omit<ModalAvatarPickerProps, 'avatarChange' | 'enableAvatarEditMode'> {
  events: {
    submit: (e: InputEvent) => void;
    change: (e: InputEvent) => void;
    click: (e: MouseEvent) => void;
  };
}
