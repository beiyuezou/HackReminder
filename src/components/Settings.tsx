import React from 'react';
import { Settings as SettingsIcon, Sun, Moon, Globe, Volume2, VolumeX } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  translations: any;
}

export default function Settings({ settings, onSettingsChange, translations }: SettingsProps) {
  const toggleTheme = () => {
    onSettingsChange({
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light'
    });
  };

  const toggleLanguage = () => {
    onSettingsChange({
      ...settings,
      language: settings.language === 'en' ? 'zh' : 'en'
    });
  };

  const toggleTeamMode = () => {
    onSettingsChange({
      ...settings,
      teamMode: !settings.teamMode
    });
  };

  const toggleAudioAlerts = () => {
    onSettingsChange({
      ...settings,
      audioAlerts: !settings.audioAlerts
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <SettingsIcon className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {translations.settings}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {settings.theme === 'light' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-blue-500" />
            )}
            <span className="text-gray-700 dark:text-gray-300">
              {settings.theme === 'light' ? translations.lightMode : translations.darkMode}
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Language: {settings.language === 'en' ? 'English' : '中文'}
            </span>
          </div>
          <button
            onClick={toggleLanguage}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.language === 'zh' ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.language === 'zh' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {settings.audioAlerts ? (
              <Volume2 className="w-5 h-5 text-purple-500" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-500" />
            )}
            <span className="text-gray-700 dark:text-gray-300">
              {translations.audioAlerts}
            </span>
          </div>
          <button
            onClick={toggleAudioAlerts}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.audioAlerts ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.audioAlerts ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 dark:text-gray-300">
              Team Mode (Coming Soon)
            </span>
          </div>
          <button
            onClick={toggleTeamMode}
            disabled
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 opacity-50 cursor-not-allowed"
          >
            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}