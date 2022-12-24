import Block from 'core/Block';
import './style.css';
import { data } from './mockData';

export class Chat extends Block {
  static componentName = 'Chat';

  constructor() {
    super();
    this.state = {
      message: {
        text: '',
      },
    };
    this.setProps({
      data: data.map(item => ({
        ...item,
        onSelectChat: this.onSelectChat.bind(this),
      })),
      selectedChat: null,
      onInput: this.onInput.bind(this),
      onSend: this.onSend.bind(this),
    });
  }

  onSelectChat(chatId: string): void {
    if (this.props.selectedChat && this.props.selectedChat.id === chatId) {
      return;
    }

    this.setProps({
      selectedChat: data.find(({ id }) => id === chatId),
    });
  }

  onInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement;

    this.setState({
      message: {
        text: target.value,
      },
    });
  }

  onSend(): void {
    if (this.state.message.text) {
      console.log('message send', this.state.message);
    }
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="chat-main-container">
            {{{ ChatList data=data}}}
            <div class="right-part">
                {{#if selectedChat}}
                    
                    <div class="selected-chat-header">
                        {{{ ChatAvatar style="chat-avatar-medium" }}}
                        <div class="selected-chat__info">
                            {{{ PTag value=selectedChat.chatName }}}
                            {{{ PTag style="p-tag__medium p-tag__gray" value="Был в ${String(
                              this.props.selectedChat?.time,
                            )}"}}}
                        </div>
                        {{{ Button iconLeft=true iconType="dots-icon"}}}
                    </div>
                    
                    <div class="message-create-area">
                        {{{ Button type="button" style="text round" iconLeft=true iconType= "attach-icon"}}}
                        {{{ Button type="button" style="text round" iconLeft=true iconType= "smile-icon"}}}
                        <div class="message-create-area__input">
                            {{{ FilledInput onInput=onInput name="message" placeholder='Cообшение...' style="round" }}}
                        </div>
                        {{{ Button onClick=onSend type="button" style="primary round" iconLeft=true iconType= "send-icon"}}}
                    </div>
                {{else}}
                  
                    {{{ PTag value="Выберите чат чтобы отправить сообщение" style="p-tag__medium p-tag__gray" }}}

                {{/if}}
            </div>
        </div>
    `;
  }
}
