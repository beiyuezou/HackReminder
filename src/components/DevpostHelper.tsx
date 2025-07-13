import React, { useState } from 'react';
import { Award, Copy, Check, ChevronDown, ChevronUp, Edit3, Save, X } from 'lucide-react';
import { DEVPOST_TEMPLATES } from '../utils/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface DevpostHelperProps {
  translations: any;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function DevpostHelper({ translations, isCollapsed, onToggleCollapse }: DevpostHelperProps) {
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [devpostTemplates, setDevpostTemplates] = useLocalStorage('hackreminder-devpost-templates', DEVPOST_TEMPLATES);
  const [editingTemplateKey, setEditingTemplateKey] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const copyTemplate = async (templateKey: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedTemplate(templateKey);
      setTimeout(() => setCopiedTemplate(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const startEditTemplate = (templateKey: string, content: string) => {
    setEditingTemplateKey(templateKey);
    setEditingContent(content);
  };

  const saveEditTemplate = (templateKey: string) => {
    if (editingContent.trim()) {
      const updatedTemplates = {
        ...devpostTemplates,
        [templateKey]: {
          ...devpostTemplates[templateKey],
          content: editingContent.trim()
        }
      };
      setDevpostTemplates(updatedTemplates);
    }
    setEditingTemplateKey(null);
    setEditingContent('');
  };

  const cancelEditTemplate = () => {
    setEditingTemplateKey(null);
    setEditingContent('');
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <button
        onClick={onToggleCollapse}
        className="flex items-center justify-between w-full mb-4"
      >
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {translations.devpostHelper}
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
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Ready-to-use templates for your Devpost submission
          </p>
          
          {Object.entries(devpostTemplates).map(([key, template]) => (
            <div
              key={key}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {template.title}
                </h3>
                <div className="flex items-center space-x-2">
                  {editingTemplateKey === key ? (
                    <>
                      <button
                        onClick={() => saveEditTemplate(key)}
                        className="flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span className="text-sm">Save</span>
                      </button>
                      <button
                        onClick={cancelEditTemplate}
                        className="flex items-center space-x-1 px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-all"
                      >
                        <X className="w-4 h-4" />
                        <span className="text-sm">Cancel</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditTemplate(key, template.content)}
                        className="flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span className="text-sm">Edit</span>
                      </button>
                      <button
                        onClick={() => copyTemplate(key, template.content)}
                        className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all ${
                          copiedTemplate === key
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                            : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/30'
                        }`}
                      >
                        {copiedTemplate === key ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span className="text-sm">{translations.copyTemplate}</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
              {editingTemplateKey === key ? (
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="w-full h-24 p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
                  placeholder="Edit template content..."
                />
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {template.content}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}