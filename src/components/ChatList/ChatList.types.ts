import { ChatItemType } from '../../pages/Chat/mockData';

interface ChatListData extends ChatItemType {
  onSelectChat: (e: MouseEvent) => void;
}

export interface ChatListProps {
  data: ChatListData[];
}

export interface ClassChatListProps extends ChatListProps {}
