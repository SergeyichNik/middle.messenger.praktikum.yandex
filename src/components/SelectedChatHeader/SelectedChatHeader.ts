import { Block } from 'core/Block';
import './style.css';
import { ClassSelectedChatHeaderProps, SelectedChatHeaderProps } from './SelectedChatHeader.types';
import { connect, MapDispatchToProps, MapStateToProps } from '../../lib/utils/connect';
import { AppState } from '../../store/rootStore';
import { BASE_API } from '../../api/config';

class SelectedChatHeaderContainer extends Block<Partial<ClassSelectedChatHeaderProps>> {
  static componentName = 'SelectedChatHeader';

  constructor({ ...props }: SelectedChatHeaderProps) {
    super({ ...props });
    this.setProps({
      isSettingsMode: false,
      enableSettingsMode: this.enableSettingsMode.bind(this),
      disableSettingsMode: this.disableSettingsMode.bind(this),
    });
  }

  enableSettingsMode = (): void => {
    this.setProps({
      isSettingsMode: true,
    });
  };

  disableSettingsMode = (): void => {
    this.setProps({
      isSettingsMode: false,
    });
  };

  protected render(): string {
    const lastVisitTime = this.props.time
      ? new Date(this.props.time).toLocaleString('default', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
        })
      : 'недавно';
    const chatAvatar = this.props.avatar ? `${BASE_API}resources/${this.props.avatar}` : '';
    // language=hbs
    return `
        <div class="selected-chat-header">
            {{#if isSettingsMode}}
                {{{ ModalSelectedChat onCloseModal=disableSettingsMode title=title id=id}}}
            {{/if}}
            {{{ ChatAvatar style="chat-avatar-medium" src="${chatAvatar}" }}}
            <div class="selected-chat__info">
                {{{ PTag value=title }}}
                {{{ PTag style="p-tag__medium p-tag__gray"
                         value="Был(а) ${lastVisitTime}"
                }}}
                {{{ PTag 
                        value="${
                          this.props.isConnected ? 'Соединение установлено' : 'Соединение...'
                        }" 
                        style="p-tag__medium p-tag__gray"
                }}}
            </div>
            {{{ Button iconLeft=true onClick=enableSettingsMode iconType="dots-icon"}}}
        </div>
    `;
  }
}

// @ts-expect-error
const mapStateToProps: MapStateToProps<AppState> = state => {
  return {
    time: state.selectedChat?.last_message?.time,
    title: state.selectedChat?.title,
    avatar: state.selectedChat?.avatar,
    id: state.selectedChat?.id,
  };
};

const mapDispatchToProps: MapDispatchToProps = () => {
  return {};
};

export const SelectedChatHeader = connect(
  // @ts-expect-error
  SelectedChatHeaderContainer,
  mapStateToProps,
  mapDispatchToProps,
);
