import Block from 'core/Block';
import './style.css';
import { withRouter } from '../../lib/utils/withRouter';
import { connect, MapDispatchToProps, MapStateToProps } from '../../lib/utils/connect';
import { AppState } from '../../store/rootStore';
import { createChat, removeChat } from 'store/thunks';

class ChatContainer extends Block {
  static componentName = 'Chat';

  constructor(props: any) {
    super({ ...props });
    this.state = {
      message: {
        text: '',
      },
    };
    this.setProps({
      onCloseCreateChatModal: this.onCloseCreateChatModal.bind(this),
      onOpenCreateChatModal: this.onOpenCreateChatModal.bind(this),
      onInput: this.onInput.bind(this),
      onSend: this.onSend.bind(this),
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

  onInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement;

    this.setState({
      message: {
        text: target.value,
      },
    });
  }

  onSend(): void {
    // if (this.state.message.text) {
    //   const date = new Date();
    //   console.log(this.state.message);
    //   // const getMessage = (position: 'left' | 'right', content: string): Message => {
    //   //   return {
    //   //     content,
    //   //     time: `${date.getHours()}:${date.getMinutes()}`,
    //   //     owner: position,
    //   //   };
    //   // };
    //
    //   this.setProps({
    //     mockMessages: [getMessage('right', this.state.message.text), ...this.props.mockMessages],
    //   });
    //   this.setState({
    //     message: {
    //       text: '',
    //     },
    //   });
    //   setTimeout(() => {
    //     this.setProps({
    //       mockMessages: [getMessage('left', 'Привет!'), ...this.props.mockMessages],
    //     });
    //   }, 1000);
    // }
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="chat-main-container">
            {{#if createChatMode}}
                {{{ ModalCreateChat createChat=createChat closeModal=onCloseCreateChatModal }}}
            {{/if}}
            {{{ ChatList onOpenCreateChatModal=onOpenCreateChatModal data=chats}}}
            <div class="right-part">
                {{#if selectedChat}}
                    
                    {{{ SelectedChatHeader }}}
                    
                    <div class="message-display-area">
                        {{#each mockMessages}}
                            {{{ChatMessage content=this.content time=this.time position=this.owner}}}
                        {{/each}}
                    </div>

                    <div class="message-create-area">
                        {{{ Button type="button" style="text round" iconLeft=true iconType= "attach-icon"}}}
                        {{{ Button type="button" style="text round" iconLeft=true iconType= "smile-icon"}}}
                        <div class="message-create-area__input">
                            {{{ FilledInput onInput=onInput name="message" placeholder='Cообшение...' style="round" }}}
                        </div>
                        {{{ Button onClick=onSend type="button" style="primary round" iconLeft=true
                                   iconType= "send-icon"}}}
                    </div>
                {{else}}

                    {{{ PTag value="Выберите чат чтобы отправить сообщение" style="p-tag__medium p-tag__gray" }}}

                {{/if}}
            </div>
        </div>
    `;
  }
}

const mapStateToProps: MapStateToProps<AppState> = state => {
  return {
    user: state.user,
    status: state.status,
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
