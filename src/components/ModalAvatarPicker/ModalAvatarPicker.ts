import Block from 'core/Block';
import './style.css';
import { ClassModalAvatarPickerProps, ModalAvatarPickerProps } from './ModalAvatarPicker.types';

export class ModalAvatarPicker extends Block<Partial<ClassModalAvatarPickerProps>> {
  static componentName = 'ModalAvatarPicker';

  constructor({ ...props }: ModalAvatarPickerProps) {
    super({
      ...props,
      events: {
        change: e => {
          const target = e.target as HTMLInputElement;
          if (target.files && target.files.length > 0) {
            this.setProps({
              file: target.files[0],
              fileName: target.files[0].name,
            });
          }
        },
        submit: e => {
          e.preventDefault();

          const formData = new FormData();
          if (this.props.file) {
            formData.append('avatar', this.props.file);
            props.avatarChange(formData, props.onCloseModal);
          }
        },
        click: (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'DIV') {
            props.onCloseModal();
          }
        },
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `

        <div class="modal" data-container="close">
            <div class="container">
                <form class="modal-container mat">
                    {{{ PTag value="Загрузите файл" }}}
                    <label class="modal-container__file-picker">
                        <span>Выберите файл</span>
                        {{#if fileName}}
                            <span class="file-picker__fileName">{{fileName}}</span>
                        {{/if}}
                        <input id="avatar" name="avatar" hidden type="file" />
                    </label>
                    {{{ Button type="submit" onClick=onSaveNewAvatar style="primary button-size__medium"
                               label="Сменить аватар" }}}
                </form>
            </div>
        </div>

    `;
  }
}
