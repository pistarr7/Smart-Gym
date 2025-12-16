import React, { useState, useEffect } from 'react';
import { 
  Check, Moon, RefreshCw, Shuffle, ChevronRight, Dumbbell, 
  Search, MapPin, ChevronDown, Filter, Zap, LayoutGrid, Info, HelpCircle, 
  Calendar as CalendarIcon, Home, PlayCircle, Heart, Coffee, ArrowLeft, Camera, Trophy, AlertCircle, Timer, Flame, X, ArrowRight, Send, Loader2, BicepsFlexed
} from 'lucide-react';

type Tab = 'schedule' | 'library';
type Equipment = 'Full Gym' | 'Home Workout' | 'Bodyweight';

interface Challenge {
  id: number;
  title: string;
  subtitle: string;
  progress: number;
  colorFrom: string;
  colorTo: string;
  isActive: boolean;
}

interface Exercise {
    id: string;
    name: string;
    subtitle: string;
    category: string;
    type: string;
    difficulty: string;
    views: string;
    img: string;
    details: boolean;
    instructions?: string[];
}

const Program: React.FC = () => {
  // STATE
  const [activeTab, setActiveTab] = useState<Tab>('schedule'); 
  const [equipment, setEquipment] = useState<Equipment>('Full Gym');
  const [showEquipmentMenu, setShowEquipmentMenu] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1); // Default to roughly today (Mon=0)
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const [showWhyPlan, setShowWhyPlan] = useState(false);
  const [planVariation, setPlanVariation] = useState<number>(0);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Challenges State
  const [joinedChallenges, setJoinedChallenges] = useState<Challenge[]>([
      {
          id: 1,
          title: "100 Push-up Challenge",
          subtitle: "Day 3 of 7 • Strength",
          progress: 42,
          colorFrom: "from-orange-500",
          colorTo: "to-red-600",
          isActive: true
      }
  ]);
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  
  // Exercise Detail State
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    setPlanVariation(0);
    setShowWhyPlan(true);
  }, [selectedDay, equipment]);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
        setPlanVariation(prev => prev + 1);
        setIsRegenerating(false);
        setShowWhyPlan(true);
    }, 800);
  };

  const handleJoinChallenge = (challenge: any) => {
      // Check if already joined
      if (joinedChallenges.find(c => c.id === challenge.id)) {
          alert("Kamu sudah bergabung di challenge ini!");
          return;
      }

      const newChallenge: Challenge = {
          id: challenge.id,
          title: challenge.title,
          subtitle: `Day 1 of ${challenge.days} • ${challenge.level}`,
          progress: 0,
          colorFrom: challenge.colorFrom, 
          colorTo: challenge.colorTo,
          isActive: true
      };
      
      setJoinedChallenges([newChallenge, ...joinedChallenges]);
      alert(`Berhasil bergabung ke "${challenge.title}"!`);
      
      // Switch tab to schedule so user can see their new active challenge immediately
      setActiveTab('schedule');
  };

  // --- DYNAMIC SCHEDULE LOGIC ---

  const weekDays = [
    { day: 'MON', date: '13' },
    { day: 'TUE', date: '14' },
    { day: 'WED', date: '15' },
    { day: 'THU', date: '16' },
    { day: 'FRI', date: '17' },
    { day: 'SAT', date: '18' },
    { day: 'SUN', date: '19' },
  ];

  const getDailyPlan = () => {
    const isVariationA = planVariation % 2 === 0;

    // 1. BODYWEIGHT LOGIC
    if (equipment === 'Bodyweight') {
        switch (selectedDay) {
            case 0: // Mon
                return {
                    title: isVariationA ? 'PUSH POWER' : 'CHEST EXPLOSION',
                    subtitle: 'Upper Body Strength',
                    stats: '30 Mins • High Intensity',
                    reason: isVariationA 
                        ? "Senin adalah hari terbaik untuk membangun momentum. Fokus pada variasi Push-up." 
                        : "AI mendeteksi kamu butuh variasi eksplosif untuk memecah plateau otot dada.",
                    type: 'workout',
                    exercises: isVariationA ? [
                        { name: 'Standard Push Ups', sets: 4, reps: '15-20', weight: 'BW', img: 'https://images.unsplash.com/photo-1598971639058-211a742890ea?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Diamond Push Ups', sets: 3, reps: '10-12', weight: 'BW', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Pike Push Ups', sets: 3, reps: '8-10', weight: 'BW', img: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?q=80&w=400&auto=format&fit=crop' }
                    ] : [
                        { name: 'Clapping Push Ups', sets: 4, reps: '8-10', weight: 'BW', img: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Wide Push Ups', sets: 3, reps: '15', weight: 'BW', img: 'https://images.unsplash.com/photo-1598971639058-211a742890ea?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Incline Push Ups', sets: 3, reps: '15', weight: 'BW', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop' }
                    ]
                };
            case 1: // Tue
                return {
                    title: 'LOWER BODY BURN',
                    subtitle: 'Legs & Glutes',
                    stats: '35 Mins • Endurance',
                    reason: "Mengistirahatkan tubuh bagian atas. Fokus pada fondasi kaki yang kuat hari ini.",
                    type: 'workout',
                    exercises: [
                        { name: 'Bodyweight Squats', sets: 4, reps: '25', weight: 'BW', img: 'https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Walking Lunges', sets: 3, reps: '20', weight: 'BW', img: 'https://images.unsplash.com/photo-1434608519344-49d77a699ded?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Glute Bridges', sets: 3, reps: '20', weight: 'BW', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop' }
                    ]
                };
            case 2: // Wed
                return {
                    title: 'CORE CRUSHER',
                    subtitle: 'Abs & Obliques',
                    stats: '20 Mins • Core Focus',
                    reason: "Mid-week core activation. Memperkuat stabilitas untuk gerakan kompleks lainnya.",
                    type: 'workout',
                    exercises: [
                        { name: 'Plank Hold', sets: 3, reps: '60s', weight: 'Time', img: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Mountain Climbers', sets: 3, reps: '30s', weight: 'Speed', img: 'https://images.unsplash.com/photo-1434608519344-49d77a699ded?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Leg Raises', sets: 3, reps: '15', weight: 'BW', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop' }
                    ]
                };
            case 3: // Thu
                return {
                    title: 'FULL BODY HIIT',
                    subtitle: 'Cardio & Conditioning',
                    stats: '25 Mins • Fat Loss',
                    reason: "Meningkatkan detak jantung untuk pembakaran lemak maksimal sebelum akhir pekan.",
                    type: 'workout',
                    exercises: [
                        { name: 'Burpees', sets: 4, reps: '10', weight: 'BW', img: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Jumping Jacks', sets: 4, reps: '50', weight: 'BW', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop' },
                        { name: 'High Knees', sets: 4, reps: '30s', weight: 'BW', img: 'https://images.unsplash.com/photo-1434608519344-49d77a699ded?q=80&w=400&auto=format&fit=crop' }
                    ]
                };
             // ... other days similar logic
             default:
                return {
                    title: 'ACTIVE RECOVERY',
                    subtitle: 'Mobility & Stretch',
                    stats: '15 Mins • Recovery',
                    reason: "Hari istirahat. Lakukan peregangan ringan untuk mempersiapkan tubuh minggu depan.",
                    type: 'rest',
                    exercises: []
                };
        }
    }

    // 2. FULL GYM LOGIC
    if (equipment === 'Full Gym') {
        switch (selectedDay) {
            case 0: // Mon
                return {
                    title: isVariationA ? 'CHEST & TRICEPS' : 'UPPER PUSH HEAVY',
                    subtitle: 'International Chest Day',
                    stats: '55 Mins • Hypertrophy',
                    reason: isVariationA 
                        ? "Memulai minggu dengan volume tinggi untuk dada dan tricep." 
                        : "Plan B: Fokus pada beban yang lebih berat (low reps) untuk kekuatan.",
                    type: 'workout',
                    exercises: isVariationA ? [
                        { name: 'Barbell Bench Press', sets: 4, reps: '8-10', weight: '60kg', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', weight: '20kg', img: 'https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Cable Flys', sets: 3, reps: '15', weight: '15kg', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop' }
                    ] : [
                        { name: 'Dumbbell Bench Press', sets: 4, reps: '6-8', weight: '24kg', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Overhead Press', sets: 3, reps: '8', weight: '40kg', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Tricep Dips', sets: 3, reps: 'Failure', weight: 'BW', img: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=400&auto=format&fit=crop' }
                    ]
                };
            case 1: // Tue
                return {
                    title: 'BACK & BICEPS',
                    subtitle: 'Pull Strength',
                    stats: '50 Mins • Strength',
                    reason: "Menyeimbangkan latihan dorong kemarin dengan latihan tarik.",
                    type: 'workout',
                    exercises: [
                        { name: 'Lat Pulldowns', sets: 4, reps: '10-12', weight: '45kg', img: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Barbell Rows', sets: 3, reps: '8-10', weight: '50kg', img: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Bicep Curls', sets: 3, reps: '12', weight: '12kg', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' }
                    ]
                };
            case 2: // Wed
                return {
                    title: 'LEG DAY DESTRUCTION',
                    subtitle: 'Quads & Hams',
                    stats: '60 Mins • High Volume',
                    reason: "Jangan skip leg day! Fokus pada squat untuk hormon pertumbuhan alami.",
                    type: 'workout',
                    exercises: [
                        { name: 'Barbell Squat', sets: 4, reps: '8', weight: '80kg', img: 'https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Leg Press', sets: 3, reps: '12', weight: '120kg', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Romanian Deadlift', sets: 3, reps: '10', weight: '70kg', img: 'https://images.unsplash.com/photo-1434608519344-49d77a699ded?q=80&w=400&auto=format&fit=crop' }
                    ]
                };
            default:
                 if (selectedDay === 6) { // Sun
                     return {
                        title: 'SUNDAY REST',
                        subtitle: 'Full Recovery',
                        stats: '0 Mins • Rest',
                        reason: "Recovery sangat penting untuk pertumbuhan otot. Tidur cukup hari ini.",
                        type: 'rest',
                        exercises: []
                    };
                 }
                 return {
                    title: 'SHOULDERS & ABS',
                    subtitle: 'Delts Definition',
                    stats: '45 Mins • Isolation',
                    reason: "Fokus isolasi bahu untuk postur tegap dan estetika V-taper.",
                    type: 'workout',
                    exercises: [
                        { name: 'Dumbbell Shoulder Press', sets: 4, reps: '10', weight: '18kg', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Lateral Raises', sets: 3, reps: '15', weight: '8kg', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop' },
                        { name: 'Cable Crunches', sets: 3, reps: '15', weight: '20kg', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop' }
                    ]
                };
        }
    }

    // Default Fallback (Home Workout)
    return {
        title: 'HOME DUMBBELL FULL BODY',
        subtitle: 'Compound Focus',
        stats: '40 Mins • General',
        reason: "Latihan seluruh tubuh menggunakan dumbbell di rumah untuk efisiensi waktu.",
        type: 'workout',
        exercises: [
            { name: 'Goblet Squats', sets: 3, reps: '12', weight: '10kg', img: 'https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=400&auto=format&fit=crop' },
            { name: 'Dumbbell Floor Press', sets: 3, reps: '12', weight: '10kg', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop' },
            { name: 'Dumbbell Rows', sets: 3, reps: '12', weight: '10kg', img: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=400&auto=format&fit=crop' }
        ]
    };
  };

  const currentPlan = getDailyPlan();
  const isRestDay = currentPlan.type === 'rest';

  // Available Challenges to Join
  const availableChallenges = [
      { id: 101, title: '30 Day Abs', level: 'Beginner', days: 30, colorFrom: 'from-purple-500', colorTo: 'to-indigo-600', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=200&auto=format&fit=crop' },
      { id: 102, title: 'HIIT Blaster', level: 'Advanced', days: 14, colorFrom: 'from-red-500', colorTo: 'to-pink-600', img: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=200&auto=format&fit=crop' },
      { id: 103, title: 'Yoga Flow', level: 'All Levels', days: 21, colorFrom: 'from-teal-400', colorTo: 'to-emerald-600', img: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=200&auto=format&fit=crop' },
  ];

  const categories = [
    { name: 'Chest', count: 12, color: 'bg-orange-600' },
    { name: 'Back', count: 10, color: 'bg-blue-600' },
    { name: 'Legs', count: 15, color: 'bg-green-600' },
    { name: 'Cardio', count: 8, color: 'bg-red-600' },
    { name: 'Abs', count: 6, color: 'bg-purple-600' },
    { name: 'Arms', count: 14, color: 'bg-yellow-600' },
  ];

  // Exercises Database
  const libraryExercises: Exercise[] = [
    // LEGS
    { 
      id: 'squat', name: 'Barbell Squat', subtitle: 'King of Leg Exercises', category: 'Legs', type: 'Video', difficulty: 'Hard', views: '25k', details: true,
      img: 'https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=400&auto=format&fit=crop',
      instructions: ['Letakkan bar di punggung atas.', 'Buka kaki selebar bahu.', 'Turunkan pinggul hingga paha sejajar lantai.', 'Dorong kembali ke posisi berdiri.']
    },
    { 
      id: 'lunge', name: 'Walking Lunge', subtitle: 'Unilateral Strength', category: 'Legs', type: 'Video', difficulty: 'Medium', views: '10k', details: true,
      img: 'https://images.unsplash.com/photo-1434608519344-49d77a699ded?q=80&w=400&auto=format&fit=crop',
      instructions: ['Langkah panjang ke depan.', 'Turunkan lutut belakang hampir menyentuh lantai.', 'Jaga punggung tetap tegak.', 'Langkah kaki belakang ke depan dan ulangi.']
    },
    // CHEST
    { 
      id: 'bench', name: 'Bench Press', subtitle: 'Upper Body Power', category: 'Chest', type: 'Video', difficulty: 'Hard', views: '50k', details: true,
      img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop',
      instructions: ['Berbaring di bangku datar.', 'Pegang bar sedikit lebih lebar dari bahu.', 'Turunkan bar ke dada tengah.', 'Dorong ke atas hingga tangan lurus.']
    },
    { 
      id: 'pushup', name: 'Push Up', subtitle: 'Bodyweight Classic', category: 'Chest', type: 'Video', difficulty: 'Easy', views: '100k', details: true,
      img: 'https://images.unsplash.com/photo-1598971639058-211a742890ea?q=80&w=400&auto=format&fit=crop',
      instructions: ['Mulai dalam posisi plank.', 'Turunkan dada hingga hampir menyentuh lantai.', 'Jaga tubuh tetap lurus.', 'Dorong kembali ke atas.']
    },
    // BACK
    { 
      id: 'pullup', name: 'Pull Up', subtitle: 'Back Width Builder', category: 'Back', type: 'Video', difficulty: 'Hard', views: '15k', details: true,
      img: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=400&auto=format&fit=crop',
      instructions: ['Gantung di bar dengan tangan lebih lebar dari bahu.', 'Tarik tubuh ke atas hingga dagu melewati bar.', 'Turunkan perlahan.', 'Hindari mengayunkan tubuh.']
    },
    { 
      id: 'row', name: 'Dumbbell Row', subtitle: 'Back Thickness', category: 'Back', type: 'Video', difficulty: 'Medium', views: '12k', details: true,
      img: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=400&auto=format&fit=crop',
      instructions: ['Letakkan satu lutut di bangku.', 'Pegang dumbbell dengan tangan bebas.', 'Tarik dumbbell ke arah pinggang.', 'Turunkan kembali dengan terkontrol.']
    },
    // CARDIO
    { 
      id: 'burpee', name: 'Burpees', subtitle: 'Full Body Burn', category: 'Cardio', type: 'Video', difficulty: 'Hard', views: '8k', details: true,
      img: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=400&auto=format&fit=crop',
      instructions: ['Mulai berdiri, lalu jongkok.', 'Tendang kaki ke belakang ke posisi pushup.', 'Lakukan pushup (opsional).', 'Lompat kembali ke posisi jongkok dan loncat ke atas.']
    },
    // ABS
    { 
      id: 'plank', name: 'Plank', subtitle: 'Core Stability', category: 'Abs', type: 'Video', difficulty: 'Easy', views: '60k', details: true,
      img: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?q=80&w=400&auto=format&fit=crop',
      instructions: ['Tumpu berat badan pada lengan bawah dan jari kaki.', 'Jaga tubuh lurus dari kepala hingga kaki.', 'Tahan posisi ini.', 'Jangan biarkan pinggul turun.']
    },
    // ARMS
    { 
      id: 'curl', name: 'Bicep Curl', subtitle: 'Arm Isolation', category: 'Arms', type: 'Video', difficulty: 'Easy', views: '40k', details: true,
      img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop',
      instructions: ['Berdiri tegak memegang dumbbell.', 'Tekuk siku untuk mengangkat beban ke arah bahu.', 'Jaga siku tetap di samping tubuh.', 'Turunkan perlahan.']
    }
  ];

  const filteredExercises = libraryExercises.filter(ex => {
      const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            ex.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
      return matchesSearch && matchesCategory;
  });

  // RENDER: EXERCISE DETAIL VIEW
  if (selectedExercise) {
      return (
        <div className="min-h-screen flex flex-col pt-safe pb-safe animate-in slide-in-from-bottom-10 duration-500 font-sans transition-colors relative">
            
            {/* 1. TOP VIDEO LOOP AREA */}
            <div className="relative h-[40vh] bg-[#111214]">
                <button 
                  onClick={() => setSelectedExercise(null)}
                  className="absolute top-6 left-6 z-20 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-black/60 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <img 
                   src={selectedExercise.img} 
                   alt="Video thumbnail" 
                   className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center group cursor-pointer">
                    <div className="w-16 h-16 bg-[#F97316]/90 rounded-full flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(249,115,22,0.4)] animate-pulse group-hover:scale-110 transition-transform">
                        <PlayCircle size={32} className="text-white fill-white" />
                    </div>
                </div>
                <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-[#F97316] text-white text-[10px] font-bold uppercase rounded">
                            {selectedExercise.category}
                        </span>
                        <span className="px-2 py-0.5 bg-gray-800 text-white text-[10px] font-bold uppercase rounded">
                            {selectedExercise.difficulty}
                        </span>
                    </div>
                    <h1 className="text-3xl font-black text-white italic uppercase tracking-tight">{selectedExercise.name}</h1>
                </div>
            </div>

            {/* 2. SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/95 dark:bg-[#0a0a0a]/90 backdrop-blur-xl">
                
                {/* --- FEATURE: AI FORM CHECK CARD --- */}
                <div className="bg-white dark:bg-[#1C1E24] rounded-2xl p-1 border border-[#F97316]/30 relative overflow-hidden group shadow-lg dark:shadow-none">
                    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-[#1C1E24] dark:to-[#111214] rounded-xl p-5 relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-[#F97316]/10 rounded-lg">
                                    <Camera size={20} className="text-[#F97316]" />
                                </div>
                                <div>
                                    <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-none">AI Form Check</h3>
                                    <p className="text-gray-500 text-xs">Koreksi postur real-time</p>
                                </div>
                            </div>
                        </div>

                        {/* Feedback Text */}
                        <div className="mb-4 bg-gray-50 dark:bg-[#111214] p-3 rounded-lg border-l-2 border-yellow-500 flex items-start gap-2">
                            <AlertCircle size={14} className="text-yellow-500 mt-0.5 shrink-0" />
                            <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                                <span className="text-gray-900 dark:text-white font-bold block mb-0.5">Fokus AI:</span>
                                "Pastikan punggung tetap lurus dan inti tubuh (core) terkunci."
                            </p>
                        </div>

                        <button className="w-full bg-[#F97316] hover:bg-[#E64A19] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                            <Camera size={18} />
                            Coba Gerakan (AI Camera)
                        </button>
                    </div>
                </div>

                {/* --- INSTRUCTIONS --- */}
                <div>
                    <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-3">Cara Melakukan</h3>
                    <div className="space-y-4 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[11px] top-2 bottom-4 w-0.5 bg-gray-200 dark:bg-white/10"></div>
                        
                        {selectedExercise.instructions?.map((step: string, idx: number) => (
                            <div key={idx} className="flex gap-4 relative">
                                <div className="w-6 h-6 rounded-full bg-white dark:bg-[#1C1E24] border border-[#F97316] flex items-center justify-center shrink-0 z-10">
                                    <span className="text-[10px] font-bold text-[#F97316]">{idx + 1}</span>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{step}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      );
  }

  // --- MAIN RENDER (SCHEDULE & LIBRARY LIST) ---
  return (
    <div className="min-h-screen p-6 pt-safe pb-32 animate-in fade-in space-y-6 font-sans transition-colors">
      
      {/* 1. TOP CONTROL BAR */}
      <div className="space-y-4 relative z-20">
          
          {/* Header Row: Equipment Selector */}
          <div className="flex justify-between items-center relative z-50">
              <button 
                onClick={() => setShowEquipmentMenu(!showEquipmentMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-white/70 dark:bg-[#1C1E24]/60 backdrop-blur-md rounded-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-[#252830] transition-colors group shadow-sm dark:shadow-none"
              >
                 <MapPin size={16} className="text-[#FF5722] group-hover:scale-110 transition-transform" />
                 <div className="text-left">
                    <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Location</p>
                    <p className="text-sm font-bold leading-none flex items-center gap-1">
                        {equipment} <ChevronDown size={12} className="text-gray-500" />
                    </p>
                 </div>
              </button>

              {/* Equipment Dropdown */}
              {showEquipmentMenu && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#1C1E24] rounded-xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-[60]">
                      {['Full Gym', 'Home Workout', 'Bodyweight'].map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                                setEquipment(item as Equipment);
                                setShowEquipmentMenu(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 flex items-center justify-between ${equipment === item ? 'text-[#FF5722]' : 'text-gray-900 dark:text-gray-300'}`}
                          >
                             {item}
                             {equipment === item && <Check size={14} />}
                          </button>
                      ))}
                  </div>
              )}
          </div>

          {/* Segmented Control (Tabs) */}
          <div className="bg-white/70 dark:bg-[#1C1E24]/60 backdrop-blur-md p-1 rounded-xl flex border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
              <button 
                onClick={() => setActiveTab('schedule')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                    activeTab === 'schedule' 
                    ? 'bg-[#FF5722] text-white shadow-md' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                 Schedule
              </button>
              <button 
                onClick={() => setActiveTab('library')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                    activeTab === 'library' 
                    ? 'bg-[#FF5722] text-white shadow-md' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                 Library
              </button>
          </div>
      </div>

      {/* ================= TAB 1: SCHEDULE CONTENT ================= */}
      {activeTab === 'schedule' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            
            {/* 2. WEEKLY NAVIGATOR */}
            <div className="grid grid-cols-7 gap-2">
                {weekDays.map((item, index) => {
                    const isSelected = index === selectedDay;
                    const isToday = index === (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
                    const isRest = index === 6; // Sunday fixed as visual rest for nav

                    return (
                    <button 
                        key={index}
                        onClick={() => setSelectedDay(index)}
                        className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all relative overflow-hidden group ${
                        isSelected 
                            ? 'bg-[#FF5722] border-[#FF5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.4)] transform scale-105 z-10' 
                            : 'bg-white/70 dark:bg-[#111214]/60 backdrop-blur-md border-gray-200 dark:border-white/5 text-gray-400 dark:text-gray-500 hover:border-[#FF5722]/50'
                        }`}
                    >
                        <span className={`text-[9px] font-bold uppercase mb-1 ${isSelected ? 'text-white/80' : ''}`}>
                            {item.day}
                        </span>
                        
                        {isRest ? (
                            <Moon size={16} className={isSelected ? 'text-white' : 'text-blue-500'} fill={isSelected ? "currentColor" : "none"} />
                        ) : (
                            <span className={`text-lg font-bold leading-none ${isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                {item.date}
                            </span>
                        )}

                        {isToday && !isSelected && (
                            <div className="absolute bottom-1 w-1 h-1 bg-[#FF5722] rounded-full"></div>
                        )}
                    </button>
                    );
                })}
            </div>

            {/* 3. TODAY'S TARGET */}
            <div className="w-full bg-white/80 dark:bg-[#1C1E24]/70 backdrop-blur-xl rounded-[2rem] border border-gray-200 dark:border-white/5 overflow-hidden relative shadow-xl dark:shadow-2xl transition-all duration-500 animate-in fade-in zoom-in-95">
                <div className="p-6 pb-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gradient-to-r from-white/50 to-gray-50/50 dark:from-[#1C1E24]/50 dark:to-[#1a1c22]/50">
                    <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${currentPlan.type === 'rest' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-[#FF5722]/10 border-[#FF5722]/20'}`}>
                             {currentPlan.type === 'rest' ? (
                                 <Coffee size={20} className="text-blue-500 dark:text-blue-400" />
                             ) : (
                                 <Dumbbell size={20} className="text-[#FF5722]" />
                             )}
                         </div>
                         <div>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white italic tracking-tight uppercase leading-none">
                                {currentPlan.title}
                            </h2>
                            <p className="text-gray-500 text-xs font-medium mt-1">{currentPlan.subtitle}</p>
                         </div>
                    </div>
                     <div className="text-right hidden sm:block">
                        <p className="text-gray-900 dark:text-white font-bold text-sm">{currentPlan.stats}</p>
                     </div>
                </div>

                {/* WHY PLAN ALERT */}
                {showWhyPlan && currentPlan.reason && (
                    <div className="px-6 pt-4 pb-0 animate-in slide-in-from-top-2">
                        <div className="bg-[#FF5722]/5 border border-[#FF5722]/20 rounded-xl p-3 flex gap-3">
                            <Info size={16} className="text-[#FF5722] shrink-0 mt-0.5" />
                            <p className="text-gray-600 dark:text-gray-300 text-xs font-medium leading-relaxed">
                                <span className="font-bold text-[#FF5722] mr-1">Why today:</span>
                                {currentPlan.reason}
                            </p>
                        </div>
                    </div>
                )}

                <div className="p-4 space-y-3">
                    {currentPlan.exercises.length > 0 ? (
                        currentPlan.exercises.map((ex, idx) => (
                            <div key={`${selectedDay}-${idx}-${planVariation}`} className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50/80 dark:bg-[#000000]/40 border border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-[#252830] transition-colors group cursor-pointer animate-in slide-in-from-bottom-2" style={{animationDelay: `${idx * 100}ms`}}>
                                <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-gray-900 overflow-hidden shrink-0 border border-gray-200 dark:border-white/10 group-hover:border-[#FF5722]/50 transition-colors relative">
                                    <img src={ex.img} alt={ex.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-gray-900 dark:text-white font-bold text-sm truncate group-hover:text-[#FF5722] transition-colors">{ex.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium bg-white dark:bg-white/5 px-2 py-0.5 rounded">
                                            {ex.sets} Sets
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                                            {ex.reps} Reps
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end justify-center">
                                    <div className="bg-[#FF5722]/10 border border-[#FF5722]/30 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm group-hover:bg-[#FF5722] group-hover:text-white transition-all">
                                        {ex.weight === 'BW' ? <BicepsFlexed size={10} className="text-[#FF5722] group-hover:text-white" /> : <Zap size={10} className="text-[#FF5722] group-hover:text-white" fill="currentColor" />}
                                        <span className="text-[#FF5722] group-hover:text-white text-[10px] font-bold uppercase tracking-wide">
                                            {ex.weight}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center flex flex-col items-center justify-center text-gray-500 h-40">
                           <Coffee size={32} className="text-blue-400 mb-2 opacity-80" />
                           <p className="font-medium">Active Recovery Day</p>
                           <p className="text-xs opacity-60">Light stretching or a walk is recommended.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ADDITION 2: ACTIVE CHALLENGES */}
            <div className="w-full">
                <div className="flex justify-between items-center mb-3 px-1">
                    <h3 className="text-gray-900 dark:text-white font-bold text-sm">Active Challenges</h3>
                    <button 
                       onClick={() => setShowAllChallenges(true)}
                       className="text-[#F97316] text-xs font-medium cursor-pointer hover:underline"
                    >
                        View All
                    </button>
                </div>
                
                {joinedChallenges.length > 0 ? (
                    <div className={`relative w-full bg-gradient-to-br ${joinedChallenges[0].colorFrom} ${joinedChallenges[0].colorTo} rounded-2xl p-5 overflow-hidden shadow-lg border border-white/10 group`}>
                        <div className="relative z-10 flex justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <div className="bg-black/20 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase flex items-center gap-1">
                                        <Flame size={10} fill="currentColor" className="animate-pulse" /> Trending
                                    </div>
                                </div>
                                <h4 className="text-white font-black text-lg italic tracking-tight leading-tight mb-1">{joinedChallenges[0].title}</h4>
                                <p className="text-white/90 text-xs font-medium mb-3">{joinedChallenges[0].subtitle}</p>
                                
                                {/* Progress Bar */}
                                <div className="w-full max-w-[200px]">
                                    <div className="flex justify-between text-white/90 text-[10px] font-bold mb-1">
                                        <span>Progress</span>
                                        <span>{joinedChallenges[0].progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                                        <div className="h-full bg-white rounded-full" style={{width: `${joinedChallenges[0].progress}%`}}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Toggle Action */}
                            <div className="flex flex-col items-center pt-1">
                                <button 
                                    className={`w-11 h-6 rounded-full p-1 transition-all duration-300 relative ${joinedChallenges[0].isActive ? 'bg-white shadow-md' : 'bg-black/30'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${joinedChallenges[0].isActive ? 'translate-x-5 bg-[#F97316]' : 'translate-x-0 bg-white/80'}`}></div>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-8 bg-white/70 dark:bg-[#1C1E24]/60 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/5">
                        <p className="text-gray-500 text-sm">No active challenges. Join one from the Library!</p>
                    </div>
                )}
            </div>

            <div className="pt-2 flex flex-col items-center gap-4">
                <button 
                  onClick={handleRegenerate}
                  disabled={isRegenerating || isRestDay}
                  className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl border border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722]/10 active:scale-95 transition-all shadow-sm group disabled:opacity-50 disabled:cursor-not-allowed bg-white/50 dark:bg-transparent"
                >
                    {isRegenerating ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                    )}
                    <span className="text-sm font-bold uppercase tracking-wide">
                        {isRegenerating ? 'Generating Plan...' : 'Regenerate Plan'}
                    </span>
                </button>
            </div>
        </div>
      )}

      {/* ================= TAB 2: LIBRARY CONTENT ================= */}
      {activeTab === 'library' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            
            {/* Search Bar with Submit Button */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-[#FF5722]" size={20} />
                <input 
                  type="text"
                  placeholder="Search exercise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/70 dark:bg-[#1C1E24]/60 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-14 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5722] transition-colors shadow-lg dark:shadow-none"
                />
                <button 
                   className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#FF5722] hover:bg-[#FF5722]/10 rounded-lg transition-colors"
                >
                   <Send size={18} />
                </button>
            </div>

            {/* NEW: Available Challenges Section */}
            <div>
               <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-3 px-1">Join a Challenge</h3>
               <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                  {availableChallenges.map((challenge) => (
                      <div key={challenge.id} className="min-w-[240px] bg-white/70 dark:bg-[#1C1E24]/60 backdrop-blur-md rounded-2xl p-4 border border-gray-200 dark:border-white/5 relative overflow-hidden group">
                          {/* Background Gradient */}
                          <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${challenge.colorFrom} ${challenge.colorTo}`}></div>
                          
                          <div className="flex justify-between items-start mb-2">
                             <div>
                                <h4 className="text-gray-900 dark:text-white font-bold text-sm">{challenge.title}</h4>
                                <p className="text-xs text-gray-500">{challenge.days} Days • {challenge.level}</p>
                             </div>
                             <Trophy size={16} className="text-yellow-500" />
                          </div>
                          <button 
                             onClick={() => handleJoinChallenge(challenge)}
                             className="w-full mt-3 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-[#FF5722] hover:text-white text-xs font-bold transition-colors"
                          >
                             Join Challenge
                          </button>
                      </div>
                  ))}
               </div>
            </div>

            {/* Categories Grid */}
            <div>
                <div className="flex justify-between items-center mb-3 px-1">
                    <h3 className="text-gray-900 dark:text-white font-bold text-sm">Categories</h3>
                    <button 
                       onClick={() => setSelectedCategory('All')}
                       className="text-[#FF5722] text-xs font-medium cursor-pointer hover:underline"
                    >
                        See All
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {categories.map((cat, idx) => {
                        const isActive = selectedCategory === cat.name;
                        return (
                            <button 
                                key={idx} 
                                onClick={() => setSelectedCategory(isActive ? 'All' : cat.name)}
                                className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 aspect-square group relative overflow-hidden ${
                                    isActive 
                                    ? 'bg-[#FF5722]/10 border-[#FF5722] shadow-[0_0_15px_rgba(255,87,34,0.3)]' 
                                    : 'bg-white/70 dark:bg-[#1C1E24]/60 backdrop-blur-md border-gray-200 dark:border-white/5 hover:border-[#FF5722]/30 hover:bg-gray-50 dark:hover:bg-[#252830]'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform ${isActive ? 'bg-[#FF5722] scale-110' : cat.color + ' group-hover:scale-110'}`}>
                                    <LayoutGrid size={18} className="text-white" />
                                </div>
                                <div className="text-center relative z-10">
                                    <span className={`block font-bold text-xs transition-colors ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 group-hover:text-[#FF5722]'}`}>
                                        {cat.name}
                                    </span>
                                    <span className={`text-[9px] ${isActive ? 'text-[#FF5722]' : 'text-gray-400 dark:text-gray-500'}`}>{cat.count}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Trending / Popular (Filtered List) */}
            <div>
                 <div className="flex justify-between items-center mb-3 px-1">
                    <h3 className="text-gray-900 dark:text-white font-bold text-sm">
                        {selectedCategory === 'All' && !searchQuery ? 'Exercise Library' : `Results for "${searchQuery || selectedCategory}"`}
                    </h3>
                    <span className="text-gray-500 text-xs">
                        {filteredExercises.length} Found
                    </span>
                </div>
                
                <div className="space-y-3">
                    {filteredExercises.length > 0 ? (
                        filteredExercises.map((ex, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => {
                                  if (ex.details) setSelectedExercise(ex);
                              }}
                              className="flex items-center gap-4 bg-white/70 dark:bg-[#1C1E24]/60 backdrop-blur-md p-3 rounded-2xl border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-[#252830] transition-colors cursor-pointer group animate-in slide-in-from-bottom-2 shadow-sm dark:shadow-none"
                            >
                                 {/* Thumbnail with Overlay */}
                                 <div className="w-20 h-20 rounded-xl bg-gray-200 dark:bg-gray-900 overflow-hidden shrink-0 relative border border-gray-200 dark:border-white/5">
                                    <img src={ex.img} alt={ex.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <PlayCircle size={24} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
                                    </div>
                                 </div>
                                 
                                 {/* Content */}
                                 <div className="flex-1 min-w-0">
                                    <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-0.5 group-hover:text-[#FF5722] transition-colors truncate">{ex.name}</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">{ex.subtitle}</p>
                                    
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-[#FF5722]/10 border border-[#FF5722]/20 rounded text-[9px] text-[#FF5722] font-bold uppercase">{ex.category}</span>
                                        <span className="text-[9px] text-gray-400 dark:text-gray-500 font-medium flex items-center gap-1">
                                            • {ex.views} views
                                        </span>
                                    </div>
                                 </div>
                                 
                                 {/* Action */}
                                 <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                     <Heart size={18} />
                                 </button>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center opacity-50">
                            <Search size={48} className="text-gray-400 mb-4" />
                            <p className="text-gray-500 font-medium">No exercises found</p>
                            <p className="text-gray-400 text-xs mt-1">Try a different search term or category</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
      )}

      {/* ================= MODAL: VIEW ALL CHALLENGES ================= */}
      {showAllChallenges && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAllChallenges(false)}></div>
            <div className="bg-white dark:bg-[#1C1E24] w-full max-w-md h-[80vh] sm:h-auto sm:rounded-3xl rounded-t-3xl border border-gray-200 dark:border-white/10 relative z-10 flex flex-col animate-in slide-in-from-bottom duration-300">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Challenges</h2>
                    <button onClick={() => setShowAllChallenges(false)} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {joinedChallenges.map((challenge) => (
                        <div key={challenge.id} className="relative w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-5 overflow-hidden border border-white/10 group">
                            <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b ${challenge.colorFrom} ${challenge.colorTo}`}></div>
                            
                            <div className="relative z-10 flex justify-between gap-4">
                                <div className="flex-1">
                                    <h4 className="text-white font-bold text-base mb-1">{challenge.title}</h4>
                                    <p className="text-gray-400 text-xs font-medium mb-3">{challenge.subtitle}</p>
                                    
                                    {/* Progress Bar */}
                                    <div className="w-full">
                                        <div className="flex justify-between text-gray-400 text-[10px] font-bold mb-1">
                                            <span>Progress</span>
                                            <span>{challenge.progress}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                                            <div className="h-full bg-white rounded-full" style={{width: `${challenge.progress}%`}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {joinedChallenges.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No challenges joined yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Program;