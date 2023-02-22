import { Block } from 'core/Block';
import './style.css';
import { ModalCreateChatProps } from './ModalCreateChat.types';

export class ModalCreateChat extends Block {
  static componentName = 'ModalCreateChat';

  constructor({ ...props }: ModalCreateChatProps) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          props.createChat(this.state.chatName, () => props.closeModal());
        },
        click: (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'DIV') {
            props.closeModal();
          }
        },
      },
    });
    this.state = {
      chatName: '',
    };
    this.setProps({
      onInput: this.onInput.bind(this),
    });
  }

  onInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement;
    this.setState({
      chatName: target.value,
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="modal" data-container="close">
            <div class="container">
                <form class="modal-container mat">
                    {{{ PTag value="Введите название чата" }}}
                    {{{ FilledInput onInput=onInput value=chatName placeholder="Название..." }}}
                    {{{ Button type="submit" onClick=onSaveNewAvatar style="primary button-size__medium"
                               label="Создать" }}}
                </form>
            </div>
        </div>
    `;
  }
}
