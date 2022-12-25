import Block from 'core/Block';
import './style.css';
import { ChatListProps, ClassChatListProps } from './ChatList.types';

export class ChatList extends Block<ClassChatListProps> {
  static componentName = 'ChatList';

  constructor({ ...props }: ChatListProps) {
    super({ ...props });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="chat-list-container">
            <div class="chat-list-buttons">
                {{{ Button style="round" iconLeft=true iconType="plus-icon"}}}
                {{{ Button style="gray_text" label="Профиль" iconRight=true}}}
            </div>
            {{{ FilledInput placeholder="Поиск..." }}}
            <ul class="chat-list">

                {{#each data}}

                    {{{ ChatListItem chatName=this.chatName
                                     chatId=this.id
                                     chatImage=this.chatImage
                                     unreadMessageCount=this.unreadMessageCount
                                     time=this.time
                                     lastMessage=this.lastMessage
                                     onSelectChat=this.onSelectChat
                    }}}

                {{/each}}
            </ul>
        </div>
    `;
  }
}
