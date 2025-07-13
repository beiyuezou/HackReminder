import React, { useState } from 'react';
import { Plus, Trash2, Clock, CheckCircle2, Edit3, Check, X } from 'lucide-react';
import { Task } from '../types';

interface TaskChecklistProps {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  translations: any;
}

export default function TaskChecklist({ tasks, onTasksChange, translations }: TaskChecklistProps) {
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        timeTag: newTaskTime || undefined
      };
      onTasksChange([...tasks, newTask]);
      setNewTaskText('');
      setNewTaskTime('');
    }
  };

  const toggleTask = (taskId: string) => {
    onTasksChange(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    onTasksChange(tasks.filter(task => task.id !== taskId));
  };

  const startEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const saveEditTask = (taskId: string) => {
    if (editingText.trim()) {
      onTasksChange(
        tasks.map(task =>
          task.id === taskId ? { ...task, text: editingText.trim() } : task
        )
      );
    }
    setEditingTaskId(null);
    setEditingText('');
  };

  const cancelEditTask = () => {
    setEditingTaskId(null);
    setEditingText('');
  };

  const handleEditKeyPress = (e: React.KeyboardEvent, taskId: string) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEditTask(taskId);
    } else if (e.key === 'Escape') {
      cancelEditTask();
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addTask();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {translations.taskChecklist}
      </h2>

      <div className="space-y-3 mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <button
            onClick={addTask}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Time estimate (optional)"
          value={newTaskTime}
          onChange={(e) => setNewTaskTime(e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No tasks yet. Add your first task above!
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                task.completed
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  task.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                }`}
              >
                {task.completed && <CheckCircle2 className="w-4 h-4" />}
              </button>
              
              <div className="flex-1">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyPress={(e) => handleEditKeyPress(e, task.id)}
                    onBlur={() => saveEditTask(task.id)}
                    className="w-full p-1 border border-blue-300 rounded bg-white dark:bg-gray-600 text-gray-800 dark:text-white"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`${
                      task.completed
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : 'text-gray-800 dark:text-white'
                    }`}
                  >
                    {task.text}
                  </span>
                )}
                {task.timeTag && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {task.timeTag}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                {editingTaskId === task.id ? (
                  <>
                    <button
                      onClick={() => saveEditTask(task.id)}
                      className="flex-shrink-0 p-1 text-gray-400 hover:text-green-500 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEditTask}
                      className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditTask(task)}
                      className="flex-shrink-0 p-1 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}