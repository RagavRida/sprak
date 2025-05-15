import React, { useState } from 'react';
import { SearchInput } from '../components/SearchInput';
import { ResultsPanel } from '../components/ResultsPanel';
import { QuickLinks } from '../components/QuickLinks';

export function Home() {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'search' | 'agent'>('search');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  
  const handleSearch = (query: string) => {
    setIsLoading(true);
    
    // Simulate search/agent execution
    setTimeout(() => {
      if (mode === 'search') {
        setResults([
          { id: 1, title: 'Search result 1', content: 'This is a mock search result.' },
          { id: 2, title: 'Search result 2', content: 'This is another mock search result.' },
        ]);
      } else {
        setResults([
          { id: 1, status: 'complete', agent: 'Email Agent', task: 'Send email', result: 'Email sent successfully.' }
        ]);
      }
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full max-w-2xl px-4 pt-32 md:pt-40">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-normal text-gray-800 dark:text-white mb-4">Spark</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Search or execute tasks with AI assistance</p>
        </div>
        
        <SearchInput 
          query={query} 
          setQuery={setQuery} 
          mode={mode} 
          setMode={setMode} 
          onSearch={handleSearch} 
        />
        
        {!results && !isLoading && (
          <div className="mt-12">
            <QuickLinks onSelect={(task) => {
              setQuery(task);
              setMode('agent');
              handleSearch(task);
            }} />
          </div>
        )}
      </div>
      
      {(isLoading || results) && (
        <div className="w-full max-w-3xl px-4 mt-8">
          <ResultsPanel 
            isLoading={isLoading} 
            results={results} 
            mode={mode} 
          />
        </div>
      )}
      
      <footer className="mt-auto py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Privacy</a>
          <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Terms</a>
        </div>
      </footer>
    </div>
  );
}