import Block from 'core/Block';
import './style.css';
import { NotificationBadgeProps } from './NotificationBadge.types';

export class NotificationBadge extends Block {
  static componentName = 'NotificationBadge';

  constructor({ ...props }: NotificationBadgeProps) {
    super({ ...props });
  }

  protected render(): string {
    // language=hbs
    return `<p id={{id}} class="notification-badge">{{value}}</p>`;
  }
}
