import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import { AppState, UserIdentity, Hackathon, Task, AppSettings } from './types';
import { USER_IDENTITIES, TRANSLATIONS } from './utils/constants';
import { useLocalStorage } from './hooks/useLocalStorage';

import IdentitySelector from './components/IdentitySelector';
import HackathonSelector from './components/HackathonSelector';
import ReminderSystem from './components/ReminderSystem';
import TaskChecklist from './components/TaskChecklist';
import Notepad from './components/Notepad';
import DevpostHelper from './components/DevpostHelper';
import Settings from './components/Settings';

function App() {
  const [identity, setIdentity] = useLocalStorage<UserIdentity>('hackreminder-identity', USER_IDENTITIES['first-time']);
  const [selectedHackathon, setSelectedHackathon] = useLocalStorage<Hackathon | null>('hackreminder-hackathon', null);
  const [tasks, setTasks] = useLocalStorage<Task[]>('hackreminder-tasks', []);
  const [notes, setNotes] = useLocalStorage<string>('hackreminder-notes', '');
  const [settings, setSettings] = useLocalStorage<AppSettings>('hackreminder-settings', {
    theme: 'light',
    language: 'en',
    teamMode: false,
    audioAlerts: true
  });

  const [notepadCollapsed, setNotepadCollapsed] = useState(true);
  const [devpostCollapsed, setDevpostCollapsed] = useState(true);

  // Apply theme to document
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const translations = TRANSLATIONS[settings.language];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {translations.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Stay on track, submit on time 🚀
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="space-y-6">
            <IdentitySelector
              selectedIdentity={identity}
              onIdentityChange={setIdentity}
              translations={translations}
            />
            
            <HackathonSelector
              selectedHackathon={selectedHackathon}
              onHackathonChange={setSelectedHackathon}
              translations={translations}
            />
            
            <ReminderSystem
              hackathon={selectedHackathon}
              identity={identity}
              tasks={tasks}
              settings={settings}
              translations={translations}
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <TaskChecklist
              tasks={tasks}
              onTasksChange={setTasks}
              translations={translations}
            />
            
            <Notepad
              notes={notes}
              onNotesChange={setNotes}
              translations={translations}
              isCollapsed={notepadCollapsed}
              onToggleCollapse={() => setNotepadCollapsed(!notepadCollapsed)}
            />
            
            <DevpostHelper
              translations={translations}
              isCollapsed={devpostCollapsed}
              onToggleCollapse={() => setDevpostCollapsed(!devpostCollapsed)}
            />
            
            <Settings
              settings={settings}
              onSettingsChange={setSettings}
              translations={translations}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Made with ❤️ for hackathon participants</p>
            <p className="mt-1">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;