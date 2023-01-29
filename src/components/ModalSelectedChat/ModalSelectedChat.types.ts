import { UserModel } from '../../store/rootStore';
import { AddUserToChat } from '../../api/chatsApi';

export interface ModalSelectedChatProps {
  onCloseModal: () => {};
  removeChat: (id: number) => void;
  userSearch: (title: string, cb: (data: UserModel[]) => void) => void;
  addUsersToChat: (data: AddUserToChat, cb: () => void) => void;
  chooseUserToChat: (id: number) => void;
  enableRemoveChat: () => void;
  disableRemoveChat: () => void;
  confirmRemoveChat: () => void;
  enableUserAddMode: () => void;
  disableUserAddMode: () => void;
  onInput: (e: InputEvent) => void;
  onSearchUser: () => void;
  usersToAdd: number[];
  chatRemoveConfirmMode: boolean;
  newUserAddMode: boolean;
  searchResultList: UserModel[];
  id: number;
}

export interface ClassModalSelectedChatProps extends ModalSelectedChatProps {
  events: {
    click: (e: MouseEvent) => void;
  };
}
