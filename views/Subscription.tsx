import React, { useState } from 'react';
import { X, Check, Crown, Zap, Shield, Sparkles, Star, ChevronRight } from 'lucide-react';

interface SubscriptionProps {
  onClose: () => void;
}

const Subscription: React.FC<SubscriptionProps> = ({ onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const features = [
    { name: 'Manual Workouts', free: true, elite: true },
    { name: 'Standard Analytics', free: true, elite: true },
    { name: 'AI Camera Correction', free: false, elite: true },
    { name: 'Smartwatch Sync', free: false, elite: true },
    { name: 'Dynamic AI Planning', free: false, elite: true },
    { name: 'Ad-Free Experience', free: false, elite: true },
  ];

  return (
    <div className="fixed inset-0 bg-[#000000] z-[100] flex flex-col overflow-y-auto animate-in fade-in duration-500 font-sans text-white">
      
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="fixed top-6 right-6 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-gray-300 hover:text-white transition-colors"
      >
        <X size={24} />
      </button>

      {/* 1. HERO HEADER */}
      <div className="relative h-[45vh] w-full shrink-0">
         <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" 
            alt="Elite Athlete" 
            className="w-full h-full object-cover grayscale opacity-60"
         />
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent"></div>
         
         {/* Content */}
         <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400/20 to-yellow-600/20 border border-amber-500/50 mb-4 backdrop-blur-md">
                <Crown size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">Premium Upgrade</span>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-[0.9] mb-3">
               Train Like <br/> A <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600">Pro.</span>
            </h1>
            <p className="text-gray-300 text-sm font-medium leading-relaxed max-w-[90%]">
               Unlock AI Coaching, Real-time Form Correction, and Smartwatch Integration with <span className="text-amber-400 font-bold">Smart-GYM ELITE</span>.
            </p>
         </div>
      </div>

      {/* 2. COMPARISON LIST */}
      <div className="px-6 py-6 space-y-6">
         <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Features</span>
            <div className="flex gap-8">
               <span className="text-xs font-bold text-gray-500 uppercase w-8 text-center">Free</span>
               <span className="text-xs font-bold text-amber-500 uppercase w-8 text-center">Elite</span>
            </div>
         </div>

         <div className="space-y-4">
            {features.map((feature, idx) => (
               <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <span className={`text-sm font-medium ${feature.free ? 'text-gray-300' : 'text-white'}`}>{feature.name}</span>
                  <div className="flex gap-8">
                     <div className="w-8 flex justify-center">
                        {feature.free ? (
                           <Check size={16} className="text-gray-600" />
                        ) : (
                           <div className="w-4 h-0.5 bg-gray-800 rounded-full mt-2"></div>
                        )}
                     </div>
                     <div className="w-8 flex justify-center">
                        {feature.elite && (
                           <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                              <Check size={12} className="text-black stroke-[3]" />
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* 3. PRICING CARDS */}
      <div className="px-6 pb-32">
         <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            Choose Your Plan
            <Sparkles size={16} className="text-amber-400" />
         </h3>

         <div className="space-y-4">
            {/* Yearly Plan (Best Value) */}
            <button 
               onClick={() => setSelectedPlan('yearly')}
               className={`w-full relative p-5 rounded-2xl border-2 text-left transition-all duration-300 group ${
                  selectedPlan === 'yearly' 
                  ? 'bg-[#111] border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)]' 
                  : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'
               }`}
            >
               {selectedPlan === 'yearly' && (
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                     <Star size={10} fill="black" /> BEST VALUE
                  </div>
               )}
               <div className="flex justify-between items-start mb-2">
                  <div>
                     <p className={`font-bold text-lg ${selectedPlan === 'yearly' ? 'text-white' : 'text-gray-400'}`}>Yearly Access</p>
                     <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-black text-white">Rp 499.000</span>
                        <span className="text-gray-500 text-xs font-medium">/ year</span>
                     </div>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded text-[10px] font-bold border border-[#22c55e]/20">
                        SAVE 30%
                     </span>
                  </div>
               </div>
               <p className="text-amber-500 text-xs font-medium flex items-center gap-1">
                  <Zap size={12} fill="currentColor" />
                  Equivalent to just Rp 41k / month
               </p>
            </button>

            {/* Monthly Plan */}
            <button 
               onClick={() => setSelectedPlan('monthly')}
               className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                  selectedPlan === 'monthly' 
                  ? 'bg-[#111] border-amber-500/50' 
                  : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'
               }`}
            >
               <div className="flex justify-between items-center">
                  <div>
                     <p className={`font-bold text-lg ${selectedPlan === 'monthly' ? 'text-white' : 'text-gray-400'}`}>Monthly Access</p>
                     <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-black text-white">Rp 59.000</span>
                        <span className="text-gray-500 text-xs font-medium">/ month</span>
                     </div>
                  </div>
               </div>
               <p className="text-gray-500 text-xs mt-2">Flexible, cancel anytime.</p>
            </button>
         </div>
         
         {/* Student Link */}
         <div className="text-center mt-6">
            <button className="text-gray-500 text-xs hover:text-white transition-colors underline decoration-gray-700">
               Are you a student? Get 50% Off verification.
            </button>
         </div>

      </div>

      {/* 4. STICKY BOTTOM CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent pt-12 pb-8 px-6 z-40">
         <div className="max-w-md mx-auto">
             <button 
               className="w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-black text-lg py-4 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
             >
                Start 7-Day Free Trial
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </button>
             <p className="text-center text-[10px] text-gray-500 mt-3">
                No charge until trial ends. Cancel anytime in Settings.
             </p>
         </div>
      </div>

    </div>
  );
};

export default Subscription;