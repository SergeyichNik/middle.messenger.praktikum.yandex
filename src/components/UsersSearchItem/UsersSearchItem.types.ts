export interface UsersSearchItemProps {
  addUsersToChat: (id: number) => void;
  avatar: string;
  id: number;
  login: string;
  first_name: string;
  second_name: string;
}

export interface ClassUsersSearchItemProps extends UsersSearchItemProps {
  events: {
    click: () => void;
  };
}
