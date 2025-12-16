import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SplashScreen from './views/SplashScreen';
import Welcome from './views/Welcome';
import Walkthrough from './views/Walkthrough';
import Auth from './views/Auth';
import Assessment from './views/Onboarding'; // This is screen 5
import Dashboard from './views/Dashboard';
import CameraSetup from './views/CameraSetup'; // Import new view
import WorkoutLive from './views/WorkoutLive';
import WorkoutManual from './views/WorkoutManual'; // Import new view
import Analytics from './views/Analytics';
import Profile from './views/Profile';
import Program from './views/Program'; // Import new view
import Subscription from './views/Subscription'; // Import new view
import { AppView, UserProfile } from './types';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('splash');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authDefaultLogin, setAuthDefaultLogin] = useState(false);
  const [previousView, setPreviousView] = useState<AppView>('dashboard');
  
  // Lifted State for Device Persistence
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);

  // Screen 1: Splash Screen Logic
  useEffect(() => {
    if (currentView === 'splash') {
      const timer = setTimeout(() => {
        setCurrentView('welcome');
      }, 3000); // 3.0s total duration (0.5s delay + 1s fade + 1.5s hold)
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const handleAssessmentComplete = (profile: UserProfile) => {
    setUser(profile);
    setCurrentView('dashboard');
  };

  const handleUpdateProfile = (updatedData: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsDeviceConnected(false); // Reset device connection on logout
    setCurrentView('welcome');
  };

  const navigateToSubscription = () => {
    if (currentView !== 'subscription') {
        setPreviousView(currentView);
        setCurrentView('subscription');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'splash':
        return <SplashScreen />;
        
      case 'welcome': // Screen 2
        return (
          <Welcome 
            onStart={() => {
              setAuthDefaultLogin(false); // Sign up flow
              setCurrentView('walkthrough');
            }} 
            onLogin={() => {
              setAuthDefaultLogin(true); // Login flow
              setCurrentView('auth');
            }} 
          />
        );
        
      case 'walkthrough': // Screen 3
        return <Walkthrough onFinish={() => setCurrentView('auth')} />;
        
      case 'auth': // Screen 4
        return (
          <Auth 
            defaultIsLogin={authDefaultLogin}
            onLogin={(profile) => {
              // Direct login skips assessment
              setUser(profile);
              setCurrentView('dashboard');
            }}
            onSignUp={() => {
              // New user goes to assessment
              setCurrentView('assessment');
            }} 
          />
        );
        
      case 'assessment': // Screen 5
        return <Assessment onComplete={handleAssessmentComplete} />;
        
      case 'dashboard': // Screen 6
        return user ? (
          <Dashboard 
            user={user} 
            isDeviceConnected={isDeviceConnected}
            onToggleDeviceConnection={setIsDeviceConnected}
            onStartWorkout={(mode) => {
              if (mode === 'ai') {
                setCurrentView('camera-setup');
              } else {
                // Manual mode goes to new manual screen
                setCurrentView('workout-manual');
              }
            }} 
            onUpgrade={navigateToSubscription}
            onUpdateProfile={handleUpdateProfile}
            onNavigate={setCurrentView}
            onLogout={handleLogout}
          />
        ) : null;
      
      case 'camera-setup': // New Screen
        return (
          <CameraSetup 
             onSetupComplete={() => setCurrentView('workout-live')}
             onCancel={() => setCurrentView('dashboard')}
          />
        );
        
      case 'workout-live':
        return <WorkoutLive onClose={() => setCurrentView('dashboard')} />;
      
      case 'workout-manual':
        return <WorkoutManual onClose={() => setCurrentView('dashboard')} />;
      
      case 'program':
        return <Program />;
        
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return user ? (
          <Profile 
            user={user} 
            isDeviceConnected={isDeviceConnected}
            onUpgrade={navigateToSubscription} 
            onUpdateProfile={handleUpdateProfile}
            onLogout={handleLogout}
          />
        ) : null;
        
      case 'subscription':
        return <Subscription onClose={() => setCurrentView(previousView)} />;
        
      default:
        return <div>Not found</div>;
    }
  };

  return (
    <ThemeProvider>
      <Layout currentView={currentView} setView={setCurrentView}>
        {renderView()}
      </Layout>
    </ThemeProvider>
  );
};

export default App;