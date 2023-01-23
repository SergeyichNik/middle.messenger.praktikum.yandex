import { ChatModel } from '../../store/rootStore';

export interface WsMessage {
  chat_id: number;
  content: string;
  file: any;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}

export interface ActiveChatAreaProps {
  userId: number;
  activeChatToken: string;
  selectedChat: ChatModel;
  messages: WsMessage[];
  isConnected: boolean;
  ws: WebSocket;
  onSend: () => void;
  onInput: (e: InputEvent) => void;
}

export interface ClassActiveChatAreaProps extends ActiveChatAreaProps {}
