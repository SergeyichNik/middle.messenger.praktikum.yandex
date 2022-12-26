import { nanoid } from 'nanoid';

export interface ChatItemType {
  id: string;
  chatName: string;
  chatImage: string;
  unreadMessageCount: string;
  time: string;
  lastMessage: string;
}

export interface Message {
  content: string;
  time: string;
  owner: string;
}

const date = new Date();

export const mockMessages: Message[] = [
  {
    content: 'From mock',
    time: `${date.getHours()}:${date.getMinutes()}`,
    owner: 'right',
  },
  {
    content: 'From mock',
    time: `${date.getHours()}:${date.getMinutes()}`,
    owner: 'left',
  },
  {
    content: 'From mock',
    time: `${date.getHours()}:${date.getMinutes()}`,
    owner: 'right',
  },
  {
    content: 'From mock',
    time: `${date.getHours()}:${date.getMinutes()}`,
    owner: 'left',
  },
  {
    content: 'From mock',
    time: `${date.getHours()}:${date.getMinutes()}`,
    owner: 'right',
  },
];

export const data: ChatItemType[] = [
  {
    chatName: 'Done done',
    chatImage: 'img',
    id: nanoid(6),
    unreadMessageCount: '2',
    time: '11:20',
    lastMessage: 'И Human Interface Guidelines и Material Design',
  },
  {
    chatName: 'Я.Практикум',
    chatImage: 'img',
    id: nanoid(6),
    unreadMessageCount: '20',
    time: '11:20',
    lastMessage: 'И Human Interface Guidelines и Material Design',
  },
  {
    chatName: 'Я.Практикум',
    chatImage: 'img',
    id: nanoid(6),
    unreadMessageCount: '200',
    time: '11:20',
    lastMessage: 'И Human Interface Guidelines и Material Design',
  },
  {
    chatName: 'Я.Практикум',
    chatImage: 'img',
    id: nanoid(6),
    unreadMessageCount: '20',
    time: '11:20',
    lastMessage: 'И Human Interface Guidelines и Material Design',
  },
  {
    chatName: 'Done done',
    chatImage: 'img',
    id: nanoid(6),
    unreadMessageCount: '2',
    time: '11:20',
    lastMessage: 'И Human Interface Guidelines и Material Design',
  },
  {
    chatName: 'Я.Практикум',
    chatImage: 'img',
    id: nanoid(6),
    unreadMessageCount: '20',
    time: '11:20',
    lastMessage: 'И Human Interface Guidelines и Material Design',
  },
  {
    chatName: 'Я.Практикум',
    chatImage: 'img',
    id: nanoid(6),
    unreadMessageCount: '200',
    time: '11:20',
    lastMessage: 'И Human Interface Guidelines и Material Design',
  },
  {
    chatName: 'Я.Практикум',
    chatImage: 'img',
    id: nanoid(6),
    unreadMessageCount: '20',
    time: '11:20',
    lastMessage: 'И Human Interface Guidelines и Material Design',
  },
  {
    chatName: 'Done done',
    chatImage: 'img',
    id: nanoid(6),
    unreadMessageCount: '2',
    time: '11:20',
    lastMessage: 'И Human Interface Guidelines и Material Design',
  },
];
