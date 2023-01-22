import Block from 'core/Block';
import './style.css';
import { ClassNotificationBadgeProps, NotificationBadgeProps } from './NotificationBadge.types';

export class NotificationBadge extends Block<ClassNotificationBadgeProps> {
  static componentName = 'NotificationBadge';

  constructor({ ...props }: NotificationBadgeProps) {
    super({ ...props });
  }

  protected render(): string {
    // language=hbs
    return `<p id={{id}} class="notification-badge">{{value}}</p>`;
  }
}
