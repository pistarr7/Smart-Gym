import React, { useState } from 'react';
import { Mail, Lock, Chrome, Apple } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthProps {
  onLogin: (user: UserProfile) => void;
  onSignUp: () => void;
  defaultIsLogin?: boolean;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onSignUp, defaultIsLogin = false }) => {
  const [isLogin, setIsLogin] = useState(defaultIsLogin); 
  const [email, setEmail] = useState('smartgtym@gmail.com');
  const [password, setPassword] = useState('12345678');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate auth delay
    setTimeout(() => {
      if (isLogin) {
        // SIMULATION: If logging in, we fetch existing user data from "Database"
        // and skip the assessment screen.
        const mockExistingUser: UserProfile = {
          name: 'Alex Johnson',
          age: '24',
          gender: 'male',
          height: '178',
          weight: '75',
          goal: 'muscle',
          level: 'intermediate'
        };
        onLogin(mockExistingUser);
      } else {
        // If signing up, we go to the assessment screen to create profile
        onSignUp();
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111214] flex flex-col p-6 justify-center transition-colors duration-300">
      <div className="max-w-md mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isLogin ? 'Selamat Datang!' : 'Buat Akun Baru'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {isLogin ? 'Masuk untuk melanjutkan latihanmu' : 'Gabung komunitas Smart-GYM hari ini'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white dark:bg-card border border-gray-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all"
                placeholder="hello@example.com"
                required
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white dark:bg-card border border-gray-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-[#F97316] font-medium hover:underline">
                Lupa Password?
              </button>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all mt-4"
          >
            {isLogin ? 'Masuk' : 'Daftar Sekarang'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-50 dark:bg-[#111214] text-gray-500">Atau lanjutkan dengan</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center py-3 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-colors bg-white dark:bg-card">
            <Chrome size={20} className="mr-2 text-gray-900 dark:text-white" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
          </button>
          <button className="flex items-center justify-center py-3 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-colors bg-white dark:bg-card">
            <Apple size={20} className="mr-2 text-gray-900 dark:text-white" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Apple</span>
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 dark:text-gray-400">
            {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[#F97316] font-bold hover:underline"
            >
              {isLogin ? 'Daftar' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;