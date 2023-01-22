export interface UserCardSmallProps {
  id: number;
  login: string;
  avatar: string;
  removeUserFromChat: (id: number) => void;
  onRemoveUser: () => void;
}

export interface ClassUserCardSmallProps extends UserCardSmallProps {}
