import React from 'react';
import { Star, Download, ExternalLink } from 'lucide-react';

interface Agent {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  rating: number;
  installs: number;
  creator: string;
  tasks: string[];
}

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md mr-3">
              <span className="text-xl">{agent.icon}</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{agent.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                by {agent.creator}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{agent.rating}</span>
          </div>
        </div>
        
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
          {agent.description}
        </p>
        
        <div className="mt-4">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Supported Tasks
          </div>
          <div className="flex flex-wrap gap-2">
            {agent.tasks.map((task, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md"
              >
                {task}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-750 px-5 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {agent.installs.toLocaleString()} installs
        </div>
        
        <div className="flex space-x-2">
          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ExternalLink className="h-5 w-5" />
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center transition-colors">
            <Download className="h-4 w-4 mr-1" />
            Install
          </button>
        </div>
      </div>
    </div>
  );
}