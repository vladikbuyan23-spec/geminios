
export type AppId = 'assistant' | 'image-gen' | 'terminal' | 'settings' | 'about' | 'files' | 'store' | 'calculator' | 'notes' | 'browser' | 'tiktok' | 'instagram' | 'telegram';

export type WidgetType = 'clock' | 'weather' | 'search' | 'stats';

export interface HomeWidget {
  id: string;
  type: WidgetType;
}

export interface AppMetadata {
  id: AppId;
  title: string;
  icon: string;
  color: string;
}

export interface OSNotification {
  id: string;
  title: string;
  body: string;
  app: string;
  time: string;
  icon: string;
}

export interface SystemSettings {
  wifi: boolean;
  bluetooth: boolean;
  airplaneMode: boolean;
  darkMode: boolean;
  volume: number;
  brightness: number;
  wallpaper: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface WindowState {
  id: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}
