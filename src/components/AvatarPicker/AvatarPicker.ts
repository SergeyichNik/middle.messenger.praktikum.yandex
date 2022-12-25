import Block from 'core/Block';
import './style.css';
import { AvatarPickerProps, ClassAvatarPickerProps } from './AvatarPicker.types';

export class AvatarPicker extends Block<ClassAvatarPickerProps> {
  static componentName = 'AvatarPicker';

  constructor({ ...props }: AvatarPickerProps) {
    super({ ...props });
  }

  protected render(): string {
    // language=hbs
    return `
        <label class="avatar-picker">
            <input {{disabled}} name="avatar" type="image" alt="avatar"/>
            <span class="avatar-picker-hover-layer">{{hoverText}}</span>
        </label>
    `;
  }
}
