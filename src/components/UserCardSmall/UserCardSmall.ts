import Block from 'core/Block';
import './style.css';
import { ClassUserCardSmallProps, UserCardSmallProps } from './UserCardSmall.types';
import { connect, MapDispatchToProps, MapStateToProps } from '../../lib/utils/connect';
import { AppState } from '../../store/rootStore';
import { removeUserFromChat } from '../../store/thunks/removeUserFromChat';

export class UserCardSmallContainer extends Block<Partial<ClassUserCardSmallProps>> {
  static componentName = 'UserCardSmall';

  constructor({ ...props }: UserCardSmallProps) {
    super({ ...props });
    this.setProps({
      onRemoveUser: this.onRemoveUser.bind(this),
    });
  }

  onRemoveUser = (): void => {
    if (this.props.removeUserFromChat && this.props.id) {
      this.props.removeUserFromChat(this.props.id);
    }
  };

  protected render(): string {
    // language=hbs
    return `
        <div class="user-card-small">
            {{#if avatar}}
                <img class="user-card-small__avatar" src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="avatar">
            {{else}}
                <img class="user-card-small__avatar" src="https://www.meme-arsenal.com/memes/4408af6c9803cb3f320ecc468b3abbfa.jpg" alt="avatar">

            {{/if}}
            <span class="user-card-small__login">{{login}}</span>
            {{{ Button style="round" onClick=onRemoveUser iconLeft=true iconType="cross-icon"}}}
        </div>
    `;
  }
}

const mapDispatchToProps: MapDispatchToProps = dispatch => {
  return {
    removeUserFromChat: (id: number) => dispatch(removeUserFromChat(id)),
  };
};

const mapStateToProps: MapStateToProps<AppState> = state => {
  return {};
};

export const UserCardSmall = connect(
  // @ts-expect-error
  UserCardSmallContainer,
  mapStateToProps,
  mapDispatchToProps,
);
