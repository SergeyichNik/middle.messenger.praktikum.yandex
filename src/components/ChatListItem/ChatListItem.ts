import { Block } from 'core/Block';
import './style.css';
import { ChatListItemProps, ClassChatListItemProps } from './ChatListItem.types';
import { connect, MapDispatchToProps, MapStateToProps } from '../../lib/utils/connect';
import { AppState } from '../../store/rootStore';
import { selectChat } from 'store/actions/actions';
import { BASE_API } from '../../api/config';

class ChatListItemContainer extends Block<ClassChatListItemProps> {
  static componentName = 'ChatListItem';

  constructor({ ...props }: ChatListItemProps) {
    super({
      ...props,
      events: {
        click: () => {
          if (this.props.selectedChatId !== this.props.id) {
            props.selectChat(this.props.id);
          }
        },
      },
    });
  }

  componentDidUpdate(oldProps: ClassChatListItemProps, newProps: ClassChatListItemProps): boolean {
    return false;
  }

  protected render(): string {
    const lastMessageTime = this.props.lastMessage?.time
      ? new Date(this.props.lastMessage?.time).toLocaleString('default', {
          day: '2-digit',
          month: '2-digit',
        })
      : '';
    const lastMessageText = this.props.lastMessage?.content || '';
    const chatAvatar = this.props.avatar ? `${BASE_API}resources/${this.props.avatar}` : '';
    // language=hbs
    return `
        <div class="chat-list-item" >
            {{{ ChatAvatar id="chat-list-chatImage" src="${chatAvatar}"}}}
            {{{ PTag id="chat-list-chatName" value=title}}}
            {{{ PTag id="chat-list-time" value="${lastMessageTime}" style="p-tag__small p-tag__gray"}}}
            {{{ PTag id="chat-list-lastMessage" value="${lastMessageText}" style="p-tag__medium p-tag__gray"}}}
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
const mapStateToProps: MapStateToProps<AppState> = state => {
  return {
    selectedChatId: state.selectedChat?.id,
  };
};

// @ts-expect-error
export const ChatListItem = connect(ChatListItemContainer, mapStateToProps, mapDispatchToProps);
