import Block from 'core/Block';
import './style.css';
import { ChatMessageProps, ClassChatMessageProps } from './ChatMessage.types';

export class ChatMessage extends Block<ClassChatMessageProps> {
  static componentName = 'ChatMessage';

  constructor({ ...props }: ChatMessageProps) {
    super({ ...props });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="message-container">
            <div class="message-{{position}}__message-body">
                <div class="message-{{position}}-body__cloud">
                    <p class="message-body__cloud-content">{{content}}</p>
                    <p class="message-body__cloud-time">{{time}}</p>
                </div>
                <div class="message-{{position}}-body__avatar">
                    {{{ ChatAvatar style="chat-avatar-small"}}}
                </div>
            </div>
        </div>
    `;
  }
}
