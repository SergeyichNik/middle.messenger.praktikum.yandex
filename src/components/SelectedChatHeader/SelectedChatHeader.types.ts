export interface SelectedChatHeaderProps {
  time?: string;
  title: string;
  isSettingsMode: boolean;
  enableSettingsMode: () => void;
  disableSettingsMode: () => void;
}

export interface ClassSelectedChatHeaderProps extends SelectedChatHeaderProps {}
