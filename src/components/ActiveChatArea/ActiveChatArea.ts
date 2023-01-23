import Block from 'core/Block';
import './style.css';
import { ActiveChatAreaProps, ClassActiveChatAreaProps, WsMessage } from './ActiveChatArea.types';
import { connect, MapStateToProps } from '../../lib/utils/connect';
import { AppState } from '../../store/rootStore';

const wsApi = 'wss://ya-praktikum.tech/ws/chats/';

class ActiveChatAreaContainer extends Block<Partial<ClassActiveChatAreaProps>> {
  static componentName = 'ActiveChatArea';

  constructor({ ...props }: ActiveChatAreaProps) {
    super({ ...props });
    this.state = {
      content: '',
    };
    this.setProps({
      ws: undefined,
      isConnected: false,
      onSend: this.onSend.bind(this),
      messages: [],
      onInput: this.onInput.bind(this),
    });
  }

  componentDidMount(props: Partial<ClassActiveChatAreaProps>): void {
    if (
      this.props.activeChatToken &&
      this.props.userId &&
      this.props.selectedChat &&
      !this.state.connected
    ) {
      const {
        activeChatToken,
        userId,
        selectedChat: { id },
      } = this.props;
      const webSocket = new WebSocket(`${wsApi}/${userId}/${id}/${activeChatToken}`);
      webSocket.onopen = () => {
        webSocket.send(
          JSON.stringify({
            content: '0',
            type: 'get old',
          }),
        );
        this.setProps({
          isConnected: true,
          ws: webSocket,
        });
      };

      webSocket.onmessage = event => {
        const data = JSON.parse(event.data);
        const oldMessages = this.props.messages as WsMessage[];
        if (Array.isArray(data)) {
          this.setProps({
            messages: [...oldMessages, ...data],
          });
        } else {
          this.setProps({
            messages: [data, ...oldMessages],
          });
        }
      };

      webSocket.onclose = () => {
        this.setProps({
          isConnected: false,
        });
      };
    }
  }

  onSend = (): void => {
    if (this.state.content) {
      this.props.ws?.send(
        JSON.stringify({
          content: this.state.content,
          type: 'message',
        }),
      );
    }
  };

  onInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement;
    this.setState({
      content: target.value,
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="active-chat-area">
            {{{ SelectedChatHeader isConnected=isConnected }}}

            <div class="message-display-area">
                {{#each messages}}
                    {{{ChatMessage  content=this.content time=this.time ownerId=this.user_id}}}
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
        </div>
    `;
  }
}

const mapStateToProps: MapStateToProps<AppState> = state => {
  return {
    userId: state.user.id,
    activeChatToken: state.activeChatToken,
    selectedChat: state.selectedChat,
  };
};
// @ts-expect-error
export const ActiveChatArea = connect(ActiveChatAreaContainer, mapStateToProps, () => {});
