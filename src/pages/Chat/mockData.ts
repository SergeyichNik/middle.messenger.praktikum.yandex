import { nanoid } from 'nanoid';

export interface ChatItemType {
  id: string;
  chatName: string;
  chatImage: string;
  unreadMessageCount: string;
  time: string;
  lastMessage: string;
}

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
