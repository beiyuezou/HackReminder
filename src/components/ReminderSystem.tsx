import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { Hackathon, UserIdentity, Task, AppSettings } from '../types';

interface ReminderSystemProps {
  hackathon: Hackathon | null;
  identity: UserIdentity;
  tasks: Task[];
  settings: AppSettings;
  translations: any;
}

export default function ReminderSystem({ hackathon, identity, tasks, settings, translations }: ReminderSystemProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [lastAlertTime, setLastAlertTime] = useState(0);

  useEffect(() => {
    if (!hackathon?.deadline) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const deadline = new Date(hackathon.deadline).getTime();
      const difference = deadline - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });

        // Check for reminder alerts
        const minutesLeft = Math.floor(difference / (1000 * 60));
        
        // 使用自定义提醒频率或默认身份预设
        const reminderIntervals = hackathon.reminderFrequency 
          ? [hackathon.reminderFrequency] 
          : identity.reminderPresets;
        
        const shouldAlert = reminderIntervals.includes(minutesLeft) && 
                           now - lastAlertTime > 60000; // Prevent spam alerts

        if (shouldAlert) {
          const completedTasks = tasks.filter(task => task.completed).length;
          const totalTasks = tasks.length;
          const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
          
          // Play audio alert if enabled
          if (settings.audioAlerts) {
            try {
              const bell = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
              bell.volume = 0.3; // Set volume to 30% for a softer sound
              bell.play().catch(error => {
                console.log('Audio playback failed:', error);
                // Fallback to a simple beep if the audio file fails
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = 800; // 800Hz frequency
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
              });
            } catch (error) {
              console.log('Audio alert failed:', error);
            }
          }
          
          window.alert(
            `⏰ HackReminder Alert!\n\n` +
            `${minutesLeft} minutes until ${hackathon.name} deadline!\n` +
            `Task Progress: ${completedTasks}/${totalTasks} (${progress}%)\n\n` +
            `Keep going! 🚀`
          );
          setLastAlertTime(now);
        }
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    // Initial calculation to show countdown immediately
    const now = new Date().getTime();
    const deadline = new Date(hackathon.deadline).getTime();
    const difference = deadline - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }
    return () => clearInterval(timer);
  }, [hackathon, identity, tasks, settings.audioAlerts, lastAlertTime]);

  if (!hackathon?.deadline) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {translations.reminderSystem}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Select a hackathon to start countdown</p>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 2;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {translations.reminderSystem}
        </h2>
        {isUrgent && <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />}
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          {hackathon.name}
        </h3>
        <div className={`text-3xl font-bold mb-2 ${isUrgent ? 'text-red-600' : 'text-blue-600'}`}>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Until submission deadline
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Task Progress</span>
          <span>{completedTasks}/{totalTasks} completed</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              progress === 100 ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          下次提醒: {hackathon.reminderFrequency || identity.reminderPresets[0]} 分钟后
        </div>
      </div>
    </div>
  );
}