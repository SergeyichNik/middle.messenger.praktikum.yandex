export interface SelectedChatHeaderProps {
  time?: string;
  title: string;
  isSettingsMode: boolean;
  enableSettingsMode: () => void;
  disableSettingsMode: () => void;
  isConnected: boolean;
  avatar: string;
  id: number;
}

export interface ClassSelectedChatHeaderProps extends SelectedChatHeaderProps {}
