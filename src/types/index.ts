export interface Hackathon {
  id: string;
  name: string;
  deadline: string;
  logo?: string;
  resources?: string[];
  isCustom?: boolean;
  reminderFrequency?: number; // 自定义提醒频率（分钟）
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  timeTag?: string;
  alertTime?: number; // minutes before deadline
}

export interface AppSettings {
  theme: 'light' | 'dark';
  language: 'en' | 'zh';
  teamMode: boolean;
  audioAlerts: boolean;
}

export interface UserIdentity {
  type: 'first-time' | 'experienced' | 'team' | 'time-crunch';
  reminderPresets: number[]; // minutes
}

export interface AppState {
  identity: UserIdentity;
  selectedHackathon: Hackathon | null;
  tasks: Task[];
  notes: string;
  settings: AppSettings;
  lastAlertTime: number;
}