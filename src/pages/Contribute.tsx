import React, { useState } from 'react';
import { CheckCircle, AlertCircle, BarChart3, Code2, Upload, ExternalLink } from 'lucide-react';

interface Agent {
  id: number;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  usageCount: number;
  rating: number;
  description: string;
  tasks: string[];
}

export function Contribute() {
  const [agentName, setAgentName] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  
  // Mock submitted agents
  const submittedAgents: Agent[] = [
    {
      id: 1,
      name: 'Email Assistant',
      status: 'approved',
      submittedAt: '2024-02-15',
      usageCount: 1243,
      rating: 4.8,
      description: 'Handles email composition and scheduling',
      tasks: ['Send email', 'Schedule email', 'Draft reply']
    },
    {
      id: 2,
      name: 'Travel Planner',
      status: 'pending',
      submittedAt: '2024-02-20',
      usageCount: 0,
      rating: 0,
      description: 'Books flights and plans itineraries',
      tasks: ['Book flight', 'Find hotels', 'Create itinerary']
    }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setAgentName('');
      setDescription('');
      setTasks('');
      setPermissions([]);
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-normal text-gray-900 dark:text-white">Agent Development</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Create and manage your AI agents</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dashboard Overview */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-normal text-gray-900 dark:text-white mb-4">Your Agents</h2>
              
              <div className="space-y-4">
                {submittedAgents.map((agent) => (
                  <div key={agent.id} className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{agent.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{agent.description}</p>
                        <div className="flex items-center mt-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            agent.status === 'approved'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : agent.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      {agent.status === 'approved' && (
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {agent.usageCount.toLocaleString()} uses
                          </div>
                          <div className="flex items-center text-sm text-yellow-500">
                            {agent.rating} ★
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </button>
              </div>
            </div>
          </div>
          
          {/* Submission Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-normal text-gray-900 dark:text-white mb-6">Submit New Agent</h2>
              
              {submitted ? (
                <div className="flex items-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mr-3" />
                  <p className="text-green-800 dark:text-green-200">
                    Your agent has been submitted successfully and is pending review.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Agent Name
                    </label>
                    <input
                      type="text"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Email Assistant"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Describe what your agent does..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Supported Tasks (comma separated)
                    </label>
                    <input
                      type="text"
                      value={tasks}
                      onChange={(e) => setTasks(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Send email, Draft message, Schedule meeting"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Required Permissions
                    </label>
                    <div className="space-y-2">
                      {['Calendar Access', 'Email Access', 'File System', 'Network'].map((perm) => (
                        <label key={perm} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={permissions.includes(perm)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPermissions([...permissions, perm]);
                              } else {
                                setPermissions(permissions.filter(p => p !== perm));
                              }
                            }}
                            className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{perm}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Agent Code
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Drag and drop your code files here, or click to browse
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                          Supports .js, .ts, .py files up to 10MB
                        </p>
                      </div>
                      <input type="file" className="hidden" accept=".js,.ts,.py" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Submit Agent
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Preview
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Verification Process */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-normal text-gray-900 dark:text-white mb-6">Verification Process</h2>
              
              <div className="space-y-8">
                <div className="relative flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500">
                      <Code2 className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Code Review</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Our team reviews your code for security and best practices
                    </p>
                  </div>
                </div>
                
                <div className="relative flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security Check</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Verification of permissions and security compliance
                    </p>
                  </div>
                </div>
                
                <div className="relative flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Publication</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Your agent goes live in the Agent Store
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}