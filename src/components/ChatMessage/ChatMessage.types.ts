import { UserModel } from '../../store/rootStore';

export interface ChatMessageProps {
  content: string;
  time: string;
  avatar: string;
  ownerId: number;
  currentUserId: number;
  selectedChatUsers: UserModel[];
}

export interface ClassChatMessageProps extends ChatMessageProps {}
