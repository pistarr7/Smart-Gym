import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
      
      {/* 
         Animation Sequence:
         0s - 0.5s: Opacity 0 (Pitch black screen)
         0.5s - 1.5s: Fade In + Scale Up slightly
         1.5s - End: Fully Visible
      */}
      <style>{`
        @keyframes reveal {
          0% { opacity: 0; transform: scale(0.95); translateY(10px); }
          100% { opacity: 1; transform: scale(1); translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
      `}</style>

      {/* Central Ambient Glow - Subtle but energetic background */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F97316] rounded-full blur-[120px] opacity-20"
        style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
      ></div>

      <div 
        className="z-10 flex flex-col items-center"
        style={{ 
          opacity: 0,
          animation: 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards' 
        }}
      >
        
        {/* Logo Container */}
        <div className="relative mb-10 group">
            {/* Direct Glow behind logo */}
            <div className="absolute -inset-6 bg-[#F97316] rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            {/* Logo: Stylized 'S' shaped like a flexing muscle */}
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]"
            >
              {/* Top curve (Bicep/Shoulder) */}
              <path 
                d="M75 25 C 45 20, 30 45, 45 55" 
                stroke="#F97316" 
                strokeWidth="12" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Bottom curve (Forearm) forming the S shape */}
              <path 
                d="M45 55 C 60 65, 55 85, 25 80" 
                stroke="#F97316" 
                strokeWidth="12" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Muscle Definition Highlight (White Accent) */}
              <path 
                d="M48 58 C 55 52, 65 52, 70 45" 
                stroke="white" 
                strokeWidth="4" 
                strokeLinecap="round"
                opacity="0.9"
              />
            </svg>
        </div>
        
        {/* App Title - Large Bold White */}
        <h1 className="text-4xl font-black text-white tracking-widest mb-4 uppercase drop-shadow-md text-center">
          SMART-GYM
        </h1>
        
        {/* Tagline - Smaller, 80% Opacity */}
        <p className="text-white text-opacity-80 text-sm font-medium tracking-wider text-center px-4">
          Your personal fitness AI assistant
        </p>
        
      </div>
    </div>
  );
};

export default SplashScreen;