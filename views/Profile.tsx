import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Edit2, ChevronRight, Bell, CreditCard, HelpCircle, LogOut, 
  Mic2, Watch, Zap, Award, Calendar, Settings,
  X, Check, Play, Pause, Megaphone, Flower2, Smile,
  Dumbbell, ShieldAlert, Utensils, Globe,
  Camera, Image as ImageIcon, Trash2, Eye, Scale, Ruler,
  Sun, Moon, Smartphone, Palette, Target, Activity, ShieldCheck, Heart
} from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  isDeviceConnected: boolean; // Received from App state
  onUpgrade?: () => void;
  onUpdateProfile?: (data: Partial<UserProfile>) => void;
  onLogout?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, isDeviceConnected, onUpgrade, onUpdateProfile, onLogout }) => {
  const { theme, setTheme } = useTheme();

  // Existing State
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState('The Sergeant');
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);

  // Interaction State
  const [isEditMetricsOpen, setIsEditMetricsOpen] = useState(false);
  const [isPhotoActionSheetOpen, setIsPhotoActionSheetOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false); // New State for Goal Modal

  // Data State
  const [weight, setWeight] = useState(parseFloat(user.weight) || 72.5);
  const [height, setHeight] = useState(parseFloat(user.height) || 175);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [language, setLanguage] = useState<'en' | 'id'>('en');

  // Sync state if user prop changes (e.g. from Dashboard)
  useEffect(() => {
    setWeight(parseFloat(user.weight) || 72.5);
    setHeight(parseFloat(user.height) || 175);
  }, [user.weight, user.height]);

  // Mock Data
  const displayName = user.name || "Alex Sander";
  const level = "Level 12 • Beast Mode";
  
  // AI Customization Data
  const equipmentList = "Dumbbells, Yoga Mat, Bands";
  const injuriesList = "Avoid: High Impact (Left Knee)";
  const dietList = "Halal, High Protein";

  const goals = [
    { id: 'muscle', label: 'Build Muscle', desc: 'Strength & Hypertrophy', icon: Dumbbell, color: 'bg-blue-500' },
    { id: 'weight_loss', label: 'Lose Weight', desc: 'Burn Fat & Get Lean', icon: Activity, color: 'bg-orange-500' },
    { id: 'endurance', label: 'Endurance', desc: 'Cardio & Stamina', icon: ShieldCheck, color: 'bg-green-500' },
    { id: 'general', label: 'General Health', desc: 'Active Lifestyle', icon: Heart, color: 'bg-purple-500' },
  ];

  const coaches = [
    {
      id: 'The Sergeant',
      icon: Megaphone,
      desc: 'Intense, High Energy, No Excuses.',
      quote: '"Push harder! No pain no gain!"',
    },
    {
      id: 'The Zen Master',
      icon: Flower2,
      desc: 'Calm, Focused, Breath-work.',
      quote: '"Focus on your breath. Control the movement."',
    },
    {
      id: 'The Best Friend',
      icon: Smile,
      desc: 'Supportive, Cheerful, Motivating.',
      quote: '"You\'re doing great! Keep it up!"',
    }
  ];

  const handlePlayPreview = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (playingPreview === id) {
      setPlayingPreview(null);
    } else {
      setPlayingPreview(id);
      setTimeout(() => {
        setPlayingPreview((prev) => (prev === id ? null : prev));
      }, 3000);
    }
  };

  const handleSaveMetrics = () => {
    if (onUpdateProfile) {
        onUpdateProfile({ 
            weight: weight.toString(), 
            height: height.toString() 
        });
    }
    setIsEditMetricsOpen(false);
  };

  const handleUpdateGoal = (newGoal: any) => {
      if (onUpdateProfile) {
          onUpdateProfile({ goal: newGoal });
      }
      setIsGoalModalOpen(false);
  };

  // Reusable Setting Row Component
  const SettingRow = ({ icon: Icon, label, value, onClick, colorClass = "text-gray-400", subValueIcon }: any) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group border-b border-gray-100 dark:border-white/5 last:border-0"
    >
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#111214] flex items-center justify-center border border-gray-200 dark:border-white/5 group-hover:border-[#FF5722]/30 transition-colors`}>
                <Icon size={18} className={colorClass} />
            </div>
            <div className="text-left">
                <p className="text-gray-900 dark:text-white font-medium text-sm">{label}</p>
                {value && <p className="text-gray-500 text-xs mt-0.5 font-medium flex items-center gap-1">
                   {subValueIcon} {value}
                </p>}
            </div>
        </div>
        <ChevronRight size={18} className="text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
    </button>
  );
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#000000] text-gray-900 dark:text-white pb-32 font-sans animate-in fade-in duration-500 transition-colors">
      
      {/* 1. IDENTITY HEADER */}
      <div className="pt-safe px-6 pb-6 flex flex-col items-center text-center bg-white/50 dark:bg-gradient-to-b dark:from-[#111214] dark:to-transparent border-b border-gray-200 dark:border-white/5 backdrop-blur-sm">
        <button 
          onClick={() => setIsPhotoActionSheetOpen(true)}
          className="relative mb-3 group cursor-pointer active:scale-95 transition-transform"
        >
           <div className="absolute inset-0 bg-[#FF5722] rounded-full blur-md opacity-20 dark:opacity-40 group-hover:opacity-40 dark:group-hover:opacity-60 transition-opacity"></div>
           <div className="w-24 h-24 rounded-full p-1 bg-white dark:bg-black relative z-10 border border-gray-200 dark:border-[#FF5722] group-hover:border-[#FF5722] dark:group-hover:border-white transition-colors">
              <img 
                src={`https://ui-avatars.com/api/?name=${displayName}&background=1C1E24&color=fff&size=200`}
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
              {/* Camera Icon Overlay */}
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={24} className="text-white" />
              </div>
           </div>
           <div className="absolute bottom-0 right-0 bg-[#FF5722] p-1.5 rounded-full border-4 border-white dark:border-black z-20">
              <Award size={14} className="text-white" fill="currentColor" />
           </div>
        </button>

        <h1 className="text-xl font-black text-gray-900 dark:text-white mb-1">{displayName}</h1>
        <div className="inline-flex items-center px-2 py-0.5 bg-[#FF5722]/10 border border-[#FF5722]/30 rounded-md mb-3">
           <span className="text-[#FF5722] text-[10px] font-bold uppercase tracking-wider">{level}</span>
        </div>
      </div>

      <div className="px-5 space-y-6 mt-6">

        {/* 2. BIOMETRICS SECTION */}
        <div>
            <div className="flex justify-between items-end mb-2 px-1">
                <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">My Biometrics</h3>
                <button 
                  onClick={() => setIsEditMetricsOpen(true)}
                  className="text-[#FF5722] text-[10px] font-bold flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <Edit2 size={12} /> Edit
                </button>
            </div>
            <div className="bg-white dark:bg-[#1C1E24] rounded-2xl border border-gray-200 dark:border-white/5 p-4 flex divide-x divide-gray-100 dark:divide-white/5 shadow-sm dark:shadow-none transition-colors">
                <div className="flex-1 flex flex-col items-center">
                    <span className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase">Weight</span>
                    <span className="text-gray-900 dark:text-white font-bold text-lg">{weight} <span className="text-xs text-gray-500 font-normal">{weightUnit}</span></span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                    <span className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase">Height</span>
                    <span className="text-gray-900 dark:text-white font-bold text-lg">{height} <span className="text-xs text-gray-500 font-normal">{heightUnit}</span></span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                    <span className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase">Age</span>
                    <span className="text-gray-900 dark:text-white font-bold text-lg">{user.age || 24} <span className="text-xs text-gray-500 font-normal">yo</span></span>
                </div>
            </div>
        </div>

        {/* 3. AI CUSTOMIZATION */}
        <div>
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-2 px-1">AI Customization</h3>
            <div className="bg-white dark:bg-[#1C1E24] rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm dark:shadow-none transition-colors">
                <SettingRow
                    icon={Target}
                    label="Primary Goal"
                    value={goals.find(g => g.id === user.goal)?.label || 'General Health'}
                    colorClass="text-[#FF5722]"
                    onClick={() => setIsGoalModalOpen(true)}
                />
                <SettingRow 
                    icon={Dumbbell} 
                    label="Equipment Inventory" 
                    value={equipmentList} 
                    colorClass="text-blue-500"
                />
                <SettingRow 
                    icon={ShieldAlert} 
                    label="Injuries & Constraints" 
                    value={injuriesList} 
                    colorClass="text-red-500"
                />
                <SettingRow 
                    icon={Utensils} 
                    label="Dietary Preferences" 
                    value={dietList} 
                    colorClass="text-green-500"
                />
            </div>
        </div>

        {/* 4. COACH & DEVICE */}
        <div>
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-2 px-1">Intelligence</h3>
            <div className="bg-white dark:bg-[#1C1E24] rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm dark:shadow-none transition-colors">
                <SettingRow 
                    icon={Mic2} 
                    label="Coach Personality" 
                    value={selectedCoach} 
                    colorClass="text-[#FF5722]"
                    onClick={() => setIsCoachModalOpen(true)}
                />
                <SettingRow 
                    icon={Watch} 
                    label="Smartwatch" 
                    value={isDeviceConnected ? "Galaxy Watch 6 (Connected)" : "No Device"}
                    colorClass={isDeviceConnected ? "text-green-500" : "text-purple-500"}
                    subValueIcon={isDeviceConnected ? <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> : null}
                />
            </div>
        </div>

        {/* 5. APP SETTINGS */}
        <div>
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-2 px-1">App Settings</h3>
            <div className="bg-white dark:bg-[#1C1E24] rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm dark:shadow-none transition-colors">
                 <SettingRow 
                    icon={CreditCard} 
                    label="Subscription" 
                    value="Upgrade to Elite" 
                    colorClass="text-amber-500"
                    onClick={onUpgrade} 
                 />
                 <SettingRow 
                    icon={Globe} 
                    label="Language" 
                    value={language === 'en' ? "English (US)" : "Bahasa Indonesia"} 
                    colorClass="text-blue-500 dark:text-white" 
                    onClick={() => setIsLanguageModalOpen(true)}
                 />
                 <SettingRow 
                    icon={Palette} 
                    label="Appearance" 
                    value={theme === 'system' ? 'System Default' : theme === 'dark' ? 'Dark Mode' : 'Light Mode'} 
                    colorClass="text-purple-500 dark:text-white"
                    onClick={() => setIsThemeModalOpen(true)}
                 />
                 <SettingRow icon={Bell} label="Notifications" value="On" colorClass="text-gray-400 dark:text-white" />
                 <SettingRow icon={HelpCircle} label="Help & Support" colorClass="text-gray-400 dark:text-white" />
            </div>
        </div>

        {/* LOGOUT */}
        <button 
            onClick={onLogout}
            className="w-full py-4 text-red-500 text-sm font-bold hover:bg-red-500/5 rounded-2xl transition-colors"
        >
            Log Out
        </button>

      </div>

      {/* ================= MODAL: GOAL SELECTION ================= */}
      {isGoalModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm transition-opacity" onClick={() => setIsGoalModalOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1C1E24] rounded-t-[2.5rem] z-[110] animate-in slide-in-from-bottom duration-300 border-t border-gray-200 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 max-h-[85vh] overflow-y-auto">
              
              <div className="sticky top-0 bg-white dark:bg-[#1C1E24] pt-6 pb-4 px-6 z-10 flex flex-col items-center rounded-t-[2.5rem] transition-colors">
                  <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mb-6 opacity-50"></div>
                  <div className="w-full flex justify-between items-center mb-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Change Focus</h2>
                      <button onClick={() => setIsGoalModalOpen(false)} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <X size={20} />
                      </button>
                  </div>
                  <p className="w-full text-left text-gray-500 dark:text-gray-400 text-sm">Update your primary goal to recalibrate the AI plan.</p>
              </div>

              <div className="px-6 pb-10 space-y-3">
                  {goals.map((g) => {
                      const isSelected = user.goal === g.id;
                      return (
                          <button
                            key={g.id}
                            onClick={() => handleUpdateGoal(g.id)}
                            className={`w-full flex items-center p-4 rounded-2xl border-2 text-left transition-all ${
                                isSelected 
                                ? 'bg-[#FF5722]/10 border-[#FF5722]' 
                                : 'bg-gray-50 dark:bg-[#121212] border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10'
                            }`}
                          >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#FF5722] text-white' : 'bg-gray-200 dark:bg-[#1C1E24] text-gray-500'}`}>
                                  <g.icon size={22} />
                              </div>
                              <div className="ml-4 flex-1">
                                  <div className="flex justify-between items-center">
                                      <h3 className={`font-bold text-base ${isSelected ? 'text-[#FF5722]' : 'text-gray-900 dark:text-white'}`}>{g.label}</h3>
                                      {isSelected && <Check size={18} className="text-[#FF5722]" />}
                                  </div>
                                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{g.desc}</p>
                              </div>
                          </button>
                      );
                  })}
              </div>
          </div>
        </>
      )}

      {/* ================= MODAL: LANGUAGE SELECTION ================= */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setIsLanguageModalOpen(false)} />
            <div className="bg-white dark:bg-[#1C1E24] w-full max-w-sm rounded-3xl p-6 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Select Language</h3>
                    <button onClick={() => setIsLanguageModalOpen(false)} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                <div className="space-y-3">
                    {[
                        { code: 'en', label: 'English (US)', flag: '🇺🇸' },
                        { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' }
                    ].map((opt) => (
                        <button
                            key={opt.code}
                            onClick={() => {
                                setLanguage(opt.code as any);
                                setIsLanguageModalOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                                language === opt.code
                                    ? 'bg-[#FF5722]/10 border-[#FF5722]'
                                    : 'bg-gray-50 dark:bg-[#111214] border-transparent hover:bg-gray-100 dark:hover:bg-white/5'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{opt.flag}</span>
                                <span className={`font-medium ${language === opt.code ? 'text-[#FF5722]' : 'text-gray-900 dark:text-white'}`}>
                                    {opt.label}
                                </span>
                            </div>
                            {language === opt.code && (
                                <div className="w-6 h-6 bg-[#FF5722] rounded-full flex items-center justify-center">
                                    <Check size={14} className="text-white" strokeWidth={3} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* ================= MODAL: THEME SELECTION ================= */}
      {isThemeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setIsThemeModalOpen(false)} />
            <div className="bg-white dark:bg-[#1C1E24] w-full max-w-sm rounded-3xl p-6 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">App Appearance</h3>
                    <button onClick={() => setIsThemeModalOpen(false)} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                <div className="space-y-3">
                    {[
                        { id: 'system', label: 'System Default', icon: Smartphone },
                        { id: 'light', label: 'Light Mode', icon: Sun },
                        { id: 'dark', label: 'Dark Mode', icon: Moon }
                    ].map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => {
                                setTheme(opt.id as any);
                                // Optional: Close modal after selection or keep open
                                // setIsThemeModalOpen(false); 
                            }}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                                theme === opt.id
                                    ? 'bg-[#FF5722]/10 border-[#FF5722]'
                                    : 'bg-gray-50 dark:bg-[#111214] border-transparent hover:bg-gray-100 dark:hover:bg-white/5'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${theme === opt.id ? 'bg-[#FF5722] text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400'}`}>
                                    <opt.icon size={18} />
                                </div>
                                <span className={`font-medium ${theme === opt.id ? 'text-[#FF5722]' : 'text-gray-900 dark:text-white'}`}>
                                    {opt.label}
                                </span>
                            </div>
                            {theme === opt.id && (
                                <div className="w-6 h-6 bg-[#FF5722] rounded-full flex items-center justify-center">
                                    <Check size={14} className="text-white" strokeWidth={3} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* ================= MODAL: COACH PERSONALITY SELECTION ================= */}
      {isCoachModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 z-[80] backdrop-blur-sm transition-opacity" onClick={() => setIsCoachModalOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1C1E24] rounded-t-[2.5rem] z-[90] animate-in slide-in-from-bottom duration-300 border-t border-gray-200 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 max-h-[85vh] overflow-y-auto">
              
              <div className="sticky top-0 bg-white dark:bg-[#1C1E24] pt-6 pb-4 px-6 z-10 flex flex-col items-center rounded-t-[2.5rem] transition-colors">
                  <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mb-6 opacity-50"></div>
                  <div className="w-full flex justify-between items-center mb-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Your AI Trainer</h2>
                      <button onClick={() => setIsCoachModalOpen(false)} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <X size={20} />
                      </button>
                  </div>
                  <p className="w-full text-left text-gray-500 dark:text-gray-400 text-sm">Select the voice and personality that drives you best.</p>
              </div>

              <div className="px-6 pb-10 space-y-4">
                  {coaches.map((coach) => {
                      const isSelected = selectedCoach === coach.id;
                      const isPlaying = playingPreview === coach.id;

                      return (
                          <button
                            key={coach.id}
                            onClick={() => setSelectedCoach(coach.id)}
                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all relative overflow-hidden group ${
                                isSelected 
                                ? 'bg-[#FF5722]/10 border-[#FF5722]' 
                                : 'bg-gray-50 dark:bg-[#121212] border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10'
                            }`}
                          >
                              {isSelected && (
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5722] blur-[60px] opacity-10"></div>
                              )}
                              <div className="flex items-start gap-4 relative z-10">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${isSelected ? 'bg-[#FF5722] text-white border-[#FF5722]' : 'bg-white dark:bg-[#1C1E24] text-gray-400 border-gray-200 dark:border-white/5'}`}>
                                      <coach.icon size={24} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-start">
                                          <h3 className={`font-bold text-base mb-1 ${isSelected ? 'text-[#FF5722]' : 'text-gray-900 dark:text-white'}`}>{coach.id}</h3>
                                          {isSelected && <Check size={18} className="text-[#FF5722]" />}
                                      </div>
                                      <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 font-medium">{coach.desc}</p>
                                      <div className="bg-gray-200 dark:bg-[#000000]/40 rounded-lg p-2.5 flex items-center gap-3 border border-gray-300 dark:border-white/5">
                                          <div 
                                            onClick={(e) => handlePlayPreview(e, coach.id)}
                                            className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/20 transition-colors cursor-pointer shrink-0 shadow-sm dark:shadow-none"
                                          >
                                              {isPlaying ? <Pause size={14} className="text-[#FF5722]" fill="currentColor" /> : <Play size={14} className="text-gray-900 dark:text-white" fill="currentColor" />}
                                          </div>
                                          <div className="flex-1">
                                              {isPlaying ? (
                                                  <div className="flex items-center gap-0.5 h-3">
                                                      {[...Array(12)].map((_, i) => (
                                                          <div 
                                                            key={i} 
                                                            className="w-0.5 bg-[#FF5722] rounded-full animate-pulse" 
                                                            style={{ 
                                                              height: `${Math.random() * 100}%`,
                                                              animationDelay: `${i * 0.1}s` 
                                                            }}
                                                          ></div>
                                                      ))}
                                                  </div>
                                              ) : (
                                                 <p className="text-gray-600 dark:text-white/60 text-[10px] italic line-clamp-1">{coach.quote}</p>
                                              )}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </button>
                      );
                  })}
              </div>
          </div>
        </>
      )}

      {/* ================= INTERACTION 1: EDIT METRICS MODAL ================= */}
      {isEditMetricsOpen && (
        <>
            <div className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm transition-opacity" onClick={() => setIsEditMetricsOpen(false)} />
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1C1E24] rounded-t-[2.5rem] z-[110] animate-in slide-in-from-bottom duration-300 border-t border-gray-200 dark:border-white/10 p-6 pb-safe transition-colors">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-6 opacity-50"></div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Update Body Data</h2>
                    <button onClick={() => setIsEditMetricsOpen(false)} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Weight Input */}
                    <div className="bg-gray-50 dark:bg-[#111214] p-4 rounded-2xl border border-gray-200 dark:border-white/5 focus-within:border-[#FF5722] transition-colors">
                        <div className="flex items-center justify-between mb-2">
                             <label className="text-gray-500 text-xs uppercase font-bold tracking-wider flex items-center gap-2">
                                <Scale size={14} /> Current Weight
                             </label>
                             <div className="flex bg-gray-200 dark:bg-[#252830] rounded-lg p-0.5">
                                 <button 
                                    onClick={() => setWeightUnit('kg')}
                                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${weightUnit === 'kg' ? 'bg-[#FF5722] text-white shadow' : 'text-gray-500'}`}
                                 >KG</button>
                                 <button 
                                    onClick={() => setWeightUnit('lbs')}
                                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${weightUnit === 'lbs' ? 'bg-[#FF5722] text-white shadow' : 'text-gray-500'}`}
                                 >LBS</button>
                             </div>
                        </div>
                        <input 
                           type="number" 
                           value={weight}
                           onChange={(e) => setWeight(parseFloat(e.target.value))}
                           className="w-full bg-transparent text-4xl font-black text-gray-900 dark:text-white outline-none placeholder-gray-400 dark:placeholder-gray-700"
                        />
                    </div>

                    {/* Height Input */}
                    <div className="bg-gray-50 dark:bg-[#111214] p-4 rounded-2xl border border-gray-200 dark:border-white/5 focus-within:border-[#FF5722] transition-colors">
                        <div className="flex items-center justify-between mb-2">
                             <label className="text-gray-500 text-xs uppercase font-bold tracking-wider flex items-center gap-2">
                                <Ruler size={14} /> Height
                             </label>
                             <div className="flex bg-gray-200 dark:bg-[#252830] rounded-lg p-0.5">
                                 <button 
                                    onClick={() => setHeightUnit('cm')}
                                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${heightUnit === 'cm' ? 'bg-[#FF5722] text-white shadow' : 'text-gray-500'}`}
                                 >CM</button>
                                 <button 
                                    onClick={() => setHeightUnit('ft')}
                                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${heightUnit === 'ft' ? 'bg-[#FF5722] text-white shadow' : 'text-gray-500'}`}
                                 >FT</button>
                             </div>
                        </div>
                        <input 
                           type="number" 
                           value={height}
                           onChange={(e) => setHeight(parseFloat(e.target.value))}
                           className="w-full bg-transparent text-4xl font-black text-gray-900 dark:text-white outline-none placeholder-gray-400 dark:placeholder-gray-700"
                        />
                    </div>

                    <button 
                        onClick={handleSaveMetrics}
                        className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(255,87,34,0.3)] active:scale-95 transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </>
      )}

      {/* ================= INTERACTION 2: PROFILE PHOTO ACTION SHEET ================= */}
      {isPhotoActionSheetOpen && (
        <>
             <div className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm transition-opacity" onClick={() => setIsPhotoActionSheetOpen(false)} />
             <div className="fixed bottom-0 left-0 right-0 z-[110] p-4 pb-8 animate-in slide-in-from-bottom duration-300">
                 <div className="bg-white dark:bg-[#1C1E24] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 mb-3 shadow-2xl transition-colors">
                     <button className="w-full p-4 flex items-center gap-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5 text-left">
                         <Eye size={20} className="text-blue-500" />
                         <span className="font-medium">View Photo</span>
                     </button>
                     <button className="w-full p-4 flex items-center gap-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5 text-left">
                         <ImageIcon size={20} className="text-green-500" />
                         <span className="font-medium">Choose from Gallery</span>
                     </button>
                     <button className="w-full p-4 flex items-center gap-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5 text-left">
                         <Camera size={20} className="text-[#FF5722]" />
                         <span className="font-medium">Take Photo</span>
                     </button>
                     <button className="w-full p-4 flex items-center gap-3 text-red-500 hover:bg-red-500/10 transition-colors text-left">
                         <Trash2 size={20} />
                         <span className="font-medium">Remove Photo</span>
                     </button>
                 </div>
                 
                 <button 
                    onClick={() => setIsPhotoActionSheetOpen(false)}
                    className="w-full bg-white dark:bg-[#1C1E24] text-gray-900 dark:text-white font-bold py-4 rounded-2xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors shadow-lg"
                 >
                    Cancel
                 </button>
             </div>
        </>
      )}

    </div>
  );
};

export default Profile;