import React, { useState, useEffect } from 'react';
import { X, Mic, RefreshCw, Zap, Activity, StopCircle } from 'lucide-react';

interface WorkoutLiveProps {
  onClose: () => void;
}

const WorkoutLive: React.FC<WorkoutLiveProps> = ({ onClose }) => {
  const [reps, setReps] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [voiceLog, setVoiceLog] = useState<string | null>(null);
  const [phase, setPhase] = useState<'down' | 'up'>('up'); // Animation phase

  // Workout Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t + 1);

      // Animation Cycle (approx every 3 seconds for a rep)
      const cycle = timer % 4;
      if (cycle === 0 || cycle === 1) setPhase('down');
      else setPhase('up');
      
      // Simulate Rep Counting (Complete cycle)
      if (timer > 0 && timer % 4 === 0) {
        setReps(r => r + 1);
        // Vary accuracy slightly for realism
        setAccuracy(prev => Math.min(100, Math.max(85, prev + (Math.random() > 0.5 ? 2 : -5))));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Voice Command Simulation
  const toggleVoiceControl = () => {
    if (isListening) {
      setIsListening(false);
      setVoiceLog(null);
    } else {
      setIsListening(true);
      
      // Simulate hearing a command after 2 seconds
      setTimeout(() => {
        setVoiceLog("Mendengar: 'Ulangi Repetisi'...");
        
        // Execute command after another 1.5 seconds
        setTimeout(() => {
           setReps(0);
           setTimer(0);
           setVoiceLog("Perintah Diterima: Repetisi Direset.");
           
           // Clear log
           setTimeout(() => {
             setVoiceLog(null);
             setIsListening(false); // Auto turn off or keep on depending on UX preference
           }, 2000);
        }, 1500);
      }, 2000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col font-sans">
      
      {/* 1. LAYER: CAMERA FEED (Background) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" 
          alt="Camera Feed" 
          className="w-full h-full object-cover opacity-60 grayscale"
        />
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(17,18,20,0)_0%,_rgba(17,18,20,0.8)_100%)]"></div>
      </div>

      {/* 2. LAYER: TOP CONTROLS */}
      <div className="relative z-20 flex justify-between items-center p-6 pt-safe">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
           <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
           <span className="text-white text-xs font-bold tracking-wider">LIVE AI</span>
        </div>
        <button onClick={onClose} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 border border-white/10">
          <X size={20} />
        </button>
      </div>

      {/* 3. LAYER: ANIMATED CHARACTER (The "Guide") */}
      <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none">
          {/* Holographic Avatar using SVG */}
          <div className={`transition-transform duration-[1500ms] ease-in-out ${phase === 'down' ? 'translate-y-16 scale-95' : 'translate-y-0 scale-100'}`}>
             <svg width="300" height="500" viewBox="0 0 200 400" className="drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">
                <defs>
                  <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFDB22" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Head */}
                <circle cx="100" cy="50" r="20" stroke="url(#holoGradient)" strokeWidth="3" fill="rgba(249,115,22,0.1)" />
                
                {/* Torso */}
                <line x1="100" y1="70" x2="100" y2="180" stroke="url(#holoGradient)" strokeWidth="4" />
                
                {/* Arms (Dynamic based on phase could be added, here static "ready" pose) */}
                <path d="M100 80 L60 120 L40 160" stroke="url(#holoGradient)" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M100 80 L140 120 L160 160" stroke="url(#holoGradient)" strokeWidth="4" strokeLinecap="round" fill="none" />
                
                {/* Hips */}
                <line x1="70" y1="180" x2="130" y2="180" stroke="url(#holoGradient)" strokeWidth="4" />

                {/* Legs (Animated via CSS classes on parent, but paths suggest structure) */}
                <path d="M70 180 L60 280 L50 380" stroke="url(#holoGradient)" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M130 180 L140 280 L150 380" stroke="url(#holoGradient)" strokeWidth="4" strokeLinecap="round" fill="none" />

                {/* Joints */}
                <circle cx="100" cy="80" r="4" fill="white" />
                <circle cx="60" cy="120" r="4" fill="white" />
                <circle cx="140" cy="120" r="4" fill="white" />
                <circle cx="60" cy="280" r="4" fill="white" />
                <circle cx="140" cy="280" r="4" fill="white" />
             </svg>
          </div>
          
          {/* Phase Indicator Text */}
          <div className="absolute bottom-10 px-4 py-1 bg-[#F97316]/20 border border-[#F97316] rounded-lg">
             <span className="text-[#F97316] font-bold text-sm uppercase tracking-widest animate-pulse">
               {phase === 'down' ? 'HOLD' : 'UP'}
             </span>
          </div>
      </div>

      {/* 4. LAYER: STATS & VOICE LOG */}
      <div className="relative z-20 px-6">
         {/* Voice Feedback Toast */}
         {voiceLog && (
            <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-max max-w-[90%] bg-black/80 backdrop-blur border border-[#F97316]/50 px-6 py-3 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
               <div className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse"></div>
               <p className="text-white font-medium text-sm">{voiceLog}</p>
            </div>
         )}

         {/* Stats Cards - Central Floating */}
         <div className="flex items-center gap-4 mb-6">
             {/* Repetisi Card */}
             <div className="flex-1 bg-[#1C1E24]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#F97316]"></div>
                <div className="flex justify-between items-start mb-1">
                   <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Repetisi</p>
                   <RefreshCw size={14} className="text-[#F97316] opacity-50" />
                </div>
                <p className="text-4xl font-black text-white">{reps}</p>
             </div>

             {/* Akurasi Card */}
             <div className="flex-1 bg-[#1C1E24]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1 h-full bg-green-500"></div>
                <div className="flex justify-between items-start mb-1">
                   <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Akurasi</p>
                   <Activity size={14} className="text-green-500 opacity-50" />
                </div>
                <p className="text-4xl font-black text-green-500">{accuracy}%</p>
             </div>
         </div>
      </div>

      {/* 5. LAYER: BOTTOM CONTROLS (Mic Centered) */}
      <div className="relative z-30 bg-[#111214] border-t border-white/10 pb-8 pt-4 px-6 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
         <div className="flex items-center justify-between">
            
            {/* Left: Duration */}
            <div className="flex flex-col items-center w-20">
               <span className="text-xs text-gray-500 mb-1 font-medium">Durasi</span>
               <span className="text-xl font-mono font-bold text-white tracking-wide">{formatTime(timer)}</span>
            </div>

            {/* Center: BIG MIC BUTTON */}
            <div className="relative -mt-12">
               {/* Ripples for active state */}
               {isListening && (
                 <>
                   <div className="absolute inset-0 bg-[#F97316] rounded-full animate-ping opacity-20"></div>
                   <div className="absolute -inset-4 bg-[#F97316] rounded-full animate-pulse opacity-10"></div>
                 </>
               )}
               
               <button 
                 onClick={toggleVoiceControl}
                 className={`w-20 h-20 rounded-full flex items-center justify-center border-4 border-[#111214] shadow-2xl transition-all duration-300 active:scale-95 ${
                   isListening 
                     ? 'bg-[#F97316] text-white shadow-[0_0_30px_rgba(249,115,22,0.5)]' 
                     : 'bg-[#1C1E24] text-gray-400 border-gray-800 hover:border-[#F97316] hover:text-white'
                 }`}
               >
                 <Mic size={32} fill={isListening ? "currentColor" : "none"} />
               </button>
            </div>

            {/* Right: End Workout */}
            <div className="flex flex-col items-center w-20 group cursor-pointer" onClick={onClose}>
               <span className="text-xs text-gray-500 mb-1 font-medium group-hover:text-red-500 transition-colors">Selesai</span>
               <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                  <StopCircle size={20} className="text-red-500 group-hover:text-white" />
               </div>
            </div>

         </div>
         
         {/* Helper Text below Mic */}
         <div className="text-center mt-3">
            <p className={`text-[10px] transition-colors ${isListening ? 'text-[#F97316] animate-pulse font-bold' : 'text-gray-600'}`}>
              {isListening ? "Mendengarkan..." : "Ketuk untuk perintah suara"}
            </p>
         </div>
      </div>

    </div>
  );
};

export default WorkoutLive;