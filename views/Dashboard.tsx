import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AppView, UserProfile } from '../types';
import { Play, Sparkles, Watch, Bell, Heart, Moon, Flame, X, Trophy, Battery, Bluetooth, ChevronRight, Settings, AlertCircle, Info, Minus, Plus, CreditCard, LogOut, Mic, Keyboard, Camera, MessageSquare, Dumbbell, Loader2, Slash, Send, User, Volume2, VolumeX, StopCircle, ArrowLeft, Lightbulb, Plus as PlusIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface DashboardProps {
  user: UserProfile;
  isDeviceConnected: boolean;
  onToggleDeviceConnection: (connected: boolean) => void;
  onStartWorkout: (mode: 'ai' | 'manual') => void;
  onUpgrade?: () => void;
  onUpdateProfile?: (data: Partial<UserProfile>) => void;
  onNavigate?: (view: AppView) => void;
  onLogout?: () => void;
}

type OverlayType = 'profile' | 'device' | 'notifications' | 'ai' | 'workout-mode' | null;

interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

const Dashboard: React.FC<DashboardProps> = ({ user, isDeviceConnected, onToggleDeviceConnection, onStartWorkout, onUpgrade, onUpdateProfile, onNavigate, onLogout }) => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [weight, setWeight] = useState(parseFloat(user.weight) || 70);
  const [height, setHeight] = useState(parseFloat(user.height) || 175);
  
  // Device Connection States (isDeviceConnected comes from props now)
  const [isConnecting, setIsConnecting] = useState(false);

  // AI Chat States
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([]); // Start empty for clean Gemini look
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // New state for TTS
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Sync local state with props if user changes elsewhere
  useEffect(() => {
    setWeight(parseFloat(user.weight) || 70);
    setHeight(parseFloat(user.height) || 175);
  }, [user.weight, user.height]);

  // Scroll to bottom of chat
  useEffect(() => {
      if (activeOverlay === 'ai') {
          setTimeout(() => {
             chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
      }
  }, [aiMessages, activeOverlay, isAiTyping]);

  // Stop speaking when overlay closes
  useEffect(() => {
      if (activeOverlay !== 'ai') {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
          setIsMicActive(false);
      }
  }, [activeOverlay]);

  // Weekly consistency data simulation
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const currentDayIndex = 3; // Thursday

  // Helper functions for steppers
  const adjustWeight = (amount: number) => {
    const newVal = Number((weight + amount).toFixed(1));
    setWeight(newVal);
    if (onUpdateProfile) {
        onUpdateProfile({ weight: newVal.toString() });
    }
  };

  const adjustHeight = (amount: number) => {
    const newVal = Math.round(height + amount);
    setHeight(newVal);
    if (onUpdateProfile) {
        onUpdateProfile({ height: newVal.toString() });
    }
  };

  const handleConnectDevice = () => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
        onToggleDeviceConnection(true);
        setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnectDevice = () => {
    onToggleDeviceConnection(false);
  };

  // --- AI LOGIC ---

  const speakResponse = (text: string) => {
      window.speechSynthesis.cancel(); // Stop previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID'; // Indonesian
      utterance.rate = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
  };

  const handleVoiceInput = () => {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
          alert("Browser Anda tidak mendukung fitur suara. Gunakan Google Chrome atau Safari.");
          return;
      }

      if (isMicActive) {
          // If already active, stop it manually (logic handled in onend usually, but safe to force close)
          setIsMicActive(false);
          return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'id-ID';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsMicActive(true);

      recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setAiInput(transcript);
          handleSendMessage(transcript); // Auto-send
      };

      recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsMicActive(false);
      };

      recognition.onend = () => {
          setIsMicActive(false);
      };

      recognition.start();
  };

  const handleSendMessage = async (textOverride?: string) => {
      const messageText = textOverride || aiInput;
      if (!messageText.trim()) return;

      // Add User Message
      const newUserMsg: ChatMessage = { id: Date.now(), text: messageText, sender: 'user' };
      setAiMessages(prev => [...prev, newUserMsg]);
      setAiInput('');
      setIsAiTyping(true);

      // Stop any current speech
      window.speechSynthesis.cancel();

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const systemInstruction = `
          Kamu adalah Smart-Gym AI, pelatih kebugaran pribadi yang cerdas dan suportif.
          Nama pengguna: ${user.name}.
          Profil: Usia ${user.age}, Tinggi ${user.height}cm, Berat ${user.weight}kg.
          Tujuan: ${user.goal?.replace('_', ' ') || 'General Health'}.
          Level: ${user.level}.
          
          Instruksi:
          1. Jawablah SELALU dalam Bahasa Indonesia yang gaul, santai, tapi tetap sopan dan memotivasi.
          2. Jawaban harus RINGKAS (maksimal 2-3 kalimat) agar mudah dibaca di HP, KECUALI diminta penjelasan detail.
          3. Jika pengguna bertanya tentang menu diet atau latihan, berikan saran spesifik.
          4. Jangan menjawab hal di luar topik kesehatan, kebugaran, dan gaya hidup.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: messageText,
          config: {
            systemInstruction: systemInstruction,
          }
        });

        const aiText = response.text || "Maaf, saya sedang loading otot otak saya. Coba tanya lagi ya!";
        
        const newAiMsg: ChatMessage = { id: Date.now() + 1, text: aiText, sender: 'ai' };
        setAiMessages(prev => [...prev, newAiMsg]);
        
        // Auto-speak the response
        speakResponse(aiText);

      } catch (error) {
        console.error("Gemini API Error:", error);
        const errorMsg: ChatMessage = { 
            id: Date.now() + 1, 
            text: "Waduh, koneksi ke otak AI terputus. Coba cek internet kamu atau coba lagi nanti ya!", 
            sender: 'ai' 
        };
        setAiMessages(prev => [...prev, errorMsg]);
      } finally {
        setIsAiTyping(false);
      }
  };

  const suggestions = [
      "Buatkan jadwal latihan dada",
      "Apa makanan tinggi protein murah?",
      "Kenapa berat badan stuck?",
      "Tips recovery setelah leg day"
  ];

  return (
    // REMOVED 'animate-in' class from root div to prevent stacking context issues with fixed children
    <div className="min-h-screen flex flex-col p-6 relative font-sans selection:bg-[#FF5722] selection:text-white">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-8 pt-2 relative z-30">
        {/* Left: Avatar + Name (Triggers Profile Sheet) */}
        <button 
          onClick={() => setActiveOverlay('profile')}
          className="flex items-center gap-4 text-left group"
        >
          <div className="w-12 h-12 rounded-full border border-white/50 dark:border-[#333] p-0.5 bg-white/50 dark:bg-[#121212]/50 backdrop-blur-md group-hover:border-[#FF5722] transition-colors relative shadow-sm">
             <img 
               src={`https://ui-avatars.com/api/?name=${user.name}&background=121212&color=fff`} 
               alt="Profile" 
               className="w-full h-full rounded-full object-cover"
             />
             <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FF5722] rounded-full border-2 border-white dark:border-black flex items-center justify-center">
                <Trophy size={8} className="text-white" fill="currentColor" />
             </div>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider mb-0.5">Welcome back</p>
            <h1 className="text-gray-900 dark:text-white font-bold text-xl leading-none group-hover:text-[#FF5722] transition-colors">Hi, {user.name.split(' ')[0] || 'Alex'}</h1>
          </div>
        </button>

        {/* Right: Icons */}
        <div className="flex items-center gap-3">
            {/* Watch Status (Triggers Device Modal) */}
            <button 
              onClick={() => setActiveOverlay('device')}
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/60 dark:bg-[#121212]/60 backdrop-blur-sm border relative hover:bg-white dark:hover:bg-[#1C1E24] transition-all shadow-sm dark:shadow-none ${isDeviceConnected ? 'border-gray-200 dark:border-[#222] hover:border-green-500/50' : 'border-gray-200 dark:border-[#222]'}`}
            >
              <Watch size={18} className={isDeviceConnected ? "text-gray-700 dark:text-white" : "text-gray-400"} />
              {isDeviceConnected && (
                  <div className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-[#22c55e] rounded-full shadow-[0_0_6px_#22c55e]"></div>
              )}
            </button>
            
            {/* Notification (Triggers Dropdown) */}
            <button 
              onClick={() => setActiveOverlay(activeOverlay === 'notifications' ? null : 'notifications')}
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/60 dark:bg-[#121212]/60 backdrop-blur-sm border transition-colors relative shadow-sm dark:shadow-none ${activeOverlay === 'notifications' ? 'border-[#FF5722] text-[#FF5722]' : 'border-gray-200 dark:border-[#222] text-gray-700 dark:text-white hover:border-[#FF5722]'}`}
            >
              <Bell size={18} />
              <div className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#121212]"></div>
            </button>
        </div>
      </div>

      {/* ================= NOTIFICATION DROPDOWN ================= */}
      {activeOverlay === 'notifications' && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setActiveOverlay(null)} />
          <div className="absolute top-20 right-6 w-80 bg-white/90 dark:bg-[#1C1E24]/90 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl z-[70] p-1 animate-in fade-in slide-in-from-top-2 overflow-hidden">
             <div className="p-3 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#121212]/50">
                <h3 className="text-gray-900 dark:text-white font-bold text-sm">Notifications</h3>
             </div>
             <div className="divide-y divide-gray-100 dark:divide-white/5">
                {/* AI Insight */}
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                   <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#FF5722]/10 rounded-lg shrink-0">
                         <AlertCircle size={16} className="text-[#FF5722]" />
                      </div>
                      <div>
                         <p className="text-gray-800 dark:text-gray-200 text-sm font-medium mb-1">Recovery Alert</p>
                         <p className="text-gray-500 text-xs leading-relaxed">
                            ⚠️ You skipped yesterday's recovery session. AI suggests a lighter load today.
                         </p>
                      </div>
                   </div>
                </div>
                {/* System Msg */}
                <div 
                  className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => {
                     setActiveOverlay(null);
                     if (onUpgrade) onUpgrade();
                  }}
                >
                   <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                         <Info size={16} className="text-blue-500" />
                      </div>
                      <div>
                         <p className="text-gray-800 dark:text-gray-200 text-sm font-medium mb-1">Subscription Status</p>
                         <p className="text-gray-500 text-xs">Unlock Elite features. <span className="text-blue-400 underline">Upgrade now</span>.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </>
      )}

      {/* ================= MAIN CONTENT ================= */}
      {/* 2. Main Action Card (Hero) - Updated with Glassmorphism */}
      <div className="w-full bg-white/80 dark:bg-[#121212]/70 backdrop-blur-xl rounded-[2rem] p-6 relative overflow-hidden border border-white/20 dark:border-white/5 shadow-xl dark:shadow-2xl mb-6 group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF5722]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
         <div className="relative z-10">
             <div className="mb-8">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100/80 dark:bg-[#333]/80 text-gray-500 dark:text-gray-300 uppercase tracking-wide">Strength</span>
                 </div>
                 <h2 className="text-3xl font-black text-gray-900 dark:text-white italic tracking-tighter leading-[0.9] mb-2">
                    CHEST &<br/>TRICEPS
                 </h2>
                 <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">45 Mins • Intermediate</p>
             </div>
             <button
                onClick={() => setActiveOverlay('workout-mode')}
                className="w-full bg-[#FF5722] hover:bg-[#E64A19] active:scale-[0.98] text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,87,34,0.25)] transition-all duration-300"
             >
                <Play size={22} fill="currentColor" />
                START WORKOUT
             </button>
         </div>
      </div>

      {/* 3. Biometric Data Strip - Glassy */}
      <div className="grid grid-cols-3 gap-3 mb-auto">
          <div className="bg-white/70 dark:bg-[#121212]/60 backdrop-blur-md rounded-2xl p-4 border border-white/20 dark:border-white/5 flex flex-col items-center justify-center gap-2 shadow-sm dark:shadow-none hover:bg-white/90 dark:hover:bg-[#121212]/80 transition-colors">
              <Heart size={20} className={isDeviceConnected ? "text-gray-900 dark:text-white" : "text-gray-300 dark:text-gray-700"} />
              <span className={`font-bold text-lg ${isDeviceConnected ? "text-[#FF5722]" : "text-gray-300 dark:text-gray-700"}`}>
                  {isDeviceConnected ? "68" : "--"} <span className="text-xs text-gray-500 font-normal">bpm</span>
              </span>
          </div>
          <div className="bg-white/70 dark:bg-[#121212]/60 backdrop-blur-md rounded-2xl p-4 border border-white/20 dark:border-white/5 flex flex-col items-center justify-center gap-2 shadow-sm dark:shadow-none hover:bg-white/90 dark:hover:bg-[#121212]/80 transition-colors">
              <Moon size={20} className={isDeviceConnected ? "text-gray-900 dark:text-white" : "text-gray-300 dark:text-gray-700"} />
              <span className={`font-bold text-lg ${isDeviceConnected ? "text-[#FF5722]" : "text-gray-300 dark:text-gray-700"}`}>
                  {isDeviceConnected ? "7h" : "--"} <span className="text-xs text-gray-500 font-normal">{isDeviceConnected ? "20m" : "sleep"}</span>
              </span>
          </div>
          <div className="bg-white/70 dark:bg-[#121212]/60 backdrop-blur-md rounded-2xl p-4 border border-white/20 dark:border-white/5 flex flex-col items-center justify-center gap-2 shadow-sm dark:shadow-none hover:bg-white/90 dark:hover:bg-[#121212]/80 transition-colors">
              <Flame size={20} className={isDeviceConnected ? "text-gray-900 dark:text-white" : "text-gray-300 dark:text-gray-700"} />
              <span className={`font-bold text-lg ${isDeviceConnected ? "text-[#FF5722]" : "text-gray-300 dark:text-gray-700"}`}>
                  {isDeviceConnected ? "420" : "--"} <span className="text-xs text-gray-500 font-normal">Kcal</span>
              </span>
          </div>
      </div>

      {/* 4. Weekly Consistency */}
      <div className="mb-24 mt-6">
          <div className="flex justify-between items-center mb-4 px-1">
             <h3 className="text-gray-900 dark:text-white font-bold text-sm">Weekly Consistency</h3>
             <span className="text-[#FF5722] text-xs font-medium">Week 4</span>
          </div>
          <div className="flex justify-between items-center bg-white/70 dark:bg-[#121212]/60 backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-white/5 shadow-sm dark:shadow-none">
              {weekDays.map((day, index) => {
                  const isCompleted = index < currentDayIndex;
                  const isToday = index === currentDayIndex;
                  return (
                      <div key={index} className="flex flex-col items-center gap-2">
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                                isCompleted 
                                    ? 'bg-[#FF5722] border-[#FF5722] text-white shadow-[0_0_10px_rgba(255,87,34,0.4)]' 
                                    : isToday 
                                        ? 'bg-transparent border-[#FF5722] text-gray-900 dark:text-white animate-pulse'
                                        : 'bg-transparent border-gray-200 dark:border-[#333] text-gray-400 dark:text-gray-600'
                            }`}
                          >
                              {isCompleted && <div className="w-2 h-2 bg-white rounded-full"></div>}
                              {isToday && <div className="w-1.5 h-1.5 bg-[#FF5722] rounded-full"></div>}
                          </div>
                          <span className={`text-[10px] font-medium ${isCompleted || isToday ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
                              {day}
                          </span>
                      </div>
                  );
              })}
          </div>
      </div>

      {/* 5. AI Assistant Button (FAB) - Trigger */}
      <button 
        onClick={() => setActiveOverlay('ai')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#FF5722] rounded-full flex items-center justify-center z-[60] transition-transform active:scale-90 group shadow-[0_0_20px_rgba(255,87,34,0.4)] hover:scale-105"
      >
         <div className="absolute inset-0 rounded-full bg-[#FF5722] blur-md opacity-50 animate-pulse"></div>
         <Sparkles size={24} className="text-white relative z-10" strokeWidth={2} />
      </button>

      {/* ================= OVERLAYS ================= */}

      {/* 1. DEVICE CARD MODAL (Center) */}
      {activeOverlay === 'device' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setActiveOverlay(null)} />
           
           <div className="w-full max-w-sm bg-white/95 dark:bg-[#111214]/90 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-green-500/30 p-6 relative z-10 shadow-2xl dark:shadow-[0_0_40px_rgba(34,197,94,0.15)] animate-in zoom-in-95 duration-300">
               <button onClick={() => setActiveOverlay(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <X size={20} />
               </button>

               <div className="flex flex-col items-center py-4">
                  <div className="relative w-32 h-32 mb-6">
                     {/* Background Glow */}
                     {isDeviceConnected && (
                        <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full"></div>
                     )}
                     
                     {/* The Icon */}
                     {isConnecting ? (
                         <div className="w-full h-full flex items-center justify-center">
                             <div className="absolute inset-0 border-4 border-gray-200 dark:border-[#222] rounded-full"></div>
                             <div className="absolute inset-0 border-4 border-[#FF5722] rounded-full border-t-transparent animate-spin"></div>
                             <Bluetooth size={40} className="text-[#FF5722] animate-pulse" />
                         </div>
                     ) : (
                         <>
                            <Watch size={100} className={`${isDeviceConnected ? 'text-gray-800 dark:text-gray-200' : 'text-gray-300 dark:text-gray-700'} relative z-10 drop-shadow-lg transition-colors`} strokeWidth={1} />
                            
                            {/* Connection Badge */}
                            <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full border-4 border-white dark:border-[#111214] flex items-center justify-center transition-colors ${isDeviceConnected ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-800'}`}>
                                {isDeviceConnected ? (
                                    <Bluetooth size={12} className="text-white dark:text-black" />
                                ) : (
                                    <Slash size={12} className="text-gray-400" />
                                )}
                            </div>
                         </>
                     )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {isDeviceConnected ? "Galaxy Watch 6" : "No Device"}
                  </h3>
                  <p className={`${isDeviceConnected ? 'text-green-500' : 'text-gray-400'} text-sm font-medium flex items-center gap-2 mb-6 h-5`}>
                    {isConnecting ? (
                        <span className="text-[#FF5722]">Searching for device...</span>
                    ) : isDeviceConnected ? (
                        <>
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Connected via Bluetooth
                        </>
                    ) : (
                        <span>Disconnected</span>
                    )}
                  </p>

                  {/* Stats Grid - Only show if connected */}
                  {isDeviceConnected && (
                      <div className="w-full grid grid-cols-2 gap-3 mb-6 animate-in fade-in slide-in-from-bottom-2">
                          <div className="bg-gray-50 dark:bg-[#1C1E24] rounded-xl p-3 flex items-center gap-3 border border-gray-200 dark:border-white/5">
                              <Battery size={20} className="text-green-400" />
                              <div>
                                <p className="text-xs text-gray-500">Battery</p>
                                <p className="text-gray-900 dark:text-white font-bold">84%</p>
                              </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-[#1C1E24] rounded-xl p-3 flex items-center gap-3 border border-gray-200 dark:border-white/5">
                              <Heart size={20} className="text-[#FF5722]" />
                              <div>
                                <p className="text-xs text-gray-500">Live</p>
                                <p className="text-gray-900 dark:text-white font-bold flex items-center gap-1">
                                  72 <span className="text-[10px] font-normal opacity-50">bpm</span>
                                </p>
                              </div>
                          </div>
                      </div>
                  )}

                  {/* Action Button */}
                  {isDeviceConnected ? (
                      <button 
                        onClick={handleDisconnectDevice}
                        className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-bold transition-colors"
                      >
                        Disconnect Device
                      </button>
                  ) : (
                      <button 
                        onClick={handleConnectDevice}
                        disabled={isConnecting}
                        className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${isConnecting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF5722] hover:bg-[#E64A19] shadow-lg'}`}
                      >
                        {isConnecting ? (
                            <><Loader2 size={18} className="animate-spin" /> Connecting...</>
                        ) : (
                            'Connect Device'
                        )}
                      </button>
                  )}
               </div>
           </div>
        </div>
      )}

      {/* 2. PROFILE QUICK SHEET (Bottom) */}
      {activeOverlay === 'profile' && (
        <>
          <div className="fixed inset-0 bg-black/80 z-[100] transition-opacity backdrop-blur-sm" onClick={() => setActiveOverlay(null)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1C1E24]/90 backdrop-blur-xl rounded-t-[2.5rem] p-6 pb-12 z-[110] animate-in slide-in-from-bottom duration-300 border-t border-gray-200 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5">
              
              {/* Handle */}
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-8"></div>

              {/* Header */}
              <div className="flex items-center gap-5 mb-8">
                  <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#FFDB22] to-[#FF5722]">
                    <img 
                       src={`https://ui-avatars.com/api/?name=${user.name}&background=121212&color=fff`} 
                       alt="Profile" 
                       className="w-full h-full rounded-full object-cover border-4 border-white dark:border-[#1C1E24]"
                     />
                  </div>
                  <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                         <Trophy size={14} className="text-[#FFDB22]" fill="currentColor" />
                         <span className="text-[#FFDB22] font-bold text-sm tracking-wide">Elite Member</span>
                      </div>
                  </div>
              </div>

              {/* Quick Stats Update */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                  {/* Weight */}
                  <div className="bg-gray-50 dark:bg-[#121212] rounded-2xl p-4 border border-gray-200 dark:border-gray-800 hover:border-[#FF5722]/50 transition-colors group">
                     <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold block mb-3">Weight (kg)</span>
                     <div className="flex items-center justify-between">
                        <button onClick={() => adjustWeight(-0.5)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white flex items-center justify-center hover:bg-[#FF5722] hover:text-white transition-colors">
                           <Minus size={16} />
                        </button>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">{weight}</span>
                        <button onClick={() => adjustWeight(0.5)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white flex items-center justify-center hover:bg-[#FF5722] hover:text-white transition-colors">
                           <Plus size={16} />
                        </button>
                     </div>
                  </div>

                  {/* Height */}
                  <div className="bg-gray-50 dark:bg-[#121212] rounded-2xl p-4 border border-gray-200 dark:border-gray-800 hover:border-[#FF5722]/50 transition-colors group">
                     <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold block mb-3">Height (cm)</span>
                     <div className="flex items-center justify-between">
                        <button onClick={() => adjustHeight(-1)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white flex items-center justify-center hover:bg-[#FF5722] hover:text-white transition-colors">
                           <Minus size={16} />
                        </button>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">{height}</span>
                        <button onClick={() => adjustHeight(1)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white flex items-center justify-center hover:bg-[#FF5722] hover:text-white transition-colors">
                           <Plus size={16} />
                        </button>
                     </div>
                  </div>
              </div>

              {/* Menu List */}
              <div className="space-y-2">
                 <button 
                    onClick={() => {
                        setActiveOverlay(null);
                        if (onNavigate) onNavigate('profile');
                    }}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-white/5"
                 >
                     <div className="flex items-center gap-3">
                         <Settings size={20} className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                         <span className="font-medium">Settings</span>
                     </div>
                     <ChevronRight size={18} className="text-gray-400 dark:text-gray-500" />
                 </button>
                 <button 
                    onClick={() => {
                        setActiveOverlay(null);
                        if (onUpgrade) onUpgrade();
                    }}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-white/5"
                 >
                     <div className="flex items-center gap-3">
                         <CreditCard size={20} className="text-amber-500" />
                         <span className="font-medium">Subscription</span>
                     </div>
                     <ChevronRight size={18} className="text-gray-400 dark:text-gray-500" />
                 </button>
                 <button 
                    onClick={onLogout}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 transition-colors group mt-2"
                 >
                     <div className="flex items-center gap-3">
                         <LogOut size={20} />
                         <span className="font-medium">Log Out</span>
                     </div>
                 </button>
              </div>

          </div>
        </>
      )}

      {/* 3. WORKOUT MODE SELECTION MODAL */}
      {activeOverlay === 'workout-mode' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setActiveOverlay(null)} />
           
           {/* Modal Content */}
           <div className="bg-white/95 dark:bg-[#1C1E24]/95 backdrop-blur-xl w-full max-w-md rounded-[2rem] p-6 relative z-10 animate-in zoom-in-95 duration-300 border border-gray-200 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 shadow-2xl">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">Choose Your Mode</h2>
                 <button onClick={() => setActiveOverlay(null)} className="p-2 bg-gray-100 dark:bg-[#121212] rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <X size={20} />
                 </button>
              </div>

              <div className="space-y-4">
                  {/* Option 1: AI Coach Mode */}
                  <button 
                    onClick={() => onStartWorkout('ai')}
                    className="w-full h-28 relative group rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  >
                     {/* Gradient Border Background */}
                     <div className="absolute inset-0 bg-gradient-to-r from-[#FF5722] to-[#FFDB22] opacity-80 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                     
                     {/* Inner Content - absolute inset-[1px] creates the border effect inside */}
                     <div className="absolute inset-[1px] bg-white dark:bg-[#1C1E24] rounded-[15px] px-4 flex items-center gap-4 group-hover:bg-gray-50 dark:group-hover:bg-[#1C1E24]/90 transition-colors">
                         <div className="w-12 h-12 rounded-full bg-[#FF5722]/20 flex items-center justify-center shrink-0">
                             <Sparkles size={24} className="text-[#FF5722]" />
                         </div>
                         <div className="text-left flex-1 min-w-0">
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="text-gray-900 dark:text-white font-bold text-base truncate">AI Coach Mode</span>
                                 <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#FF5722] text-white uppercase tracking-wide shrink-0">Rec</span>
                             </div>
                             <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">
                                Real-time correction & auto counting via camera.
                             </p>
                         </div>
                     </div>
                  </button>

                  {/* Option 2: Manual Mode */}
                  <button 
                    onClick={() => onStartWorkout('manual')}
                    className="w-full h-28 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-2xl px-4 flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-[#1a1c22] transition-colors text-left group active:scale-[0.98]"
                  >
                      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition-colors">
                          <Dumbbell size={24} className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <span className="text-gray-900 dark:text-white font-bold text-base block mb-1 truncate">Manual Mode</span>
                         <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                            Follow animation guides. No camera required.
                         </p>
                      </div>
                  </button>
              </div>

           </div>
        </div>
      )}

      {/* 4. FULL SCREEN AI CHAT (ChatGPT/Gemini Style) - PORTAL RENDERING FOR Z-INDEX FIX */}
      {activeOverlay === 'ai' && createPortal(
        <div className="fixed inset-0 z-[1000] bg-white dark:bg-[#000000] flex flex-col animate-in slide-in-from-bottom duration-300 font-sans">
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#1C1E24]/80 backdrop-blur-md shrink-0 safe-top">
                <div className="flex items-center gap-3">
                    <button onClick={() => setActiveOverlay(null)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-white">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-none">Smart AI</h2>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className={`w-2 h-2 rounded-full ${isAiTyping ? 'bg-amber-500 animate-bounce' : 'bg-green-500'}`}></span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {isAiTyping ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Online'}
                            </span>
                        </div>
                    </div>
                </div>
                {isSpeaking && (
                    <button onClick={stopSpeaking} className="p-2 bg-red-500/10 rounded-full text-red-500 hover:bg-red-500/20">
                        <StopCircle size={20} />
                    </button>
                )}
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth pb-36">
                {aiMessages.length === 0 ? (
                    // Empty State / Welcome Screen
                    <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
                        <div className="w-20 h-20 bg-gradient-to-tr from-[#FF5722] to-amber-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-orange-500/20">
                            <Sparkles size={40} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Hello, {user.name.split(' ')[0]}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">
                            Saya siap bantu bikin badan kamu jadi lebih atletis. Mau tanya apa hari ini?
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                            {suggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSendMessage(suggestion)}
                                    className="p-4 bg-gray-50 dark:bg-[#1C1E24] border border-gray-200 dark:border-white/10 rounded-2xl text-left text-sm text-gray-700 dark:text-gray-300 hover:border-[#FF5722]/50 hover:bg-white dark:hover:bg-white/5 transition-all"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Messages
                    <>
                        {aiMessages.map((msg) => (
                            <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`flex max-w-[85%] gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    
                                    {/* Avatar (Only for AI to match Gemini style) */}
                                    {msg.sender === 'ai' && (
                                        <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-0.5">
                                            <Sparkles size={20} className="text-[#FF5722]" fill="currentColor" />
                                        </div>
                                    )}

                                    {/* Message Content */}
                                    <div className={`px-5 py-3.5 text-[15px] leading-relaxed ${
                                        msg.sender === 'user' 
                                        ? 'bg-[#F97316] text-white rounded-[24px] rounded-tr-sm shadow-sm' 
                                        : 'bg-transparent text-gray-900 dark:text-gray-100 p-0 pl-0' 
                                    }`}>
                                        {msg.text}
                                    </div>

                                </div>
                            </div>
                        ))}
                        
                        {/* Typing Indicator Bubble */}
                        {isAiTyping && (
                            <div className="flex w-full justify-start animate-in fade-in duration-300">
                                <div className="flex max-w-[85%] gap-2 flex-row">
                                     <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-0.5">
                                         <Sparkles size={20} className="text-[#FF5722]" fill="currentColor" />
                                     </div>
                                     <div className="flex items-center gap-1.5 pt-2">
                                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                     </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </>
                )}
            </div>

            {/* Input Area - Fixed Bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#000000] p-4 pb-6 border-t border-gray-100 dark:border-white/5 z-30">
                <div className="max-w-3xl mx-auto bg-gray-100 dark:bg-[#1E1F20] rounded-[28px] flex items-center p-2 pr-2 border border-transparent focus-within:border-gray-300 dark:focus-within:border-gray-600 transition-colors shadow-sm">
                    
                    {/* Plus Icon (Visual placeholder for attachments) */}
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full transition-colors hidden sm:block">
                        <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white font-bold text-lg leading-none">
                            <PlusIcon size={16} />
                        </div>
                    </button>

                    <input 
                        type="text" 
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Message AI Coach..."
                        className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 outline-none text-base"
                    />

                    {aiInput.trim() ? (
                        <button 
                           onClick={() => handleSendMessage()}
                           disabled={isAiTyping}
                           className="p-2.5 bg-[#F97316] text-white rounded-full hover:bg-[#E64A19] transition-all animate-in zoom-in duration-200"
                        >
                           <Send size={18} fill="currentColor" className="ml-0.5" />
                        </button>
                    ) : (
                        <button 
                          onClick={handleVoiceInput}
                          className={`p-2.5 rounded-full transition-all ${isMicActive ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10'}`}
                        >
                           <Mic size={22} />
                        </button>
                    )}
                </div>
                <p className="text-[10px] text-center text-gray-400 mt-2.5">
                    AI can make mistakes. Check important info.
                </p>
            </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default Dashboard;