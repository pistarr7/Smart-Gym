import React from 'react';
import Navigation from './Navigation';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  // Define views that should take up the full screen without the standard layout/nav
  const fullScreenViews = ['splash', 'welcome', 'walkthrough', 'auth', 'camera-setup', 'workout-live', 'workout-manual'];
  const isFullScreen = fullScreenViews.includes(currentView);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white flex flex-col font-sans transition-colors duration-300 relative overflow-hidden">
      
      {/* GLOBAL AMBIENT BACKGROUND (Only for main app views) */}
      {!isFullScreen && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Dot Texture */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.6] dark:opacity-[0.4]"></div>
            
            {/* Animated Blob 1 (Top Right - Primary Orange) */}
            <div className="absolute -top-[10%] -right-[10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#F97316]/20 dark:bg-[#F97316]/10 rounded-full blur-[80px] sm:blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-screen"></div>
            
            {/* Animated Blob 2 (Bottom Left - Blue/Purple for contrast) */}
            <div className="absolute -bottom-[10%] -left-[10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-blue-400/20 dark:bg-indigo-600/10 rounded-full blur-[80px] sm:blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen"></div>
            
            {/* Animated Blob 3 (Center/Random - Subtle Accent) */}
            <div className="absolute top-[40%] left-[30%] w-[200px] h-[200px] bg-purple-300/20 dark:bg-purple-900/10 rounded-full blur-[60px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
        </div>
      )}

      <main className={`flex-1 w-full max-w-md mx-auto relative z-10 ${currentView !== 'workout-live' && !isFullScreen ? 'pb-20' : ''}`}>
        {children}
      </main>
      
      {!isFullScreen && (
        <Navigation currentView={currentView} setView={setView} />
      )}
    </div>
  );
};

export default Layout;