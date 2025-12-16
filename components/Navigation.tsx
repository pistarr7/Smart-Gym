import React from 'react';
import { Home, Calendar, BarChart2, User } from 'lucide-react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  // Only show nav on main app screens
  const mainScreens = ['dashboard', 'program', 'analytics', 'profile'];
  
  if (!mainScreens.includes(currentView)) return null;

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'program', icon: Calendar, label: 'Program' },
    { id: 'analytics', icon: BarChart2, label: 'Stats' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 pb-safe z-50 transition-colors duration-300">
      <div className="flex justify-between items-center h-20 max-w-md mx-auto px-6">
        {navItems.map((item) => {
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as AppView)}
              className={`flex flex-col items-center justify-center space-y-1.5 transition-all duration-300 ${
                isActive ? 'text-[#F97316]' : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-medium transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;