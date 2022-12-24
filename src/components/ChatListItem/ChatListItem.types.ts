export interface ChatListItemProps {
  chatId: string;
  chatName?: string;
  chatImage?: string;
  unreadMessageCount?: string | number;
  time?: string;
  lastMessage?: string;
  onSelectChat: (e: MouseEvent) => void;
}
