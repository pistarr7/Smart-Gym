import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ArrowRight, Activity, ShieldCheck, Dumbbell, Bot, Check } from 'lucide-react';

interface AssessmentProps {
  onComplete: (profile: UserProfile) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserProfile>({
    name: 'Kevin',
    age: '25',
    gender: 'male',
    height: '175',
    weight: '70',
    goal: 'muscle',
    level: 'beginner'
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Show analyzing animation or screen before completing
      onComplete(formData);
    }
  };

  // AI Chat Bubble Component
  const AiMessage = ({ text }: { text: string }) => (
    <div className="flex items-start space-x-3 mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="min-w-[40px] w-10 h-10 bg-[#F97316] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
        <Bot className="text-white" size={24} />
      </div>
      <div className="bg-white dark:bg-card border border-gray-200 dark:border-white/10 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
        <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-50 dark:bg-[#111214] transition-colors duration-300 pt-safe">
      <div className="flex-1 max-w-md mx-auto w-full flex flex-col">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-[#F97316] h-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        <div className="flex-1 overflow-y-auto pb-4 no-scrollbar">
          {step === 1 && (
            <>
              <AiMessage text="Halo! Saya AI Coach kamu. Untuk membuat rencana yang sempurna, saya butuh sedikit data fisikmu. Siapa nama panggilanmu?" />
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 ml-1">Nama Panggilan</label>
                  <input
                    type="text"
                    autoFocus
                    className="w-full bg-white dark:bg-card border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] focus:outline-none transition-colors shadow-sm"
                    placeholder="Ketuk untuk mengisi..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                {formData.name && (
                   <>
                    {/* Row: Age and Gender */}
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 ml-1">Usia</label>
                            <input
                                type="number"
                                className="w-full bg-white dark:bg-card border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] focus:outline-none transition-colors shadow-sm"
                                placeholder="25"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 ml-1">Jenis Kelamin</label>
                            <div className="flex bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-white/10 p-1 h-[58px]">
                                <button
                                    onClick={() => setFormData({ ...formData, gender: 'male' })}
                                    className={`flex-1 rounded-lg text-sm font-bold transition-all flex items-center justify-center ${formData.gender === 'male' ? 'bg-[#F97316] text-white shadow' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                                >
                                    Pria
                                </button>
                                <button
                                    onClick={() => setFormData({ ...formData, gender: 'female' })}
                                    className={`flex-1 rounded-lg text-sm font-bold transition-all flex items-center justify-center ${formData.gender === 'female' ? 'bg-[#F97316] text-white shadow' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                                >
                                    Wanita
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Row: Height and Weight */}
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 delay-100">
                        <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 ml-1">Tinggi (cm)</label>
                        <input
                            type="number"
                            className="w-full bg-white dark:bg-card border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] focus:outline-none transition-colors shadow-sm"
                            placeholder="170"
                            value={formData.height}
                            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        />
                        </div>
                        <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 ml-1">Berat (kg)</label>
                        <input
                            type="number"
                            className="w-full bg-white dark:bg-card border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] focus:outline-none transition-colors shadow-sm"
                            placeholder="65"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        />
                        </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <AiMessage text={`Hai ${formData.name}! Terima kasih datanya. Sekarang, apa target utama yang ingin kamu capai dalam 3 bulan ke depan?`} />
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                {[
                  { id: 'muscle', label: 'Build Muscle', sub: 'Meningkatkan massa otot & kekuatan', icon: Dumbbell },
                  { id: 'weight_loss', label: 'Lose Weight', sub: 'Membakar lemak & menurunkan berat', icon: Activity },
                  { id: 'endurance', label: 'Endurance', sub: 'Meningkatkan stamina kardio', icon: ShieldCheck },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFormData({ ...formData, goal: item.id as any })}
                    className={`w-full flex items-center p-4 rounded-xl border text-left transition-all ${
                      formData.goal === item.id
                        ? 'bg-[#F97316]/10 border-[#F97316] ring-1 ring-[#F97316]'
                        : 'bg-white dark:bg-card border-gray-200 dark:border-white/5 hover:border-[#F97316]/50'
                    }`}
                  >
                    <div className={`p-3 rounded-full mr-4 ${formData.goal === item.id ? 'bg-[#F97316] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                       <item.icon size={20} />
                    </div>
                    <div>
                      <span className={`block font-bold ${formData.goal === item.id ? 'text-[#F97316]' : 'text-gray-900 dark:text-white'}`}>{item.label}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{item.sub}</span>
                    </div>
                    {formData.goal === item.id && <Check className="ml-auto text-[#F97316]" size={20} />}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <AiMessage text="Analisis selesai! Saya telah membuat rencana latihan yang dipersonalisasi untukmu. Siap untuk memulai transformasi ini?" />
              <div className="mt-6 bg-white dark:bg-card p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm animate-in zoom-in duration-500">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Profil Latihan Kamu</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-2">
                    <span className="text-gray-500">Tipe Tubuh</span>
                    <span className="font-medium text-gray-900 dark:text-white">Normal BMI</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-2">
                    <span className="text-gray-500">Gender & Usia</span>
                    <span className="font-medium text-gray-900 dark:text-white capitalize">{formData.gender === 'male' ? 'Pria' : 'Wanita'}, {formData.age} thn</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-2">
                    <span className="text-gray-500">Fokus Utama</span>
                    <span className="font-medium text-[#F97316] capitalize">{formData.goal.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-500">Intensitas</span>
                    <span className="font-medium text-gray-900 dark:text-white capitalize">{formData.level}</span>
                  </div>
                </div>
                <div className="mt-6 bg-[#F97316]/10 rounded-xl p-3 flex items-center gap-3">
                  <ShieldCheck className="text-[#F97316] shrink-0" size={20} />
                  <p className="text-xs text-[#F97316] font-medium">
                    Data kamu tersimpan aman di perangkat (On-Device Processing).
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={step === 1 && (!formData.name || !formData.height || !formData.weight || !formData.age)}
          className="w-full bg-[#111214] dark:bg-[#F97316] hover:bg-gray-900 dark:hover:bg-[#ea580c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-95 mt-4"
        >
          {step === 3 ? 'Buka Dashboard' : 'Lanjut'}
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Assessment;