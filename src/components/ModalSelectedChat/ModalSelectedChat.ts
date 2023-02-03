import Block from 'core/Block';
import './style.css';
import { ClassModalSelectedChatProps, ModalSelectedChatProps } from './ModalSelectedChat.types';
import { connect, MapDispatchToProps, MapStateToProps } from '../../lib/utils/connect';
import { removeChat, userSearch } from '../../store/thunks';
import { AppState, UserModel } from '../../store/rootStore';
import { addUsersToChat } from '../../store/thunks/addUsersToChat';

class ModalSelectedChatContainer extends Block<Partial<ClassModalSelectedChatProps>> {
  static componentName = 'ModalSelectedChat';

  constructor({ ...props }: ModalSelectedChatProps) {
    super({
      ...props,
      events: {
        click: (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (target.dataset.container === 'close') {
            props.onCloseModal();
          }
        },
      },
    });
    this.state = {
      userLogin: '',
    };
    this.setProps({
      chatRemoveConfirmMode: false,
      newUserAddMode: false,
      enableRemoveChat: this.enableRemoveChat.bind(this),
      disableRemoveChat: this.disableRemoveChat.bind(this),
      confirmRemoveChat: this.confirmRemoveChat.bind(this),
      enableUserAddMode: this.enableUserAddMode.bind(this),
      disableUserAddMode: this.disableUserAddMode.bind(this),
      onInput: this.onInput.bind(this),
      onSearchUser: this.onSearchUser.bind(this),
      searchResultList: [],
      usersToAdd: [],
    });
  }

  confirmRemoveChat = (): void => {
    if (this.props.removeChat && this.props.id) {
      this.props.removeChat(this.props.id);
    }
  };

  enableRemoveChat = (): void => {
    this.setProps({
      chatRemoveConfirmMode: true,
      newUserAddMode: false,
    });
  };

  disableRemoveChat = (): void => {
    this.setProps({
      chatRemoveConfirmMode: false,
    });
  };

  enableUserAddMode = (): void => {
    this.setProps({
      chatRemoveConfirmMode: false,
      newUserAddMode: true,
    });
  };

  disableUserAddMode = (): void => {
    this.setProps({
      newUserAddMode: false,
      searchResultList: [],
    });
  };

  onInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement;
    this.setState({
      userLogin: target.value,
    });
  }

  setSearchResults = (data: UserModel[]): void => {
    this.setProps({
      searchResultList: data,
    });
  };

  onSearchUser = (): void => {
    if (this.props.userSearch) {
      this.props.userSearch(this.state.userLogin, this.setSearchResults.bind(this));
    }
  };

  protected render(): string {
    // language=hbs
    return `
        <div class="modal-selected-chat" data-container="close">

            <div class="modal-selected-chat-container">
                <div class="modal-selected-chat-container__header">
                    {{{ PTag value=title style="p-tag__large" }}}
                    <div class="chat-container__remove-chat-buttons">
                        {{#if chatRemoveConfirmMode}}
                            {{{ Button type="button" onClick=confirmRemoveChat label="Удалить" style="text"}}}
                            {{{ Button type="button" onClick=disableRemoveChat label="Отменить" style="text"}}}
                        {{else}}
                            {{{ Button type="button" onClick=enableRemoveChat label="Удалить чат" style="text"}}}
                        {{/if}}
                    </div>
                </div>
                {{#if selectedChatUsers}}
                    <div class="modal-selected-chat__users">
                        {{{PTag value="Участники чата" }}}
                      <div class="modal-selected-chat__users-list">
                          {{#each selectedChatUsers}}
                              {{{ UserCardSmall login=this.login avatar=this.avatar id=this.id }}}
                          {{/each}}
                      </div>
                    </div>
                {{/if}}
                
                
                <div class="chat-container__add-user">
                    {{#if newUserAddMode}}
                        <div class="chat-container__add-user__header">
                            {{{ PTag value="Поиск по логину" }}}
                            {{{ Button type="button" onClick=disableUserAddMode label="Отменить" style="text"}}}
                        </div>
                        
                        <div class="chat-container__add-user__search-field">
                            {{{ FilledInput onInput=onInput value=chatName placeholder="Логин..." }}}
                            {{{ Button type="button" onClick=onSearchUser style="primary fill"
                                       label="Найти" }}}
                        </div>
                        {{#if searchResultList}}
                            <ul class="user-search-list">
                                {{#each searchResultList}}
                                    {{{ UsersSearchItem avatar=this.avatar 
                                                        onClick=props.onChooseUser
                                                        login=this.login 
                                                        id=this.id 
                                                        first_name=this.first_name 
                                                        second_name=this.second_name
                                    }}}
                                {{/each}}
                            </ul>
                        {{/if}}
                    {{else}}
                        {{{ Button type="button" onClick=enableUserAddMode label="Добавить пользователя"
                                   style="text"}}}
                    {{/if}}
                    
                </div>

            </div>

        </div>
    `;
  }
}

const mapDispatchToProps: MapDispatchToProps = dispatch => {
  return {
    removeChat: (id: number) => dispatch(removeChat(id)),
    userSearch: (title: string, cb: (data: UserModel[]) => void) => dispatch(userSearch(title, cb)),
    addUsersToChat: (id: number, cb: () => void) => dispatch(addUsersToChat(id, cb)),
  };
};

const mapStateToProps: MapStateToProps<AppState> = state => {
  return {
    usersToAdd: state.usersToAdd,
    selectedChatUsers: state.selectedChatUsers,
  };
};

export const ModalSelectedChat = connect(
  // @ts-expect-error
  ModalSelectedChatContainer,
  mapStateToProps,
  mapDispatchToProps,
);
