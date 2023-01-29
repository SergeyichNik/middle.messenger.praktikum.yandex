import Block from 'core/Block';
import './style.css';
import { AvatarPickerProps, ClassAvatarPickerProps } from './AvatarPicker.types';
import { BASE_API } from '../../api/config';

export class AvatarPicker extends Block<ClassAvatarPickerProps> {
  static componentName = 'AvatarPicker';

  constructor({ ...props }: AvatarPickerProps) {
    super({
      ...props,
      events: {
        click: () => props.onClick(true),
      },
    });
  }

  protected render(): string {
    const avatar = this.props.src ? `${BASE_API}resources/${String(this.props.src)}` : '';
    // language=hbs
    return `
        <label class="avatar-picker">
            <div class="avatar-picker-modal"></div>
            <input {{disabled}} src="${avatar}" name="avatar" type="image" alt="avatar"/>
            <span class="avatar-picker-hover-layer">{{hoverText}}</span>
        </label>
    `;
  }
}
