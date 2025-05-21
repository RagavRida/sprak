import React from 'react';
import { Mail, Calendar, FileText, Plane, ShoppingCart, Globe, Clock, HardDrive, Calculator, Book, Music, Video } from 'lucide-react';

interface QuickLinksProps {
  onSelect: (task: string) => void;
}

export function QuickLinks({ onSelect }: QuickLinksProps) {
  const quickTasks = [
    { icon: <Mail className="h-5 w-5" />, label: 'Email', task: 'Write an email' },
    { icon: <Calendar className="h-5 w-5" />, label: 'Calendar', task: 'Schedule a meeting' },
    { icon: <FileText className="h-5 w-5" />, label: 'Documents', task: 'Summarize document' },
    { icon: <Plane className="h-5 w-5" />, label: 'Travel', task: 'Plan a trip' },
    { icon: <ShoppingCart className="h-5 w-5" />, label: 'Shopping', task: 'Find products' },
    { icon: <Globe className="h-5 w-5" />, label: 'Translate', task: 'Translate text' },
    { icon: <Clock className="h-5 w-5" />, label: 'Reminders', task: 'Set a reminder' },
    { icon: <HardDrive className="h-5 w-5" />, label: 'Files', task: 'Manage files' },
    { icon: <Calculator className="h-5 w-5" />, label: 'Math', task: 'Solve math problem' },
    { icon: <Book className="h-5 w-5" />, label: 'Research', task: 'Research topic' },
    { icon: <Music className="h-5 w-5" />, label: 'Music', task: 'Find music' },
    { icon: <Video className="h-5 w-5" />, label: 'Video', task: 'Create video script' }
  ];
  
  return (
    <div className="w-full">
      <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {quickTasks.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
            onClick={() => onSelect(item.task)}
          >
            <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-500 transition-colors">
              {item.icon}
            </div>
            <span className="mt-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}