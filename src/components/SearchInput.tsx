import React, { useState, useEffect } from 'react';
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
  const [isListening, setIsListening] = useState(false);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (query.length > 2) {
      timeoutId = setTimeout(() => {
        // Simulate API call for suggestions
        const getSuggestions = () => {
          if (query.toLowerCase().includes('book')) {
            return ['Book a flight to NYC', 'Book a hotel in Paris', 'Book a restaurant for dinner'];
          } else if (query.toLowerCase().includes('find')) {
            return ['Find best restaurants near me', 'Find AI news articles', 'Find my recent documents'];
          } else if (query.toLowerCase().includes('email')) {
            return ['Send email to team', 'Draft email response', 'Schedule email for later'];
          } else {
            return [];
          }
        };
        
        setSuggestions(getSuggestions());
      }, 300);
    } else {
      setSuggestions([]);
    }
    
    return () => clearTimeout(timeoutId);
  }, [query]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch(query);
      setSuggestions([]);
    }
  };
  
  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      setIsListening(true);
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center pl-4 space-x-2">
            <button
              className={`p-2 rounded-full transition-colors ${
                mode === 'search'
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
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
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
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
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={mode === 'search' ? 'Search anything...' : 'Describe your task...'}
            className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-800 dark:text-white placeholder-gray-400 text-lg"
            autoComplete="off"
          />
          
          <button 
            className={`p-3 transition-colors ${
              isListening 
                ? 'text-red-500 animate-pulse'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
            }`}
            onClick={startVoiceRecognition}
            aria-label="Voice search"
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>
        
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  className="group cursor-pointer"
                >
                  <button
                    className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors flex items-center"
                    onClick={() => {
                      setQuery(suggestion);
                      setSuggestions([]);
                      onSearch(suggestion);
                    }}
                  >
                    <Search className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-center space-x-2 text-sm">
        <button 
          className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={() => {
            setQuery('Help me write an email');
            onSearch('Help me write an email');
          }}
        >
          Write Email
        </button>
        <button 
          className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={() => {
            setQuery('Summarize a document');
            onSearch('Summarize a document');
          }}
        >
          Summarize Text
        </button>
        <button 
          className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={() => {
            setQuery('Schedule a meeting');
            onSearch('Schedule a meeting');
          }}
        >
          Schedule Meeting
        </button>
      </div>
    </div>
  );
}