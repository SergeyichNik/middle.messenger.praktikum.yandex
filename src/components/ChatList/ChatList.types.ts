import { ChatModel } from '../../store/rootStore';

export interface ChatListProps {
  data: ChatModel[];
  goToProfile: () => void;
  onOpenCreateChatModal: () => void;
}

export interface ClassChatListProps extends ChatListProps {}
