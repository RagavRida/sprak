import React from 'react';
import { Mail, Calendar, FileText, Plane, ShoppingCart, Globe, Clock, HardDrive } from 'lucide-react';

interface QuickLinksProps {
  onSelect: (task: string) => void;
}

export function QuickLinks({ onSelect }: QuickLinksProps) {
  const quickTasks = [
    { icon: <Mail />, label: 'Email', task: 'Send an email' },
    { icon: <Calendar />, label: 'Calendar', task: 'Schedule a meeting' },
    { icon: <FileText />, label: 'Documents', task: 'Summarize document' },
    { icon: <Plane />, label: 'Travel', task: 'Book a flight' },
    { icon: <ShoppingCart />, label: 'Shopping', task: 'Find products' },
    { icon: <Globe />, label: 'Translate', task: 'Translate text' },
    { icon: <Clock />, label: 'Reminders', task: 'Set a reminder' },
    { icon: <HardDrive />, label: 'Files', task: 'Manage files' }
  ];
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {quickTasks.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center group"
            onClick={() => onSelect(item.task)}
          >
            <div className="p-3 rounded-full text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
              {item.icon}
            </div>
            <span className="mt-2 text-xs text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}