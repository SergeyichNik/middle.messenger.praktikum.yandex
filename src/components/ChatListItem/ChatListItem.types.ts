export interface ChatListItemProps {
  id: number;
  title: string;
  avatar?: string;
  unreadMessageCount?: string | number;
  time?: string;
  lastMessage?: string;
  selectChat: (id: number) => void;
}

export interface ClassChatListItemProps extends ChatListItemProps {
  events: {
    click: (id: number) => void;
  };
}
