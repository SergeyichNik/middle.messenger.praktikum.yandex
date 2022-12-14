import Block from 'core/Block';
import './style.css';
import { ChatAvatarProps, ClassChatAvatarProps } from './ChatAvatar.types';

export class ChatAvatar extends Block<ClassChatAvatarProps> {
  static componentName = 'ChatAvatar';

  constructor({ ...props }: ChatAvatarProps) {
    super({ ...props });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="avatar-container {{style}}" id={{id}}>
            <img src="#" class="avatar-image {{style}}" alt="avatar">
        </div>
    `;
  }
}
