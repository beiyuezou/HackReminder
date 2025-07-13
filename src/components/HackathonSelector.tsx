import React, { useState } from 'react';
import { Calendar, ExternalLink, Plus, Trash2, Edit3, X } from 'lucide-react';
import { Hackathon } from '../types';
import { HACKATHONS } from '../utils/constants';

interface HackathonSelectorProps {
  selectedHackathon: Hackathon | null;
  onHackathonChange: (hackathon: Hackathon) => void;
  translations: any;
}

export default function HackathonSelector({ selectedHackathon, onHackathonChange, translations }: HackathonSelectorProps) {
  const [customHackathons, setCustomHackathons] = useState<Hackathon[]>(() => {
    try {
      const saved = localStorage.getItem('hackreminder-custom-hackathons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null);
  
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    deadline: '',
    reminderFrequency: 30
  });

  const allHackathons = [...HACKATHONS, ...customHackathons];

  const saveCustomHackathons = (hackathons: Hackathon[]) => {
    setCustomHackathons(hackathons);
    localStorage.setItem('hackreminder-custom-hackathons', JSON.stringify(hackathons));
  };

  const resetForm = () => {
    setFormData({ name: '', deadline: '', reminderFrequency: 30 });
    setShowAddForm(false);
    setShowEditForm(false);
    setEditingHackathon(null);
  };

  const handleAddHackathon = () => {
    if (!formData.name.trim() || !formData.deadline) {
      alert('请填写活动名称和截止时间');
      return;
    }

    const newHackathon: Hackathon = {
      id: `custom-${Date.now()}`,
      name: formData.name.trim(),
      deadline: formData.deadline,
      isCustom: true,
      reminderFrequency: formData.reminderFrequency,
      resources: []
    };

    const updatedHackathons = [...customHackathons, newHackathon];
    saveCustomHackathons(updatedHackathons);
    onHackathonChange(newHackathon);
    resetForm();
  };

  const handleEditHackathon = () => {
    if (!editingHackathon || !formData.name.trim() || !formData.deadline) {
      alert('请填写活动名称和截止时间');
      return;
    }

    const updatedHackathon: Hackathon = {
      ...editingHackathon,
      name: formData.name.trim(),
      deadline: formData.deadline,
      reminderFrequency: formData.reminderFrequency
    };

    if (editingHackathon.isCustom) {
      const updatedHackathons = customHackathons.map(h => 
        h.id === editingHackathon.id ? updatedHackathon : h
      );
      saveCustomHackathons(updatedHackathons);
    }

    onHackathonChange(updatedHackathon);
    resetForm();
  };

  const handleDeleteHackathon = (hackathon: Hackathon) => {
    if (!hackathon.isCustom) {
      alert('无法删除预设活动');
      return;
    }

    if (confirm(`确定要删除 "${hackathon.name}" 吗？`)) {
      const updatedHackathons = customHackathons.filter(h => h.id !== hackathon.id);
      saveCustomHackathons(updatedHackathons);
      
      if (selectedHackathon?.id === hackathon.id) {
        onHackathonChange(null as any);
      }
    }
  };

  const startEdit = (hackathon: Hackathon) => {
    setEditingHackathon(hackathon);
    setFormData({
      name: hackathon.name,
      deadline: hackathon.deadline,
      reminderFrequency: hackathon.reminderFrequency || 30
    });
    setShowEditForm(true);
  };

  const startAdd = () => {
    setFormData({ name: '', deadline: '', reminderFrequency: 30 });
    setShowAddForm(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {translations.hackathonSelector}
        </h2>
        <button
          onClick={startAdd}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">添加新活动</span>
        </button>
      </div>
      
      <div className="space-y-3">
        {allHackathons.map((hackathon) => (
          <div
            key={hackathon.id}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedHackathon?.id === hackathon.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <button
                onClick={() => onHackathonChange(hackathon)}
                className="flex-1 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 dark:text-white">
                    {hackathon.name}
                    {hackathon.isCustom && (
                      <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                        自定义
                      </span>
                    )}
                  </span>
                  <Calendar className="w-5 h-5 text-gray-500" />
                </div>
                {hackathon.deadline && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {new Date(hackathon.deadline).toLocaleString()}
                  </div>
                )}
                {hackathon.reminderFrequency && (
                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    提醒频率: 每 {hackathon.reminderFrequency} 分钟
                  </div>
                )}
              </button>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => startEdit(hackathon)}
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  title="编辑"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                {hackathon.isCustom && (
                  <button
                    onClick={() => handleDeleteHackathon(hackathon)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                    title="删除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedHackathon?.resources && selectedHackathon.resources.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">资源链接:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedHackathon.resources.map((resource, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded"
              >
                <span>{resource}</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 添加活动弹窗 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                添加新活动
              </h3>
              <button
                onClick={resetForm}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  活动名称
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="输入活动名称"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  截止时间
                </label>
                <input
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  提醒频率 (分钟)
                </label>
                <select
                  value={formData.reminderFrequency}
                  onChange={(e) => setFormData({ ...formData, reminderFrequency: Number(e.target.value) })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  <option value={15}>每 15 分钟</option>
                  <option value={30}>每 30 分钟</option>
                  <option value={60}>每 60 分钟</option>
                  <option value={120}>每 120 分钟</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddHackathon}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑活动弹窗 */}
      {showEditForm && editingHackathon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                编辑活动
              </h3>
              <button
                onClick={resetForm}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  活动名称
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="输入活动名称"
                  disabled={!editingHackathon.isCustom}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                />
                {!editingHackathon.isCustom && (
                  <p className="text-xs text-gray-500 mt-1">预设活动名称不可修改</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  截止时间
                </label>
                <input
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  提醒频率 (分钟)
                </label>
                <select
                  value={formData.reminderFrequency}
                  onChange={(e) => setFormData({ ...formData, reminderFrequency: Number(e.target.value) })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  <option value={15}>每 15 分钟</option>
                  <option value={30}>每 30 分钟</option>
                  <option value={60}>每 60 分钟</option>
                  <option value={120}>每 120 分钟</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleEditHackathon}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}