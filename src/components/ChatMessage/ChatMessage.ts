import Block from 'core/Block';
import './style.css';
import { ChatMessageProps, ClassChatMessageProps } from './ChatMessage.types';
import { connect, MapStateToProps } from '../../lib/utils/connect';
import { AppState } from '../../store/rootStore';
import { BASE_API } from '../../api/config';

class ChatMessageContainer extends Block<ClassChatMessageProps> {
  static componentName = 'ChatMessage';

  constructor({ ...props }: ChatMessageProps) {
    super({ ...props });
  }

  protected render(): string {
    const { content, time, ownerId, currentUserId, selectedChatUsers } = this.props;

    const messageTime = new Date(time).toLocaleString('default', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const messageOwner = selectedChatUsers.find(({ id }) => id === ownerId);
    const avatar = messageOwner?.avatar ? `${BASE_API}resources/${messageOwner.avatar}` : '';
    const messagePosition: 'left' | 'right' = ownerId === currentUserId ? 'right' : 'left';
    const color = String(ownerId).slice(0, 4);

    // language=hbs
    return `
        <div class="message-container">
            <div class="message-${messagePosition}__message-body">
                <div class="message-${messagePosition}-body__cloud">
                    <p style="color: ${'#' + color}" class="message-body__cloud-content">${
      messageOwner?.login as string
    }</p>
                    <p class="message-body__cloud-content">${content}</p>
                    <p class="message-body__cloud-time">${messageTime}</p>
                </div>
                <div class="message-${messagePosition}-body__avatar">
                    {{{ ChatAvatar src="${avatar}" style="chat-avatar-small"}}}
                </div>
            </div>
        </div>
    `;
  }
}

const mapStateToProps: MapStateToProps<AppState> = state => {
  return {
    currentUserId: state.user.id,
    selectedChatUsers: state.selectedChatUsers,
  };
};
// @ts-expect-error
export const ChatMessage = connect(ChatMessageContainer, mapStateToProps, () => {});
