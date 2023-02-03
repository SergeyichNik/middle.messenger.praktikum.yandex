import Block from 'core/Block';
import './style.css';
import { ClassUsersSearchItemProps, UsersSearchItemProps } from './UsersSearchItem.types';
import { connect, MapDispatchToProps } from '../../lib/utils/connect';
import { addUsersToChat } from '../../store/thunks/addUsersToChat';

class UsersSearchItemContainer extends Block<ClassUsersSearchItemProps> {
  static componentName = 'UsersSearchItem';

  constructor({ ...props }: UsersSearchItemProps) {
    super({
      ...props,
      events: {
        click: () => props.addUsersToChat(props.id),
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <li class="user-search-item">
            {{#if avatar}}
                <img class="user-search-item__header-avatar"
                     src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="avatar">
            {{else}}
                <img class="user-search-item__header-avatar"
                     src="https://www.meme-arsenal.com/memes/4408af6c9803cb3f320ecc468b3abbfa.jpg" alt="avatar">
            {{/if}}

            <span class="user-search-item__header-login">{{login}}</span>

            <span class="user-search-item__footer-id">ID {{id}}</span>
            <div class="user-search-item__name">
                <span class="user-search-item__first_name">{{first_name}}</span>
                <span class="user-search-item__second_name">{{second_name}}</span>
            </div>

        </li>
    `;
  }
}

const mapDispatchToProps: MapDispatchToProps = dispatch => {
  return {
    addUsersToChat: (id: number) => dispatch(addUsersToChat(id)),
  };
};

export const UsersSearchItem = connect(
  // @ts-expect-error
  UsersSearchItemContainer,
  () => {},
  mapDispatchToProps,
);
