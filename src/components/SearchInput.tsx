import React, { useState } from 'react';
import { Search, Mic, Zap } from 'lucide-react';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  mode: 'search' | 'agent';
  setMode: (mode: 'search' | 'agent') => void;
  onSearch: (query: string) => void;
}

export function SearchInput({ query, setQuery, mode, setMode, onSearch }: SearchInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (newQuery.length > 2) {
      if (newQuery.toLowerCase().includes('book')) {
        setSuggestions(['Book a flight to NYC', 'Book a hotel in Paris', 'Book a restaurant for dinner']);
      } else if (newQuery.toLowerCase().includes('find')) {
        setSuggestions(['Find best restaurants near me', 'Find AI news articles', 'Find my recent documents']);
      } else {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch(query);
      setSuggestions([]);
    }
  };
  
  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center pl-4 space-x-2">
            <button
              className={`p-2 rounded-full transition-colors ${
                mode === 'search'
                  ? 'text-blue-500'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
              onClick={() => setMode('search')}
              aria-label="Search mode"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              className={`p-2 rounded-full transition-colors ${
                mode === 'agent'
                  ? 'text-blue-500'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
              onClick={() => setMode('agent')}
              aria-label="Agent mode"
            >
              <Zap className="h-5 w-5" />
            </button>
          </div>
          
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            placeholder={mode === 'search' ? 'Search anything...' : 'Describe your task...'}
            className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-800 dark:text-white placeholder-gray-400"
          />
          
          <button 
            className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Voice search"
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>
        
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200"
                    onClick={() => {
                      setQuery(suggestion);
                      setSuggestions([]);
                      onSearch(suggestion);
                    }}
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}