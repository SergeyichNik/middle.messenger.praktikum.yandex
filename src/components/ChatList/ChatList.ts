import { Block } from 'core/Block';
import './style.css';
import { ChatListProps, ClassChatListProps } from './ChatList.types';
import { router } from '../../core/Router';
import { Routes } from '../../router/initRouter';

export class ChatList extends Block<ClassChatListProps> {
  static componentName = 'ChatList';

  constructor({ ...props }: ChatListProps) {
    super({ ...props });

    this.setProps({
      goToProfile: this.goToProfile.bind(this),
    });
  }

  goToProfile(): void {
    router.navigate(Routes.PROFILE);
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="chat-list-container">
            <div class="chat-list-buttons">
                {{{ Button style="round" onClick=onOpenCreateChatModal iconLeft=true iconType="plus-icon"}}}
                {{{ Button style="gray_text" label="Профиль" onClick=goToProfile iconRight=true}}}
            </div>
            {{{ FilledInput placeholder="Поиск..." }}}
            <ul class="chat-list">

                {{#each data}}

                    {{{ ChatListItem title=this.title
                                     id=this.id
                                     avatar=this.avatar
                                     unreadMessageCount=this.unread_count
                                     time=this.time
                                     lastMessage=this.last_message
                    }}}

                {{/each}}
            </ul>
        </div>
    `;
  }
}
