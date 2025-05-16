import React, { useState } from 'react';
import { CheckCircle, AlertCircle, BarChart3, Code2, Upload, ExternalLink, Sun, Moon, Star, Download } from 'lucide-react';

interface Agent {
  id: number;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  usageCount: number;
  rating: number;
  description: string;
  tasks: string[];
  executionMethod: string;
  callbackStructure: string;
}

export function Contribute() {
  const [agentName, setAgentName] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState('');
  const [executionMethod, setExecutionMethod] = useState('');
  const [callbackStructure, setCallbackStructure] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
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
      tasks: ['Send email', 'Schedule email', 'Draft reply'],
      executionMethod: 'REST API',
      callbackStructure: 'JSON'
    },
    {
      id: 2,
      name: 'Travel Planner',
      status: 'pending',
      submittedAt: '2024-02-20',
      usageCount: 0,
      rating: 0,
      description: 'Books flights and plans itineraries',
      tasks: ['Book flight', 'Find hotels', 'Create itinerary'],
      executionMethod: 'GraphQL',
      callbackStructure: 'JSON'
    }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setAgentName('');
      setDescription('');
      setTasks('');
      setExecutionMethod('');
      setCallbackStructure('');
      setPermissions([]);
      setSubmitted(false);
      setPreviewMode(false);
    }, 3000);
  };

  const AgentPreview = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md mr-3">
              <Code2 className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{agentName || 'Agent Name'}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">by You</p>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New</span>
          </div>
        </div>
        
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
          {description || 'Agent description will appear here'}
        </p>
        
        <div className="mt-4">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Supported Tasks
          </div>
          <div className="flex flex-wrap gap-2">
            {(tasks ? tasks.split(',') : ['Example Task 1', 'Example Task 2']).map((task, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md"
              >
                {task.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-750 px-5 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Preview Mode
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center transition-colors">
          <Download className="h-4 w-4 mr-1" />
          Install
        </button>
      </div>
    </div>
  );
  
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-normal text-gray-900 dark:text-white">Agent Development</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Create and manage your AI agents</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
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
                      Execution Method
                    </label>
                    <select
                      value={executionMethod}
                      onChange={(e) => setExecutionMethod(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select execution method</option>
                      <option value="REST">REST API</option>
                      <option value="GraphQL">GraphQL</option>
                      <option value="WebSocket">WebSocket</option>
                      <option value="gRPC">gRPC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Callback Structure
                    </label>
                    <textarea
                      value={callbackStructure}
                      onChange={(e) => setCallbackStructure(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Describe your callback structure (JSON schema, GraphQL type, etc.)"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Required Permissions
                    </label>
                    <div className="space-y-2">
                      {['Calendar Access', 'Email Access', 'File System', 'Network', 'Database', 'External APIs'].map((perm) => (
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
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Submit Agent
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewMode(!previewMode)}
                        className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        {previewMode ? 'Hide Preview' : 'Preview'}
                      </button>
                    </div>
                  </div>

                  {previewMode && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preview</h3>
                      <AgentPreview />
                    </div>
                  )}
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