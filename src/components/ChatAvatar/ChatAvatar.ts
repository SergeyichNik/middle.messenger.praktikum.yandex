import Block from 'core/Block';
import './style.css';
import { ChatAvatarProps } from './ChatAvatar.types';

export class ChatAvatar extends Block {
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
