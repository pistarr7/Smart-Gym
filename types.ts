export interface UserProfile {
  name: string;
  age: string;
  gender: 'male' | 'female';
  height: string;
  weight: string;
  goal: 'muscle' | 'weight_loss' | 'endurance' | 'general';
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface WorkoutSession {
  id: string;
  name: string;
  duration: number; // minutes
  calories: number;
  date: string;
  score: number;
}

export interface Exercise {
  id: string;
  name: string;
  reps: number;
  sets: number;
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export type AppView = 'splash' | 'welcome' | 'walkthrough' | 'auth' | 'assessment' | 'dashboard' | 'camera-setup' | 'workout-live' | 'workout-manual' | 'analytics' | 'profile' | 'program' | 'subscription';