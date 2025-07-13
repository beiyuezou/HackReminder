import { Hackathon, UserIdentity } from '../types';

export const USER_IDENTITIES: Record<string, UserIdentity> = {
  'first-time': {
    type: 'first-time',
    reminderPresets: [120, 60, 30, 15] // 2h, 1h, 30m, 15m
  },
  'experienced': {
    type: 'experienced',
    reminderPresets: [60, 30, 15] // 1h, 30m, 15m
  },
  'team': {
    type: 'team',
    reminderPresets: [90, 45, 30, 15] // 1.5h, 45m, 30m, 15m
  },
  'time-crunch': {
    type: 'time-crunch',
    reminderPresets: [30, 15, 10, 5] // 30m, 15m, 10m, 5m
  }
};

export const HACKATHONS: Hackathon[] = [
  {
    id: 'vshacks',
    name: 'vsHacks 2024',
    deadline: '2024-03-15T23:59:59',
    resources: ['VSCode Extensions', 'GitHub Copilot', 'Documentation'],
    isCustom: false
  },
  {
    id: 'bolthack',
    name: 'BoltHack',
    deadline: '2024-04-01T18:00:00',
    resources: ['Bolt Platform', 'API Docs', 'Community Discord'],
    isCustom: false
  }
];

export const DEVPOST_TEMPLATES = {
  'built-with': {
    title: 'Built With',
    content: 'React, TypeScript, Tailwind CSS, Vite'
  },
  'challenges': {
    title: 'Challenges We Ran Into',
    content: 'We faced challenges with [specific technical issue], which we overcame by [solution approach].'
  },
  'accomplishments': {
    title: 'Accomplishments',
    content: 'We\'re proud of creating a fully functional [product description] that successfully [key achievement].'
  },
  'learned': {
    title: 'What We Learned',
    content: 'This project taught us valuable lessons about [technology/concept] and improved our skills in [area].'
  },
  'next-steps': {
    title: 'What\'s Next',
    content: 'Future improvements include [feature 1], [feature 2], and scaling to support [goal].'
  }
};

export const TRANSLATIONS = {
  en: {
    title: 'HackReminder',
    identitySelector: 'Choose Your Profile',
    hackathonSelector: 'Select Hackathon',
    reminderSystem: 'Countdown & Alerts',
    taskChecklist: 'Task Checklist',
    notepad: 'Quick Notes',
    devpostHelper: 'Devpost Templates',
    settings: 'Settings',
    timeRemaining: 'Time Remaining',
    addTask: 'Add Task',
    exportNotes: 'Export Notes',
    copyTemplate: 'Copy Template',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    audioAlerts: 'Audio Alerts'
  },
  zh: {
    title: '黑客松提醒器',
    identitySelector: '选择身份',
    hackathonSelector: '选择黑客松',
    reminderSystem: '倒计时和提醒',
    taskChecklist: '任务清单',
    notepad: '快速笔记',
    devpostHelper: 'Devpost 模板',
    settings: '设置',
    timeRemaining: '剩余时间',
    addTask: '添加任务',
    exportNotes: '导出笔记',
    copyTemplate: '复制模板',
    lightMode: '浅色模式',
    darkMode: '深色模式',
    audioAlerts: '音频提醒'
  }
};