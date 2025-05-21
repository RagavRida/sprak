import React, { useState } from 'react';
import { Search, Cpu, Loader2, ExternalLink, ThumbsUp, ThumbsDown, Share2, Copy, Check, Download } from 'lucide-react';

interface ResultsPanelProps {
  isLoading: boolean;
  results: any[] | null;
  mode: 'search' | 'agent';
}

export function ResultsPanel({ isLoading, results, mode }: ResultsPanelProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedResult, setExpandedResult] = useState<number | null>(null);
  
  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };
  
  const shareResult = async (result: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: mode === 'search' ? result.title : 'Task Result',
          text: mode === 'search' ? result.content : result.result,
          url: window.location.href
        });
      } catch (err) {
        console.error('Failed to share:', err);
      }
    } else {
      copyToClipboard(
        mode === 'search' ? result.content : result.result,
        mode === 'search' ? result.id : 0
      );
    }
  };
  
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            {mode === 'search' ? 'Searching for results...' : 'Running your task...'}
          </p>
          {mode === 'agent' && (
            <div className="mt-6 w-full max-w-md">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    <span>Selecting Agent</span>
                    <span>Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    <span>Processing Task</span>
                    <span>In Progress</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-2/3 animate-pulse"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    <span>Generating Response</span>
                    <span>Pending</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-300 dark:bg-gray-600 h-2 rounded-full w-0"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  if (!results) return null;
  
  return (
    <div className="w-full max-w-4xl">
      {mode === 'search' ? (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start">
              <Search className="h-5 w-5 text-blue-500 mt-1 mr-3" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Search Results</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Found {results.length} results for your query
                </p>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {results.map((result, index) => (
              <div 
                key={result.id} 
                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
                  expandedResult === index ? 'bg-gray-50 dark:bg-gray-750' : ''
                }`}
              >
                <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                  {result.title}
                </h3>
                <p className={`text-gray-700 dark:text-gray-300 mb-3 ${
                  expandedResult === index ? '' : 'line-clamp-3'
                }`}>
                  {result.content}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setExpandedResult(expandedResult === index ? null : index)}
                    className="text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    {expandedResult === index ? 'Show less' : 'Read more'}
                  </button>
                  <div className="flex items-center space-x-3">
                    <button
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1"
                      onClick={() => copyToClipboard(result.content, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1">
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1">
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1"
                      onClick={() => shareResult(result)}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-650 transition-colors">
              Load More Results
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start">
              <Cpu className="h-5 w-5 text-purple-500 mt-1 mr-3" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Task Completed</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Task processed by {results[0].agent}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{results[0].task}</h3>
            
            <div className="mb-6 bg-gray-50 dark:bg-gray-750 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{results[0].result}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center mb-4 sm:mb-0">
                <p className="text-sm text-gray-600 dark:text-gray-400 mr-3">Was this result helpful?</p>
                <button className="text-gray-500 hover:text-green-500 transition-colors mr-2">
                  <ThumbsUp className="h-5 w-5" />
                </button>
                <button className="text-gray-500 hover:text-red-500 transition-colors">
                  <ThumbsDown className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => copyToClipboard(results[0].result, 0)}
                >
                  {copiedIndex === 0 ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </button>
                <button 
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => shareResult(results[0])}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}