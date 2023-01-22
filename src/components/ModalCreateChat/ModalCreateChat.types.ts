export interface ModalCreateChatProps {
  createChat: (title: string, cb: () => void) => void;
  closeModal: () => void;
}
