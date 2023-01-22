import Block from 'core/Block';
import './style.css';
import { ChatListItemProps, ClassChatListItemProps } from './ChatListItem.types';
import { connect, MapDispatchToProps } from '../../lib/utils/connect';
import { AppState } from '../../store/rootStore';
import { selectChat } from 'store/actions/actions';

class ChatListItemContainer extends Block<ClassChatListItemProps> {
  static componentName = 'ChatListItem';

  constructor({ ...props }: ChatListItemProps) {
    super({
      ...props,
      events: {
        click: () => props.selectChat(this.props.id),
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="chat-list-item" >
            {{{ ChatAvatar id="chat-list-chatImage" }}}
            {{{ PTag id="chat-list-chatName" value=title}}}
            {{{ PTag id="chat-list-time" value=time style="p-tag__small p-tag__gray"}}}
            {{{ PTag id="chat-list-lastMessage" value=lastMessage style="p-tag__medium p-tag__gray"}}}
            {{#if unreadMessageCount}}
                {{{ NotificationBadge id="chat-list-badge" value=unreadMessageCount}}}
            {{/if}}
        </div>
    `;
  }
}

const mapDispatchToProps: MapDispatchToProps<AppState> = dispatch => {
  return {
    selectChat: (id: number) => dispatch(selectChat(id)),
  };
};

// @ts-expect-error
export const ChatListItem = connect(ChatListItemContainer, () => {}, mapDispatchToProps);
