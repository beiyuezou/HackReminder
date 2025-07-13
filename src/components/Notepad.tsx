import React, { useState } from 'react';
import { FileText, Download, ChevronDown, ChevronUp, Mail } from 'lucide-react';

interface NotepadProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  translations: any;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Notepad({ notes, onNotesChange, translations, isCollapsed, onToggleCollapse }: NotepadProps) {
  const exportNotes = () => {
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hackathon-notes-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent('Hackathon Notes - ' + new Date().toLocaleDateString());
    const body = encodeURIComponent(
      `Hi,\n\nHere are my hackathon notes:\n\n${notes}\n\nBest regards`
    );
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <button
        onClick={onToggleCollapse}
        className="flex items-center justify-between w-full mb-4"
      >
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {translations.notepad}
          </h2>
        </div>
        {isCollapsed ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {!isCollapsed && (
        <div className="space-y-4">
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Quick notes, ideas, code snippets, links..."
            className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
          />
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {notes.length} characters
            </span>
            <div className="flex space-x-2">
              <button
                onClick={shareByEmail}
                disabled={!notes.trim()}
                className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Share via Email</span>
              </button>
              <button
                onClick={exportNotes}
                disabled={!notes.trim()}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{translations.exportNotes}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}