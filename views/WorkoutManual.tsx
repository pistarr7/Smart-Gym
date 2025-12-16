import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Heart, Clock, Info, ChevronRight, Play, Pause, RotateCcw, Smartphone, Zap } from 'lucide-react';

interface WorkoutManualProps {
  onClose: () => void;
}

const WorkoutManual: React.FC<WorkoutManualProps> = ({ onClose }) => {
  const [reps, setReps] = useState(0);
  const [setCount, setSetCount] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(0); // Workout timer
  const [restTimer, setRestTimer] = useState(60); // Rest countdown
  const [isPaused, setIsPaused] = useState(false);
  const [useMotionSensor, setUseMotionSensor] = useState(true); // Default auto-count ON

  // Main Workout Timer
  useEffect(() => {
    let interval: any;
    if (!isPaused && !isResting) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, isResting]);

  // Automatic Rep Counting Simulation (Motion Sensor Logic)
  useEffect(() => {
    let repTimer: any;
    // Simulate detecting a rep every 3.5 seconds if sensor is ON and not resting
    if (useMotionSensor && !isPaused && !isResting && reps < 12) { // Stop at target 12 for demo
       repTimer = setTimeout(() => {
          setReps(prev => prev + 1);
       }, 3500);
    }
    return () => clearTimeout(repTimer);
  }, [reps, useMotionSensor, isPaused, isResting]);

  // Rest Timer Logic
  useEffect(() => {
    let interval: any;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer((t) => t - 1);
      }, 1000);
    } else if (isResting && restTimer === 0) {
      // Rest finished
      setIsResting(false);
      setSetCount((s) => s + 1);
      setReps(0);
      setRestTimer(60);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  const handleFinishSet = () => {
    if (setCount < 4) {
      setIsResting(true);
    } else {
      onClose(); // Finish workout if sets are done
    }
  };

  const skipRest = () => {
    setRestTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-[#111214] z-[100] flex flex-col font-sans h-full">
      
      {/* 1. HEADER */}
      <div className="flex justify-between items-start p-6 pt-safe z-20 bg-gradient-to-b from-[#111214] to-transparent">
        <div>
           <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#333] text-gray-300 uppercase tracking-wide">Legs</span>
              <div className="flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></div>
                 <span className="text-xs text-[#F97316] font-medium">Manual Mode</span>
              </div>
           </div>
           <h1 className="text-3xl font-black text-white tracking-tight">Goblet Squat</h1>
           <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-400 text-sm font-medium">Set <span className="text-white">{setCount}</span> of 4</span>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <span className="text-gray-400 text-sm font-medium">Target: <span className="text-white">12 Reps</span></span>
           </div>
        </div>
        <button onClick={onClose} className="p-2 bg-[#1C1E24] rounded-full text-gray-400 hover:text-white border border-white/5">
           <X size={20} />
        </button>
      </div>

      {/* 2. MAIN VISUAL AREA (3D Animation Placeholder) */}
      <div className="flex-1 px-6 flex items-center justify-center relative my-2">
         <div className="w-full h-full max-h-[400px] bg-[#1C1E24] rounded-[2rem] border border-white/5 relative overflow-hidden shadow-2xl group">
             
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-10" 
                  style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
             </div>

             {/* The "3D" Content */}
             <div className="absolute inset-0 flex items-center justify-center">
                 {/* Simulated 3D Model Image */}
                 <img 
                   src="https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=1000&auto=format&fit=crop" 
                   alt="Goblet Squat Form"
                   className="w-full h-full object-cover opacity-60 mix-blend-overlay grayscale"
                 />
                 
                 {/* Muscle Highlights Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1C1E24] via-transparent to-transparent"></div>
                 
                 {/* Play Button Overlay (Stylistic) */}
                 <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-white uppercase">Looping</span>
                 </div>

                 {/* Muscle Target Tag */}
                 <div className="absolute top-4 left-4">
                    <div className="bg-[#F97316]/20 border border-[#F97316] backdrop-blur-md px-3 py-1.5 rounded-lg">
                        <span className="text-[#F97316] text-[10px] font-bold uppercase tracking-wide">Target: Quads & Glutes</span>
                    </div>
                 </div>
             </div>
         </div>
      </div>

      {/* 3. CONTROLS (Manual Input) */}
      <div className="px-6 py-4 flex flex-col items-center justify-center relative z-20">
         
         {/* Sensor Toggle */}
         <button 
           onClick={() => setUseMotionSensor(!useMotionSensor)}
           className={`mb-6 flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
             useMotionSensor 
               ? 'bg-[#F97316]/10 border-[#F97316] text-[#F97316]' 
               : 'bg-[#1C1E24] border-white/10 text-gray-500'
           }`}
         >
            <Smartphone size={16} className={useMotionSensor ? 'animate-pulse' : ''} />
            <span className="text-xs font-bold uppercase tracking-wide">
              {useMotionSensor ? 'Motion Sensor: ON' : 'Motion Sensor: OFF'}
            </span>
         </button>

         {/* Counter Section */}
         <div className="flex items-center gap-8 mb-4">
            <button 
              onClick={() => {
                setUseMotionSensor(false); // Manual override disables sensor
                setReps(Math.max(0, reps - 1));
              }}
              className="w-16 h-16 rounded-2xl bg-[#1C1E24] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#F97316] active:scale-95 transition-all"
            >
               <Minus size={32} />
            </button>

            <div className="text-center w-24 relative">
               <span className={`text-7xl font-black text-white tracking-tighter leading-none transition-all ${useMotionSensor ? 'scale-110 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]' : ''}`}>
                 {reps}
               </span>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Reps</p>
               
               {/* Auto indicator */}
               {useMotionSensor && (
                 <div className="absolute -top-4 right-0">
                    <Zap size={16} className="text-[#F97316] animate-bounce" fill="currentColor" />
                 </div>
               )}
            </div>

            <button 
              onClick={() => {
                setUseMotionSensor(false); // Manual override disables sensor
                setReps(reps + 1);
              }}
              className="w-16 h-16 rounded-2xl bg-[#1C1E24] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#F97316] active:scale-95 transition-all"
            >
               <Plus size={32} />
            </button>
         </div>

         {/* Mini Timer Display */}
         <div className="flex items-center gap-2 text-gray-500 bg-[#1C1E24]/50 px-4 py-1.5 rounded-full border border-white/5">
             <Clock size={14} />
             <span className="font-mono text-sm font-medium">{formatTime(timer)}</span>
         </div>

      </div>

      {/* 4. BOTTOM ACTION BAR */}
      <div className="bg-[#1C1E24] border-t border-white/5 p-6 pb-8 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] relative z-30">
          <div className="flex items-center gap-4">
              
              {/* Heart Rate Data */}
              <div className="bg-[#111214] rounded-2xl p-4 w-20 flex flex-col items-center justify-center border border-white/5 shrink-0">
                  <Heart size={20} className="text-red-500 mb-1 animate-pulse" fill="currentColor" />
                  <span className="text-white font-bold text-lg leading-none">124</span>
                  <span className="text-[9px] text-gray-500 font-bold uppercase">BPM</span>
              </div>

              {/* Finish Set Button */}
              <button 
                onClick={handleFinishSet}
                className="flex-1 bg-[#F97316] hover:bg-[#E64A19] active:scale-[0.98] text-white h-[72px] rounded-2xl flex items-center justify-between px-6 shadow-[0_4px_20px_rgba(249,115,22,0.3)] transition-all group"
              >
                 <div className="flex flex-col items-start">
                    <span className="text-lg font-black italic uppercase tracking-wider">Finish Set</span>
                    <span className="text-white/80 text-xs font-medium">Next: Rest 60s</span>
                 </div>
                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ChevronRight size={24} className="text-white" />
                 </div>
              </button>
          </div>
      </div>

      {/* REST TIMER OVERLAY */}
      {isResting && (
        <div className="absolute inset-0 z-[110] bg-[#111214]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="text-center mb-10">
               <h2 className="text-white text-3xl font-bold mb-2">Rest Time</h2>
               <p className="text-gray-400">Catch your breath before Set {setCount + 1}</p>
            </div>

            {/* Circular Progress Timer */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-12">
               <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="128" cy="128" r="120" stroke="#1C1E24" strokeWidth="8" fill="none" />
                  <circle 
                    cx="128" cy="128" r="120" 
                    stroke="#F97316" strokeWidth="8" fill="none" strokeLinecap="round"
                    strokeDasharray="753.6"
                    strokeDashoffset={753.6 * (1 - restTimer / 60)}
                    className="transition-all duration-1000 ease-linear"
                  />
               </svg>
               <div className="flex flex-col items-center">
                  <span className="text-8xl font-black text-white tabular-nums tracking-tighter">
                    {restTimer}
                  </span>
                  <span className="text-gray-500 uppercase font-bold tracking-widest text-sm mt-2">Seconds</span>
               </div>
            </div>

            <div className="flex gap-4 w-full max-w-sm">
                <button 
                  onClick={() => setRestTimer(restTimer + 10)}
                  className="flex-1 bg-[#1C1E24] border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-[#2a2c35]"
                >
                   +10s
                </button>
                <button 
                  onClick={skipRest}
                  className="flex-[2] bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                   Start Set {setCount + 1} <Play size={18} fill="currentColor" />
                </button>
            </div>
        </div>
      )}

    </div>
  );
};

export default WorkoutManual;