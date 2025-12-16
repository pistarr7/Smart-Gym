import React, { useState, useEffect } from 'react';
import { ArrowLeft, ScanLine, Smartphone, Check, User } from 'lucide-react';

interface CameraSetupProps {
  onSetupComplete: () => void;
  onCancel: () => void;
}

const CameraSetup: React.FC<CameraSetupProps> = ({ onSetupComplete, onCancel }) => {
  const [status, setStatus] = useState<'instruction' | 'scanning' | 'detected' | 'countdown'>('instruction');
  const [countdown, setCountdown] = useState(3);

  // Flow Logic Simulation
  useEffect(() => {
    let timer: any;

    if (status === 'instruction') {
      // Show instructions for 4 seconds, then start scanning
      timer = setTimeout(() => {
        setStatus('scanning');
      }, 4000);
    } else if (status === 'scanning') {
      // Simulate scanning for 3 seconds
      timer = setTimeout(() => {
        setStatus('detected');
      }, 3000);
    } else if (status === 'detected') {
      // Wait 1s then auto-start countdown
      timer = setTimeout(() => {
        setStatus('countdown');
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [status]);

  // Countdown Logic
  useEffect(() => {
    if (status === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        onSetupComplete();
      }
    }
  }, [status, countdown, onSetupComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col font-sans">
      {/* Background Camera Feed (Simulated) */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop" 
          alt="Camera Feed" 
          className={`w-full h-full object-cover transition-all duration-700 ${status === 'instruction' ? 'blur-md brightness-[0.4]' : 'blur-none brightness-75'}`}
        />
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
        </div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between p-6 pt-safe">
        <button onClick={onCancel} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status === 'scanning' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
            {status === 'scanning' ? 'AI Camera Active' : 'Ready'}
          </span>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-6">
        
        {/* Phase 1: Instruction Card */}
        {status === 'instruction' && (
          <div className="bg-[#1C1E24]/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl animate-in fade-in zoom-in duration-500">
             {/* Animated Icon */}
             <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-[#F97316]/20 rounded-full animate-ping"></div>
                <div className="relative w-full h-full bg-[#111214] rounded-full flex items-center justify-center border-2 border-[#F97316]">
                    <Smartphone size={40} className="text-white mb-2" />
                </div>
                {/* Floor Line */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gray-500"></div>
             </div>

             <h2 className="text-2xl font-bold text-white mb-3">Persiapan Kamera</h2>
             <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Letakkan HP di lantai atau meja, sandarkan ke botol air atau dinding, lalu mundur sekitar <strong>2 meter</strong>.
             </p>
             
             <button onClick={() => setStatus('scanning')} className="w-full bg-[#F97316] text-white font-bold py-3.5 rounded-xl hover:bg-[#E64A19] transition-colors">
               Saya Mengerti
             </button>
          </div>
        )}

        {/* Phase 2 & 3: Calibration & Scanning */}
        {(status === 'scanning' || status === 'detected' || status === 'countdown') && (
          <div className="relative w-full h-full max-w-md flex flex-col items-center justify-center animate-in fade-in duration-700">
             
             {/* BODY SILHOUETTE OVERLAY */}
             <div className="relative w-64 h-[70vh] border-2 border-dashed border-white/30 rounded-[3rem] flex items-center justify-center overflow-hidden transition-all duration-500"
                  style={{ borderColor: status === 'detected' || status === 'countdown' ? '#22c55e' : 'rgba(255,255,255,0.3)' }}>
                
                {/* The Silhouette */}
                <User size={300} strokeWidth={0.5} className={`transition-colors duration-500 ${status === 'detected' || status === 'countdown' ? 'text-green-500/50' : 'text-white/20'}`} />

                {/* Scanning Beam Animation */}
                {status === 'scanning' && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F97316] to-transparent shadow-[0_0_15px_#F97316] w-full animate-[scan_2s_ease-in-out_infinite]"></div>
                )}
                
                {/* Countdown Overlay */}
                {status === 'countdown' && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
                      <span className="text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-bounce">
                        {countdown}
                      </span>
                   </div>
                )}
             </div>

             {/* Text Instruction Overlay */}
             <div className="absolute top-10 bg-black/50 backdrop-blur px-6 py-2 rounded-full border border-white/10">
                <p className="text-white font-medium text-sm">
                   {status === 'scanning' ? 'Pastikan seluruh tubuh terlihat' : 'Posisi sempurna!'}
                </p>
             </div>

          </div>
        )}

      </div>

      {/* Bottom Status & Action Bar */}
      <div className="relative z-10 p-6 pb-10 bg-gradient-to-t from-black via-black/90 to-transparent">
         <div className="max-w-md mx-auto">
            {status === 'scanning' && (
                <div className="flex items-center gap-4 animate-pulse">
                    <ScanLine size={24} className="text-[#F97316]" />
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Status</p>
                        <p className="text-white font-medium">Mencari tubuh...</p>
                    </div>
                </div>
            )}

            {(status === 'detected' || status === 'countdown') && (
                <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-4">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500">
                             <Check size={20} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-green-500 text-xs uppercase tracking-wider font-bold">Berhasil</p>
                            <p className="text-white font-medium">Tubuh terdeteksi!</p>
                        </div>
                    </div>
                    
                    {status === 'detected' && (
                        <button 
                          onClick={() => setStatus('countdown')}
                          className="w-full bg-[#F97316] text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:bg-[#E64A19] transition-all active:scale-95"
                        >
                          SAYA SIAP
                        </button>
                    )}
                </div>
            )}
            
            {status === 'instruction' && (
                 <div className="text-center">
                    <p className="text-gray-500 text-xs">Menunggu konfirmasi pengguna...</p>
                 </div>
            )}
         </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CameraSetup;