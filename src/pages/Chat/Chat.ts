import { Block } from 'core/Block';
import './style.css';
import { withRouter } from '../../lib/utils/withRouter';
import { connect, MapDispatchToProps, MapStateToProps } from '../../lib/utils/connect';
import { AppState } from '../../store/rootStore';
import { createChat, removeChat } from 'store/thunks';

class ChatContainer extends Block {
  static componentName = 'Chat';

  constructor(props: any) {
    super({ ...props });
    this.setProps({
      onCloseCreateChatModal: this.onCloseCreateChatModal.bind(this),
      onOpenCreateChatModal: this.onOpenCreateChatModal.bind(this),
      createChatMode: '',
    });
  }

  onCloseCreateChatModal = (): void => {
    this.setProps({
      createChatMode: false,
    });
  };

  onOpenCreateChatModal = (): void => {
    this.setProps({
      createChatMode: true,
    });
  };

  protected render(): string {
    // language=hbs
    return `
        <div class="chat-main-container">
          
            {{#if createChatMode}}
                {{{ ModalCreateChat createChat=createChat closeModal=onCloseCreateChatModal }}}
            {{/if}}
            {{{ ChatList onOpenCreateChatModal=onOpenCreateChatModal data=chats}}}
            <div class="right-part">
              {{#if isLoading}}
                <span>Loading...</span>
              {{else}}
                {{#if selectedChat}}

                  {{{ ActiveChatArea }}}

                {{else}}

                  {{{ PTag value="Выберите чат чтобы отправить сообщение" style="p-tag__medium p-tag__gray" }}}

                {{/if}}
              {{/if}}
                
            </div>
        </div>
    `;
  }
}

const mapStateToProps: MapStateToProps<AppState> = state => {
  return {
    isLoading: state.isLoading,
    chats: state.chats,
    selectedChat: state.selectedChat,
  };
};

const mapDispatchToProps: MapDispatchToProps = dispatch => {
  return {
    removeChat: (id: number) => dispatch(removeChat(id)),
    createChat: (title: string, cb: () => void) => dispatch(createChat(title, cb)),
  };
};

export const Chat = connect(withRouter(ChatContainer), mapStateToProps, mapDispatchToProps);
