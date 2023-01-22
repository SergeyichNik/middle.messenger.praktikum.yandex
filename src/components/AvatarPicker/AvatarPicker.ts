import Block from 'core/Block';
import './style.css';
import { AvatarPickerProps, ClassAvatarPickerProps } from './AvatarPicker.types';

const apiResources = 'https://ya-praktikum.tech/api/v2/resources';

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
    // language=hbs
    return `
        <label class="avatar-picker">
            <div class="avatar-picker-modal"></div>
            <input {{disabled}}
                    {{#if src}}
                    src=${apiResources + String(this.props.src)}
                    {{/if}}
                    name="avatar" type="image" alt="avatar"/>
            <span class="avatar-picker-hover-layer">{{hoverText}}</span>
        </label>
    `;
  }
}
