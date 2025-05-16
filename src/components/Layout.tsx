import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Zap, Package, User, Code, Menu, X, Moon, Sun } from 'lucide-react';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const location = useLocation();
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const navItems = [
    { path: '/', label: 'Search', icon: <Search className="h-5 w-5" /> },
    { path: '/store', label: 'Store', icon: <Package className="h-5 w-5" /> },
    { path: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { path: '/contribute', label: 'Contribute', icon: <Code className="h-5 w-5" /> },
  ];
  
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Mobile navigation */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex justify-between items-center md:hidden">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Zap className="h-6 w-6 text-blue-500" />
              <span className="ml-2 font-bold text-xl">Spark</span>
            </Link>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-white dark:bg-gray-800">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center">
                  <Zap className="h-6 w-6 text-blue-500" />
                  <span className="ml-2 font-bold text-xl">Spark</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="focus:outline-none">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-6 py-3 ${
                      location.pathname === item.path
                        ? 'bg-gray-100 dark:bg-gray-750 text-blue-600'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-4">{item.label}</span>
                  </Link>
                ))}
              </div>
              
              <div className="p-4">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 mr-3" />
                  ) : (
                    <Moon className="h-5 w-5 mr-3" />
                  )}
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Desktop sidebar */}
        <div className="hidden md:flex">
          <div className="fixed top-0 left-0 h-full w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="flex flex-col h-full">
              <Link to="/" className="flex justify-center py-4">
                <Zap className="h-8 w-8 text-blue-500" />
              </Link>
              
              <nav className="flex-1 flex flex-col items-center pt-8 space-y-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`p-2 rounded-lg transition-colors group relative ${
                      location.pathname === item.path
                        ? 'text-blue-600 bg-blue-50 dark:bg-gray-700'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span className="absolute left-14 bg-gray-900 dark:bg-gray-700 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>
              
              <div className="py-4 flex justify-center">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 ml-16">
            <main className="min-h-screen">
              <Outlet />
            </main>
          </div>
        </div>
        
        {/* Mobile main content */}
        <div className="md:hidden">
          <main className="min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}