export interface SelectedChatHeaderProps {
  time?: string;
  title: string;
  isSettingsMode: boolean;
  enableSettingsMode: () => void;
  disableSettingsMode: () => void;
  isConnected: boolean;
}

export interface ClassSelectedChatHeaderProps extends SelectedChatHeaderProps {}
