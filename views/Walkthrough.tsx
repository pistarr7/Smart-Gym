import React, { useState } from 'react';
import { ArrowRight, Trophy, User, CheckCircle, Scan, Award, Utensils } from 'lucide-react';

interface WalkthroughProps {
  onFinish: () => void;
}

const Walkthrough: React.FC<WalkthroughProps> = ({ onFinish }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Koreksi Gerakan Real-time",
      desc: "Kamera pintarmu memastikan posturmu selalu benar untuk mencegah cedera dan memaksimalkan hasil.",
      renderVisual: () => (
        <div className="relative w-64 h-[400px] md:h-[480px] bg-gray-900 rounded-[3rem] border-4 border-gray-800 p-2 shadow-2xl overflow-hidden animate-in zoom-in duration-700">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-xl z-20"></div>
          <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?q=80&w=600&auto=format&fit=crop" 
               alt="Squat Analysis" 
               className="w-full h-full object-cover opacity-70"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20"></div>
             <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" viewBox="0 0 100 200">
                <g stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" fill="none">
                    <circle cx="50" cy="55" r="6" />
                    <path d="M50 61 L50 110" />
                    <path d="M30 70 L70 70" />
                    <path d="M30 70 L25 100" />
                    <path d="M70 70 L75 100" />
                    <path d="M35 110 L65 110" />
                    <path d="M35 110 L25 140 L35 170" />
                    <path d="M65 110 L75 140 L65 170" />
                </g>
                <g fill="#FFFFFF">
                    <circle cx="50" cy="55" r="2" />
                    <circle cx="50" cy="70" r="2" />
                    <circle cx="30" cy="70" r="2" />
                    <circle cx="70" cy="70" r="2" />
                    <circle cx="50" cy="110" r="2" />
                    <circle cx="25" cy="140" r="2" />
                    <circle cx="75" cy="140" r="2" />
                </g>
             </svg>
             <div className="absolute bottom-6 left-3 right-3">
                <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl border border-[#F97316]/30 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse shadow-[0_0_10px_#F97316]"></div>
                   <div className="flex-1">
                      <div className="flex justify-between text-[8px] text-gray-300 mb-1">
                          <span>Posture Accuracy</span>
                          <span className="text-[#F97316] font-bold">98%</span>
                      </div>
                      <div className="h-1 bg-gray-700 rounded-full w-full">
                         <div className="h-full bg-[#F97316] w-[98%] rounded-full shadow-[0_0_8px_#F97316]"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Analisis Nutrisi Pintar",
      desc: "Foto makananmu, dan biarkan AI menghitung kalori serta makronutrisi dalam hitungan detik.",
      renderVisual: () => (
        <div className="relative w-64 h-[400px] md:h-[480px] bg-gray-900 rounded-[3rem] border-4 border-gray-800 p-2 shadow-2xl overflow-hidden animate-in zoom-in duration-700">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-xl z-20"></div>
           <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative flex flex-col items-center justify-center">
              
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

              {/* Central Food Item (Abstract Burger/Apple) */}
              <div className="relative z-10 animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-[0_0_40px_rgba(34,197,94,0.3)] flex items-center justify-center relative overflow-hidden">
                      {/* Leaf */}
                      <div className="absolute -top-4 left-1/2 w-8 h-8 bg-green-300 rounded-tr-[100%] rounded-bl-[40%] transform -rotate-45"></div>
                      <Utensils size={40} className="text-white opacity-80" />
                      
                      {/* Scanning Effect */}
                      <div className="absolute inset-0 bg-white/20 h-1 top-0 animate-[scan_2s_linear_infinite]"></div>
                  </div>
              </div>

              {/* Scanning Frame */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-[#F97316] rounded-2xl relative opacity-80">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#F97316] -mt-1 -ml-1"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#F97316] -mt-1 -mr-1"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#F97316] -mb-1 -ml-1"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#F97316] -mb-1 -mr-1"></div>
                      
                      {/* Scan Tag */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#F97316] px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <Scan size={12} className="text-white" />
                          <span className="text-white text-[10px] font-bold">Scanning...</span>
                      </div>
                  </div>
              </div>

              {/* Nutrition Card Popup */}
              <div className="absolute bottom-12 left-4 right-4 bg-gray-800/90 backdrop-blur border border-gray-700 p-3 rounded-xl animate-in slide-in-from-bottom-10 delay-500 duration-700 flex justify-between items-center shadow-2xl">
                  <div>
                      <p className="text-white font-bold text-sm">Green Apple</p>
                      <p className="text-gray-400 text-[10px]">Medium Size (180g)</p>
                  </div>
                  <div className="text-right">
                      <p className="text-[#F97316] font-bold text-lg leading-none">95</p>
                      <p className="text-gray-500 text-[9px] uppercase font-bold">Kcal</p>
                  </div>
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
      )
    },
    {
      id: 3,
      title: "Sinkronisasi Biometrik",
      desc: "Hubungkan smartwatchmu. AI akan menyesuaikan intensitas latihan berdasarkan detak jantungmu.",
       renderVisual: () => (
        <div className="relative w-64 h-[400px] md:h-[480px] bg-gray-900 rounded-[3rem] border-4 border-gray-800 p-2 shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in duration-700">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-xl z-20"></div>
             <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-between py-12 relative">
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="w-0.5 h-32 bg-gradient-to-b from-[#F97316] to-transparent opacity-60"></div>
                 </div>
                 <div className="relative z-10 animate-bounce" style={{ animationDuration: '3s' }}>
                     <div className="w-28 h-32 bg-[#1C1E24] rounded-[2rem] border-[3px] border-gray-700 p-1 shadow-[0_0_20px_rgba(249,115,22,0.2)] relative">
                         <div className="w-full h-full bg-black rounded-[1.7rem] flex flex-col items-center justify-center border border-gray-800 relative overflow-hidden">
                             <svg className="absolute bottom-0 w-full h-12 opacity-30" preserveAspectRatio="none">
                                <path d="M0 15 Q 15 25, 30 15 T 60 15 T 90 15 V 35 H 0 Z" fill="#F97316" className="animate-pulse" />
                             </svg>
                             <span className="text-3xl font-bold text-white tracking-tighter">118</span>
                             <span className="text-[9px] text-[#F97316] font-bold tracking-widest">BPM</span>
                         </div>
                         <div className="absolute top-8 -right-1.5 w-1.5 h-6 bg-gray-500 rounded-r-md"></div>
                     </div>
                 </div>
                 <div className="flex flex-col gap-2 items-center justify-center -mt-4 mb-2">
                     {[1,2,3].map(i => (
                         <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-ping" style={{ animationDelay: `${i * 0.3}s`, opacity: 0.6 }}></div>
                     ))}
                 </div>
                 <div className="relative z-10 w-48 h-40 bg-[#1C1E24] rounded-t-[2.5rem] border-[3px] border-gray-700 border-b-0 p-2 shadow-2xl">
                     <div className="w-full h-full bg-black rounded-t-[2.2rem] flex flex-col items-center pt-6 relative overflow-hidden">
                         <div className="w-16 h-1 bg-gray-800 rounded-full mb-5"></div>
                         <div className="w-full px-4 space-y-3">
                             <div className="flex items-center gap-3 bg-gray-900/80 p-2 rounded-xl border border-[#F97316]/20">
                                 <div className="w-8 h-8 rounded-full bg-[#F97316]/20 flex items-center justify-center">
                                     <div className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse shadow-[0_0_5px_#F97316]"></div>
                                 </div>
                                 <div className="flex-1">
                                     <div className="h-1.5 w-16 bg-gray-700 rounded-full mb-1.5"></div>
                                     <div className="h-1.5 w-10 bg-gray-800 rounded-full"></div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
       )
    },
    {
      id: 4,
      title: "Kompetisi & Rewards",
      desc: "Setiap tetes keringat berharga. Kumpulkan lencana, naik level, dan bersaing di papan peringkat global.",
      renderVisual: () => (
        <div className="relative w-64 h-[400px] md:h-[480px] bg-gray-900 rounded-[3rem] border-4 border-gray-800 p-2 shadow-2xl overflow-hidden animate-in zoom-in duration-700">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-xl z-20"></div>
          <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative flex flex-col items-center justify-end pb-10">
             
             {/* Confetti Background */}
             <div className="absolute inset-0">
                 {[...Array(15)].map((_,i) => (
                    <div key={i} className="absolute w-1 h-1 bg-[#F97316] rounded-full animate-pulse opacity-50" 
                         style={{
                           top: `${Math.random() * 80}%`, 
                           left: `${Math.random() * 100}%`,
                           animationDelay: `${Math.random() * 2}s`
                         }}></div>
                 ))}
             </div>

             {/* Podium */}
             <div className="flex items-end justify-center gap-2 relative z-10 px-4">
                 {/* 2nd Place */}
                 <div className="flex flex-col items-center animate-in slide-in-from-bottom-8 delay-100 duration-700">
                    <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-600 mb-2 overflow-hidden">
                       <img src="https://ui-avatars.com/api/?name=Jane&background=333&color=fff" className="w-full h-full" alt="2" />
                    </div>
                    <div className="w-14 h-20 bg-gray-800 rounded-t-lg flex items-center justify-center border-t border-gray-700">
                        <span className="text-gray-500 font-bold text-xl">2</span>
                    </div>
                 </div>

                 {/* 1st Place */}
                 <div className="flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700">
                    <Award className="text-[#F97316] absolute -top-28 animate-bounce" size={32} />
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#F97316] to-yellow-500 p-0.5 mb-2 overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.5)] z-20">
                       <img src="https://ui-avatars.com/api/?name=You&background=000&color=fff" className="w-full h-full rounded-full border-2 border-white" alt="1" />
                    </div>
                    <div className="w-16 h-32 bg-gradient-to-b from-[#F97316] to-orange-700 rounded-t-lg flex items-center justify-center shadow-lg relative z-10">
                        <span className="text-white font-black text-3xl drop-shadow-md">1</span>
                    </div>
                 </div>

                 {/* 3rd Place */}
                 <div className="flex flex-col items-center animate-in slide-in-from-bottom-8 delay-200 duration-700">
                    <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-600 mb-2 overflow-hidden">
                       <img src="https://ui-avatars.com/api/?name=Bob&background=333&color=fff" className="w-full h-full" alt="3" />
                    </div>
                    <div className="w-14 h-14 bg-gray-800 rounded-t-lg flex items-center justify-center border-t border-gray-700">
                        <span className="text-gray-500 font-bold text-xl">3</span>
                    </div>
                 </div>
             </div>
             
             {/* Text Badge */}
             <div className="absolute top-20 bg-[#F97316]/20 border border-[#F97316] px-4 py-1 rounded-full animate-pulse">
                <span className="text-[#F97316] text-[10px] font-bold uppercase tracking-widest">Global Top 1%</span>
             </div>

          </div>
        </div>
      )
    },
    {
        id: 5,
        title: "Rencana Khusus Untukmu",
        desc: "Tidak ada rencana generik. AI membuat jadwal berdasarkan tujuan dan kondisimu.",
        renderVisual: () => (
             <div className="relative w-64 h-[400px] md:h-[480px] bg-gray-900 rounded-[3rem] border-4 border-gray-800 p-2 shadow-2xl overflow-hidden animate-in zoom-in duration-700">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-xl z-20"></div>
                 <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative flex flex-col items-center p-6">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/30 via-black to-black"></div>
                     <div className="absolute inset-0 top-20 bottom-32 px-4 pointer-events-none">
                         <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                             <path d="M10 90 Q 30 80, 50 50 T 90 10" fill="none" stroke="#333" strokeWidth="2" strokeDasharray="4,4" />
                             <path 
                                d="M10 90 Q 30 80, 50 50 T 90 10" 
                                fill="none" 
                                stroke="#F97316" 
                                strokeWidth="3" 
                                strokeLinecap="round" 
                                strokeDasharray="100" 
                                strokeDashoffset="100" 
                                style={{animation: 'drawPath 2.5s ease-out forwards 0.5s'}} 
                             />
                             <style>{`
                                 @keyframes drawPath {
                                     to { stroke-dashoffset: 0; }
                                 }
                             `}</style>
                         </svg>
                     </div>
                     <div className="absolute top-16 right-4 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                         <div className="relative flex flex-col items-center">
                             <div className="absolute inset-0 bg-[#F97316] blur-2xl opacity-40 rounded-full animate-pulse"></div>
                             <Trophy size={56} className="text-[#F97316] drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] z-10" strokeWidth={1.5} />
                             <div className="mt-2 px-2 py-1 bg-[#F97316] rounded-md text-[8px] font-bold text-white z-10 shadow-lg transform rotate-[-5deg]">
                                 GOAL!
                             </div>
                         </div>
                     </div>
                     <div className="absolute bottom-8 w-full px-2 z-10 animate-in slide-in-from-bottom-8 duration-700 delay-300">
                         <div className="bg-[#1C1E24]/90 backdrop-blur border border-[#F97316]/30 p-4 rounded-2xl shadow-2xl relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-1 h-full bg-[#F97316]"></div>
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                                      <User size={20} className="text-gray-400" />
                                 </div>
                                 <div className="flex-1 space-y-2">
                                      <div className="h-2 w-20 bg-gray-700 rounded-full"></div>
                                      <div className="h-2 w-12 bg-gray-800 rounded-full"></div>
                                 </div>
                                 <div className="bg-[#F97316]/20 p-1.5 rounded-full">
                                    <CheckCircle size={16} className="text-[#F97316]" />
                                 </div>
                             </div>
                             <div className="mt-3 flex justify-between items-center pt-3 border-t border-white/5">
                                 <span className="text-[10px] text-gray-400">Status</span>
                                 <span className="text-[10px] text-[#F97316] font-bold tracking-wider">PERSONALIZED</span>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        )
    }
  ];

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      onFinish();
    }
  };

  const isLastSlide = slideIndex === slides.length - 1;

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col justify-between py-6 px-6 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F97316] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      {/* Skip Button */}
      <div className="w-full flex justify-end z-20 pt-safe min-h-[40px]">
        {!isLastSlide && (
            <button onClick={onFinish} className="text-gray-500 font-medium text-sm px-4 py-2 hover:text-white transition-colors z-30">
            Lewati
            </button>
        )}
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
          <div key={slideIndex} className="flex flex-col items-center w-full max-w-sm animate-in fade-in slide-in-from-right-8 duration-500">
             
             {/* Render Visual */}
             <div className="mb-6 md:mb-10 transform scale-95 hover:scale-100 transition-transform duration-500">
                 {slides[slideIndex].renderVisual()}
             </div>

             {/* Text Content */}
             <div className="text-center space-y-3 px-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                    {slides[slideIndex].title}
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {slides[slideIndex].desc}
                </p>
             </div>
          </div>
      </div>

      {/* Footer: Dots & Next Button */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6 z-20 pb-4 md:pb-6">
        {/* Indicators */}
        <div className="flex justify-center space-x-2">
          {slides.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setSlideIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === slideIndex ? 'w-6 bg-[#F97316]' : 'w-1.5 bg-gray-800'
              }`}
            />
          ))}
        </div>

        {/* Action Button - Always Solid Primary for Visibility */}
        <button 
          onClick={handleNext}
          className="flex items-center justify-center space-x-2 font-bold text-base transition-all duration-300 py-4 px-8 active:scale-95 w-full rounded-xl bg-[#F97316] text-white hover:bg-[#ea580c] shadow-lg shadow-orange-500/20"
        >
          <span>{isLastSlide ? 'Buat Akun Sekarang' : 'Lanjut'}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Walkthrough;