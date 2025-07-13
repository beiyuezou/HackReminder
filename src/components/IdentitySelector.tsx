import React from 'react';
import { User, Users, Clock, Zap } from 'lucide-react';
import { UserIdentity } from '../types';
import { USER_IDENTITIES } from '../utils/constants';

interface IdentitySelectorProps {
  selectedIdentity: UserIdentity;
  onIdentityChange: (identity: UserIdentity) => void;
  translations: any;
}

const IDENTITY_ICONS = {
  'first-time': User,
  'experienced': Zap,
  'team': Users,
  'time-crunch': Clock
};

const IDENTITY_LABELS = {
  'first-time': 'First-time Hacker',
  'experienced': 'Experienced',
  'team': 'Team Leader',
  'time-crunch': 'Time Crunch'
};

export default function IdentitySelector({ selectedIdentity, onIdentityChange, translations }: IdentitySelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {translations.identitySelector}
      </h2>
      
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(USER_IDENTITIES).map(([key, identity]) => {
          const Icon = IDENTITY_ICONS[key as keyof typeof IDENTITY_ICONS];
          const isSelected = selectedIdentity.type === identity.type;
          
          return (
            <button
              key={key}
              onClick={() => onIdentityChange(identity)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} />
                <span className={`text-sm font-medium ${
                  isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {IDENTITY_LABELS[key as keyof typeof IDENTITY_LABELS]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <strong>Reminder intervals:</strong> {selectedIdentity.reminderPresets.join(', ')} minutes
      </div>
    </div>
  );
}