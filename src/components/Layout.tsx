import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Zap, Package, User, Code, Menu, X, Moon, Sun } from 'lucide-react';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user previously set dark mode
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const location = useLocation();
  
  useEffect(() => {
    // Update dark mode class and save preference
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
    { path: '/', label: 'Home', icon: <Search className="h-5 w-5" /> },
    { path: '/store', label: 'Agent Store', icon: <Package className="h-5 w-5" /> },
    { path: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { path: '/contribute', label: 'Contribute', icon: <Code className="h-5 w-5" /> },
  ];
  
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
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
              <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
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
                    className={`flex items-center px-4 py-3 ${
                      location.pathname === item.path
                        ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                ))}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center w-full px-4 py-2 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
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
        <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white dark:bg-gray-800 shadow-md z-10">
          <div className="flex flex-col h-full">
            <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
              <Link to="/" className="flex items-center">
                <Zap className="h-6 w-6 text-blue-500" />
                <span className="ml-2 font-bold text-xl">Spark</span>
              </Link>
            </div>
            
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="px-3 mt-6 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleDarkMode}
                className="flex items-center w-full px-4 py-2 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
        
        {/* Main content */}
        <div className="md:pl-64">
          <main className="min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}