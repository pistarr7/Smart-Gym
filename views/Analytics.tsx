import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, Cell, Tooltip, ResponsiveContainer, ComposedChart, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { TrendingUp, TrendingDown, Info, Activity, Zap, Share2, Scale, Dumbbell, Brain, Trophy, Clock, Flame, CalendarDays, Watch } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('1M');
  const [activeTab, setActiveTab] = useState('Body');

  // --- MOCK DATA: BODY ---
  const bodyData = [
    { date: 'Nov 01', value: 73.8, prediction: null }, 
    { date: 'Nov 05', value: 73.5, prediction: null }, 
    { date: 'Nov 08', value: 73.2, prediction: null },
    { date: 'Nov 12', value: 72.9, prediction: null }, 
    { date: 'Nov 14', value: 72.5, prediction: 72.5 },
    { date: 'Nov 18', value: null, prediction: 72.2 }, 
    { date: 'Nov 22', value: null, prediction: 72.0 },
    { date: 'Nov 26', value: null, prediction: 71.8 },
    { date: 'Nov 30', value: null, prediction: 71.5 },
  ];

  // --- MOCK DATA: STRENGTH (Bar Chart) ---
  const strengthData = [
    { date: 'Week 1', value: 60 },
    { date: 'Week 2', value: 65 },
    { date: 'Week 3', value: 68 },
    { date: 'Week 4', value: 72 },
    { date: 'Week 5', value: 75 },
    { date: 'Today', value: 80, active: true },
  ];

  // --- MOCK DATA: MUSCLE BALANCE (Radar Chart) ---
  const muscleBalanceData = [
    { subject: 'Shoulders', A: 85, B: 100, fullMark: 100 },
    { subject: 'Biceps', A: 90, B: 90, fullMark: 100 },
    { subject: 'Forearms', A: 80, B: 90, fullMark: 100 },
    { subject: 'Quads', A: 100, B: 100, fullMark: 100 },
    { subject: 'Calves', A: 95, B: 95, fullMark: 100 },
    { subject: 'Triceps', A: 85, B: 100, fullMark: 100 },
  ]; // A: Left, B: Right

  // --- COMPONENTS ---

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isPrediction = payload[0].dataKey === 'prediction';
      return (
        <div className="bg-white/90 dark:bg-[#111214]/90 backdrop-blur-md border border-[#FF5722]/50 p-4 rounded-2xl shadow-[0_0_30px_rgba(255,87,34,0.3)] transform translate-y-4">
          <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
          <div className="flex items-end gap-1">
             <span className="text-gray-900 dark:text-white font-black text-2xl leading-none">{payload[0].value}</span>
             <span className="text-[#FF5722] font-bold text-xs mb-0.5">{activeTab === 'Body' ? 'kg' : 'kg'}</span>
          </div>
          {isPrediction && (
              <div className="mt-2 flex items-center gap-1">
                  <Brain size={10} className="text-[#FF5722]" />
                  <span className="text-[9px] text-[#FF5722] font-bold uppercase">AI Forecast</span>
              </div>
          )}
        </div>
      );
    }
    return null;
  };

  const SmartBodyMap = () => (
    <div className="relative w-full flex items-center justify-center py-4 animate-in fade-in zoom-in duration-500">
        {/* SVG Wireframe */}
        <svg viewBox="0 0 200 320" className="h-56 w-auto drop-shadow-2xl">
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#444" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#111" stopOpacity="0.1" />
                </linearGradient>
            </defs>

            <g stroke="#444" strokeWidth="1" fill="url(#bodyGradient)">
                <circle cx="100" cy="40" r="12" />
                <path d="M100 52 L100 140" strokeWidth="2" />
                <path d="M80 60 L120 60" strokeWidth="2" />
                <path d="M85 140 L115 140" strokeWidth="2" />
                <path d="M80 60 L60 100 L50 130" />
                <path d="M120 60 L140 100 L150 130" />
                <path d="M85 140 L75 220 L70 300" />
                <path d="M115 140 L125 220 L130 300" />
            </g>

            {/* HIGHLIGHTED MUSCLES (Chest & Shoulders) */}
            <g filter="url(#glow)" className="animate-pulse" style={{animationDuration: '3s'}}>
                <path d="M90 65 L110 65 L108 85 L92 85 Z" fill="#FF5722" opacity="0.6" />
                <circle cx="80" cy="60" r="6" fill="#FF5722" opacity="0.8" />
                <circle cx="120" cy="60" r="6" fill="#FF5722" opacity="0.8" />
            </g>
        </svg>

        {/* Floating Label */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 dark:bg-[#1C1E24]/90 backdrop-blur border border-[#FF5722]/30 p-3 rounded-xl shadow-lg max-w-[120px]">
             <div className="flex items-center gap-1.5 mb-1">
                 <Zap size={12} className="text-[#FF5722] fill-[#FF5722]" />
                 <span className="text-[9px] font-bold text-[#FF5722] uppercase tracking-wider">Improved</span>
             </div>
             <p className="text-gray-900 dark:text-white font-bold text-xs leading-tight">Upper Body Strength</p>
             <p className="text-green-500 font-mono text-sm font-bold mt-1">+12%</p>
        </div>
    </div>
  );

  const ActivityHeatmap = () => {
     // Generate random activity for 12 weeks
     const weeks = Array.from({ length: 12 });
     return (
        <div className="w-full h-full flex items-center justify-center px-4">
             <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {weeks.map((_, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-2">
                        {Array.from({ length: 7 }).map((_, dIdx) => {
                            // Logic for randomization
                            const isActive = Math.random() > 0.6;
                            return (
                                <div 
                                    key={`${wIdx}-${dIdx}`} 
                                    className={`w-4 h-4 rounded-[4px] transition-colors duration-500 hover:scale-110 ${isActive ? 'bg-[#FF5722] shadow-[0_0_5px_rgba(255,87,34,0.5)]' : 'bg-gray-100 dark:bg-[#1C1E24] border border-gray-200 dark:border-white/5'}`}
                                ></div>
                            )
                        })}
                    </div>
                ))}
             </div>
        </div>
     );
  };

  const TrophyCase = () => (
    <div className="px-6 mb-6 animate-in slide-in-from-bottom-8 duration-700">
         <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-4 px-1 flex items-center gap-2">
             <Trophy size={16} className="text-yellow-500" />
             Personal Records (PR)
         </h3>
         <div className="space-y-3">
             {[
                 { label: 'Bench Press', value: '80 kg', date: 'Today', icon: Dumbbell, color: 'text-blue-500' },
                 { label: 'Squat', value: '100 kg', date: 'Nov 12', icon: Activity, color: 'text-[#FF5722]' },
                 { label: 'Deadlift', value: '120 kg', date: 'Oct 30', icon: Zap, color: 'text-purple-500' }
             ].map((record, idx) => (
                 <div key={idx} className="bg-white dark:bg-[#1C1E24] p-4 rounded-2xl border border-gray-200 dark:border-white/5 flex items-center justify-between group hover:border-gray-300 dark:hover:border-white/10 transition-all cursor-default shadow-sm dark:shadow-none">
                     <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#111214] border border-gray-200 dark:border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                             <record.icon size={20} className={record.color} />
                         </div>
                         <div>
                             <p className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider mb-0.5">{record.label}</p>
                             <p className="text-gray-900 dark:text-white font-black text-xl">{record.value}</p>
                         </div>
                     </div>
                     <div className="text-right">
                         <Trophy size={16} className="text-yellow-500 mb-1 ml-auto drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                         <p className="text-[9px] text-gray-500 dark:text-gray-600 font-medium">{record.date}</p>
                     </div>
                 </div>
             ))}
         </div>
    </div>
  );

  const ActivityStats = () => (
      <div className="px-6 mb-6 animate-in slide-in-from-bottom-8 duration-700">
          <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-3 px-1">Activity Summary</h3>
          <div className="grid grid-cols-2 gap-3">
              {/* Card 1: Total Workouts */}
              <div className="bg-white dark:bg-[#1C1E24] p-4 rounded-2xl border border-gray-200 dark:border-white/5 relative overflow-hidden group shadow-sm dark:shadow-none">
                  <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#111214] flex items-center justify-center border border-gray-200 dark:border-white/5 group-hover:border-[#FF5722]/30 transition-colors">
                          <Dumbbell size={14} className="text-gray-900 dark:text-white" />
                      </div>
                  </div>
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Total Workouts</p>
                  <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-gray-900 dark:text-white">42</span>
                      <span className="text-xs text-gray-500 font-bold">Sessions</span>
                  </div>
              </div>

              {/* Card 2: Total Time */}
              <div className="bg-white dark:bg-[#1C1E24] p-4 rounded-2xl border border-gray-200 dark:border-white/5 relative overflow-hidden group shadow-sm dark:shadow-none">
                   <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#111214] flex items-center justify-center border border-gray-200 dark:border-white/5 group-hover:border-[#FF5722]/30 transition-colors">
                          <Clock size={14} className="text-blue-500" />
                      </div>
                  </div>
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Total Time</p>
                  <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-gray-900 dark:text-white">38</span>
                      <span className="text-xs text-gray-500 font-bold">Hours</span>
                  </div>
              </div>

              {/* Card 3: Calories */}
              <div className="bg-white dark:bg-[#1C1E24] p-4 rounded-2xl border border-gray-200 dark:border-white/5 relative overflow-hidden group shadow-sm dark:shadow-none">
                  <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#111214] flex items-center justify-center border border-gray-200 dark:border-white/5 group-hover:border-[#FF5722]/30 transition-colors">
                          <Flame size={14} className="text-[#FF5722]" fill="currentColor" />
                      </div>
                      <Watch size={14} className="text-gray-400 dark:text-gray-600" />
                  </div>
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Calories Burned</p>
                  <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-gray-900 dark:text-white">12.4k</span>
                      <span className="text-xs text-gray-500 font-bold">kcal</span>
                  </div>
                  <p className="text-[9px] text-gray-500 font-medium mt-1 opacity-70">Synced from Watch</p>
              </div>

              {/* Card 4: Streak */}
              <div className="bg-white dark:bg-[#1C1E24] p-4 rounded-2xl border border-gray-200 dark:border-white/5 relative overflow-hidden group shadow-sm dark:shadow-none">
                   <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#111214] flex items-center justify-center border border-gray-200 dark:border-white/5 group-hover:border-[#FF5722]/30 transition-colors">
                          <CalendarDays size={14} className="text-green-500" />
                      </div>
                  </div>
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Current Streak</p>
                  <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-gray-900 dark:text-white">5</span>
                      <span className="text-xs text-gray-500 font-bold">Days</span>
                  </div>
              </div>

          </div>
      </div>
  );

  return (
    <div className="h-screen bg-gray-50 dark:bg-[#000000] flex flex-col font-sans selection:bg-[#FF5722] selection:text-white overflow-hidden transition-colors">
      
      {/* 1. HEADER & FILTER SECTION (Fixed Top) */}
      <div className="px-6 pt-safe pb-2 bg-gray-50 dark:bg-[#000000] z-20 shrink-0 transition-colors">
          <div className="flex justify-between items-end mb-4">
              <div>
                  <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-1">Your Progress</h1>
                  <p className="text-gray-500 text-xs font-medium">Tracking your evolution</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-white dark:bg-[#1C1E24] border border-gray-200 dark:border-white/10 text-gray-400 flex items-center justify-center hover:text-gray-900 dark:hover:text-white hover:border-[#FF5722] transition-colors shadow-sm dark:shadow-none">
                  <Share2 size={18} />
              </button>
          </div>

          <div className="flex items-center justify-between mb-4">
              {/* Time Filter */}
              <div className="bg-white dark:bg-[#1C1E24] p-1 rounded-xl flex border border-gray-200 dark:border-white/5 w-[55%] shadow-sm dark:shadow-none">
                {['1W', '1M', '3M', '1Y'].map((range) => (
                    <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                        timeRange === range 
                        ? 'bg-[#FF5722] text-white shadow-lg' 
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                    }`}
                    >
                    {range}
                    </button>
                ))}
              </div>
              {/* Tabs */}
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-white/10 px-2 overflow-x-auto no-scrollbar">
                {['Body', 'Strength', 'Activity'].map((tab) => (
                    <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-xs font-bold transition-all relative whitespace-nowrap ${
                        activeTab === tab ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'
                    }`}
                    >
                    {tab}
                    {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5722]"></div>
                    )}
                    </button>
                ))}
              </div>
          </div>
      </div>

      {/* SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
          
          {/* 2. HERO CHART AREA (Top 40% Visual Focus) */}
          <div className="relative w-full h-[35vh] bg-white dark:bg-black group overflow-hidden mb-6 transition-colors">
              
              {/* CHART HEADER OVERLAY */}
              <div className="absolute top-2 left-6 z-10 pointer-events-none">
                  {activeTab === 'Body' && (
                      <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">72.5</h2>
                            <span className="text-xl text-gray-500 font-bold">kg</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="bg-green-500/10 px-2 py-0.5 rounded flex items-center gap-1 border border-green-500/20">
                                <TrendingDown size={12} className="text-green-500" />
                                <span className="text-green-500 text-[10px] font-bold">-1.2kg</span>
                            </div>
                            <span className="text-gray-500 dark:text-gray-600 text-[10px] font-medium uppercase tracking-wide">Vs Last Month</span>
                        </div>
                      </div>
                  )} 
                  {activeTab === 'Strength' && (
                      <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                         <div className="flex items-baseline gap-2">
                            <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">80</h2>
                            <span className="text-xl text-gray-500 font-bold">kg</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="bg-[#FF5722]/10 px-2 py-0.5 rounded flex items-center gap-1 border border-[#FF5722]/20">
                                <TrendingUp size={12} className="text-[#FF5722]" />
                                <span className="text-[#FF5722] text-[10px] font-bold">+5%</span>
                            </div>
                            <span className="text-gray-500 dark:text-gray-600 text-[10px] font-medium uppercase tracking-wide">Bench Press PR</span>
                        </div>
                      </div>
                  )}
                  {activeTab === 'Activity' && (
                      <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                         <div className="flex items-baseline gap-2">
                            <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">85%</h2>
                            <span className="text-xl text-gray-500 font-bold">Active</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-500 dark:text-gray-600 text-[10px] font-medium uppercase tracking-wide">Consistency Score</span>
                        </div>
                      </div>
                  )}
              </div>

              {/* Chart Grid */}
              <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px)', backgroundSize: '100% 40px' }}>
              </div>

              {/* THE CHARTS */}
              <div className="absolute inset-0 top-14 -left-2 -right-2 bottom-0">
                  {/* NOTE: Separating logic to avoid ResponsiveContainer messing up standard HTML divs in Activity tab */}
                  {activeTab === 'Activity' ? (
                      <ActivityHeatmap />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        {activeTab === 'Body' ? (
                            <ComposedChart data={bodyData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#FF5722" stopOpacity={0.4}/>
                                        <stop offset="80%" stopColor="#FF5722" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#FF5722', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                {/* History Line */}
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#FF5722" 
                                    strokeWidth={4} 
                                    fill="url(#colorGradient)" 
                                    activeDot={{ r: 8, strokeWidth: 0, fill: '#FF5722', className: 'animate-ping' }}
                                    connectNulls={false}
                                    animationDuration={1000}
                                />
                                {/* Prediction Line (Dashed) */}
                                <Line 
                                    type="monotone"
                                    dataKey="prediction"
                                    stroke="#FF5722"
                                    strokeWidth={3}
                                    strokeDasharray="5 5"
                                    dot={{r: 0}}
                                    activeDot={{ r: 6, fill: '#111' }}
                                    opacity={0.6}
                                    animationDuration={1500}
                                />
                            </ComposedChart>
                        ) : (
                            <BarChart data={strengthData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1000}>
                                    {strengthData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.active ? '#FF5722' : '#888'} 
                                            className="transition-all duration-300 hover:opacity-80 dark:fill-opacity-100 fill-gray-300 dark:fill-[#333]"
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                  )}
              </div>
          </div>

          {/* 3. CONDITIONAL CONTENT SECTION */}
          
          {activeTab === 'Body' ? (
              <>
                {/* 3a. SMART BODY MAP */}
                <div className="px-6 mb-6">
                    <div className="bg-white dark:bg-[#1C1E24] rounded-3xl border border-gray-200 dark:border-white/5 p-4 relative overflow-hidden shadow-sm dark:shadow-none">
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <h3 className="text-gray-900 dark:text-white font-bold text-base">Smart Body Map</h3>
                                <p className="text-gray-500 text-[10px]">AI Muscle Analysis</p>
                            </div>
                        </div>
                        <SmartBodyMap />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FF5722] rounded-full blur-[60px] opacity-10 pointer-events-none"></div>
                    </div>
                </div>

                {/* 3b. BODY STATS GRID */}
                <div className="px-6 mb-6 animate-in slide-in-from-bottom-8 duration-700">
                    <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-3 px-1">Detailed Metrics</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white dark:bg-[#1C1E24] p-4 rounded-2xl border border-gray-200 dark:border-white/5 relative overflow-hidden group shadow-sm dark:shadow-none">
                            <div className="flex items-start justify-between mb-2">
                                <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#111214] flex items-center justify-center border border-gray-200 dark:border-white/5 group-hover:border-[#FF5722]/30 transition-colors">
                                    <Scale size={14} className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                </div>
                                <TrendingDown size={14} className="text-green-500" />
                            </div>
                            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Current Weight</p>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-black text-gray-900 dark:text-white">72.5</span>
                                <span className="text-xs text-gray-500 font-bold">kg</span>
                            </div>
                            <p className="text-[10px] text-green-500 font-bold mt-1">▼ 1.2kg</p>
                        </div>
                        <div className="bg-white dark:bg-[#1C1E24] p-4 rounded-2xl border border-gray-200 dark:border-white/5 relative overflow-hidden group shadow-sm dark:shadow-none">
                            <div className="flex items-start justify-between mb-2">
                                <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#111214] flex items-center justify-center border border-gray-200 dark:border-white/5 group-hover:border-[#FF5722]/30 transition-colors">
                                    <Activity size={14} className="text-[#FF5722]" />
                                </div>
                            </div>
                            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Body Fat</p>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-black text-gray-900 dark:text-white">18</span>
                                <span className="text-xs text-gray-500 font-bold">%</span>
                            </div>
                            <p className="text-[10px] text-[#FF5722] font-bold mt-1 opacity-80">Est. by AI</p>
                        </div>
                    </div>
                </div>
              </>
          ) : activeTab === 'Strength' ? (
              /* 3c. STRENGTH CONTENT */
              <>
                 {/* RADAR CHART (MUSCLE IMBALANCE) */}
                 <div className="px-6 mb-6">
                    <div className="bg-white dark:bg-[#1C1E24] rounded-3xl border border-gray-200 dark:border-white/5 p-4 relative overflow-hidden shadow-sm dark:shadow-none">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-gray-900 dark:text-white font-bold text-base">Muscle Balance</h3>
                                <p className="text-gray-500 text-[10px]">Left vs Right Symmetry</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-gray-600 dark:bg-[#333]"></div>
                                    <span className="text-[9px] text-gray-500 dark:text-gray-400">Left</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-[#FF5722]"></div>
                                    <span className="text-[9px] text-[#FF5722]">Right</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-64 w-full">
                           <ResponsiveContainer width="100%" height="100%">
                              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={muscleBalanceData}>
                                <PolarGrid stroke="#666" strokeOpacity={0.2} />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontWeight: 'bold' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                  name="Left"
                                  dataKey="A"
                                  stroke="#666"
                                  strokeWidth={2}
                                  fill="#888"
                                  fillOpacity={0.1}
                                />
                                <Radar
                                  name="Right"
                                  dataKey="B"
                                  stroke="#FF5722"
                                  strokeWidth={2}
                                  fill="#FF5722"
                                  fillOpacity={0.4}
                                />
                              </RadarChart>
                           </ResponsiveContainer>
                        </div>
                         {/* Imbalance Alert */}
                         <div className="mt-2 bg-gray-50 dark:bg-[#111214] p-3 rounded-xl border-l-2 border-[#FF5722] flex items-start gap-3">
                             <Scale size={16} className="text-[#FF5722] shrink-0 mt-0.5" />
                             <p className="text-gray-500 dark:text-gray-400 text-[10px] leading-relaxed">
                                <span className="text-gray-900 dark:text-white font-bold">Imbalance Detected:</span> Left Tricep is 15% weaker. Focus on unilateral dumbbell extensions.
                             </p>
                         </div>
                    </div>
                </div>
                
                <TrophyCase />
              </>
          ) : (
              /* 3d. ACTIVITY CONTENT */
              <ActivityStats />
          )}

          {/* 4. AI INSIGHT (Bottom Section - Always visible) */}
          <div className="px-6 pb-6">
              <div className="bg-gradient-to-r from-[#FF5722]/10 to-transparent border border-[#FF5722]/20 p-5 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5722] blur-[80px] opacity-10"></div>
                  
                  <div className="flex items-start gap-4 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-[#FF5722] flex items-center justify-center shadow-[0_0_15px_#FF5722] shrink-0 animate-pulse">
                          <Brain size={20} className="text-white" />
                      </div>
                      <div>
                          <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-gray-900 dark:text-white font-bold text-sm">AI Coach Insight</h4>
                              <span className="bg-[#FF5722]/20 text-[#FF5722] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">New</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed font-medium">
                              {activeTab === 'Body' 
                                ? <span>You are losing weight at a healthy pace of <span className="text-gray-900 dark:text-white font-bold">0.5kg/week</span>. Keep protein high.</span>
                                : activeTab === 'Strength'
                                ? <span>Your Bench Press is up <span className="text-gray-900 dark:text-white font-bold">5kg</span> this month. Consider increasing rest times.</span>
                                : <span>You've been active for <span className="text-gray-900 dark:text-white font-bold">5 days</span> straight! Great consistency this week.</span>
                              }
                          </p>
                      </div>
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
};

export default Analytics;