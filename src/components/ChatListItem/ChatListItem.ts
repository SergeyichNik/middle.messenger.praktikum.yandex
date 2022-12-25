import Block from 'core/Block';
import './style.css';
import { ChatListItemProps, ClassChatListItemProps } from './ChatListItem.types';

export class ChatListItem extends Block<ClassChatListItemProps> {
  static componentName = 'ChatListItem';

  constructor({ onSelectChat, ...props }: ChatListItemProps) {
    super({
      ...props,
      events: {
        click: () => onSelectChat(this.props.chatId),
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="chat-list-item" >
            {{{ ChatAvatar id="chat-list-chatImage" }}}
            {{{ PTag id="chat-list-chatName" value=chatName}}}
            {{{ PTag id="chat-list-time" value=time style="p-tag__small p-tag__gray"}}}
            {{{ PTag id="chat-list-lastMessage" value=lastMessage style="p-tag__medium p-tag__gray"}}}
            {{{ NotificationBadge id="chat-list-badge" value=unreadMessageCount}}}
        </div>
    `;
  }
}
