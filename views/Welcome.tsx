import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
  onLogin: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart, onLogin }) => {
  return (
    <div className="h-screen w-full relative flex flex-col justify-end pb-10 overflow-hidden bg-black">
      {/* Background Image: B&W Athlete with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" 
          alt="Athlete Preparing" 
          className="w-full h-full object-cover grayscale opacity-80"
        />
        {/* Heavy gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-6 w-full max-w-md mx-auto space-y-8 animate-in slide-in-from-bottom-10 duration-700">
        
        {/* Typography */}
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
            Latihan <br />
            Lebih Pintar, <br />
            Bukan Lebih Keras.
          </h1>
          <p className="text-gray-300 text-lg font-medium leading-relaxed max-w-[90%]">
            Capai targetmu dengan panduan AI real-time.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <button 
            onClick={onStart}
            className="w-full bg-[#F97316] hover:bg-[#ea580c] active:scale-[0.98] text-white text-lg font-bold py-4 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-orange-500/20 group"
          >
            Mulai Sekarang
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onLogin}
            className="w-full text-white/90 hover:text-[#F97316] font-semibold py-3 transition-colors text-base"
          >
            Sudah punya akun? <span className="text-[#F97316] ml-1">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;