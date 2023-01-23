import Block from 'core/Block';
import './style.css';
import { ChatAvatarProps, ClassChatAvatarProps } from './ChatAvatar.types';
import { apiResources } from '../../lib/config/constants';

export class ChatAvatar extends Block<ClassChatAvatarProps> {
  static componentName = 'ChatAvatar';

  constructor({ ...props }: ChatAvatarProps) {
    super({ ...props });
  }

  protected render(): string {
    const imageSrc = this.props.src ? `${apiResources}${this.props.src}` : '';
    // language=hbs
    return `
        <div class="avatar-container {{style}}" id={{id}}>
            <img src="${imageSrc}" class="avatar-image {{style}}" alt="avatar">
        </div>
    `;
  }
}
