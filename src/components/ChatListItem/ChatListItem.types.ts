export interface ChatListItemProps {
  chatId: string;
  chatName?: string;
  chatImage?: string;
  unreadMessageCount?: string | number;
  time?: string;
  lastMessage?: string;
  onSelectChat: (chatId: string) => void;
}

export interface ClassChatListItemProps extends Omit<ChatListItemProps, 'onSelectChat'> {
  events: {
    click: (chatId: string) => void;
  };
}
