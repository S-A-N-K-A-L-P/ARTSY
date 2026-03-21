'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Sparkles,
  Zap,
  Moon,
  Sun,
  Palette,
  Layers,
  Code
} from 'lucide-react';

const steps = [
  {
    title: "What brings you here?",
    id: "intent",
    options: [
      { id: "explore", label: "Explore", description: "Discover inspiration and products" },
      { id: "create", label: "Create", description: "Build and showcase your work" },
      { id: "both", label: "Both", description: "The best of both worlds" }
    ]
  },
  {
    title: "Aesthetic Preferences",
    id: "aesthetics",
    multi: true,
    options: [
      { id: "minimal", label: "Minimal", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=200&auto=format&fit=crop" },
      { id: "cyberpunk", label: "Dark / Cyberpunk", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=200&auto=format&fit=crop" },
      { id: "vintage", label: "Vintage", image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=200&auto=format&fit=crop" },
      { id: "luxury", label: "Luxury", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=200&auto=format&fit=crop" },
      { id: "street", label: "Street / GenZ", image: "https://images.unsplash.com/photo-1534433502710-5728aa2a1786?q=80&w=200&auto=format&fit=crop" },
      { id: "futuristic", label: "Futuristic", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    title: "Your Interests",
    id: "interests",
    multi: true,
    options: [
      { id: "digital_art", label: "Digital Art" },
      { id: "uiux", label: "UI/UX" },
      { id: "fashion", label: "Fashion" },
      { id: "music", label: "Music" },
      { id: "photography", label: "Photography" },
      { id: "coding", label: "Coding" },
      { id: "web3", label: "NFTs / Web3" },
      { id: "architecture", label: "Architecture" }
    ]
  },
  {
    title: "Product Liking",
    id: "products",
    multi: true,
    options: [
      { id: "posters", label: "Posters" },
      { id: "websites", label: "Websites" },
      { id: "apps", label: "Apps" },
      { id: "physical", label: "Physical Products" },
      { id: "clothing", label: "Clothing" },
      { id: "installations", label: "Installations" }
    ]
  },
  {
    title: "How do you express yourself?",
    id: "creatorType",
    options: [
      { id: "designer", label: "Designer" },
      { id: "developer", label: "Developer" },
      { id: "artist", label: "Artist" },
      { id: "content_creator", label: "Content Creator" },
      { id: "exploring", label: "Just Exploring" }
    ]
  },
  {
    title: "Pick your vibe",
    id: "vibe",
    options: [
      { id: "bold", label: "🔥 Bold", color: "from-orange-500 to-red-600" },
      { id: "calm", label: "🌊 Calm", color: "from-blue-400 to-cyan-500" },
      { id: "energetic", label: "⚡ Energetic", color: "from-yellow-400 to-orange-500" },
      { id: "mysterious", label: "🌙 Mysterious", color: "from-purple-600 to-indigo-800" },
      { id: "minimal_vibe", label: "🎯 Minimal", color: "from-gray-400 to-gray-600" }
    ]
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    intent: '',
    aesthetics: [],
    interests: [],
    products: [],
    creatorType: '',
    vibe: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSelect = (id: string, value: string, isMulti?: boolean) => {
    if (isMulti) {
      const currentValues = formData[id] as string[];
      if (currentValues.includes(value)) {
        setFormData({ ...formData, [id]: currentValues.filter(v => v !== value) });
      } else {
        setFormData({ ...formData, [id]: [...currentValues, value] });
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const next = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      try {
        const res = await fetch('/api/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          router.push('/dashboard');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      {/* Progress Bar */}
      <div className="h-1 bg-white/5 w-full fixed top-0 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            <div className="mb-12 text-center">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-widest block mb-2">Step {currentStep + 1} of {steps.length}</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{currentStepData.title}</h1>
            </div>

            <div className={`grid gap-4 ${
              currentStep === 1 ? 'grid-cols-2 md:grid-cols-3' : 
              currentStep === 2 || currentStep === 3 ? 'grid-cols-2 md:grid-cols-4' : 
              'grid-cols-1 md:grid-cols-3'
            }`}>
              {currentStepData.options.map((option: any) => {
                const isSelected = currentStepData.multi 
                  ? (formData[currentStepData.id] as string[]).includes(option.id)
                  : formData[currentStepData.id] === option.id;

                return (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(currentStepData.id, option.id, currentStepData.multi)}
                    className={`cursor-pointer group relative overflow-hidden p-6 rounded-3xl border transition-all duration-300 ${
                      isSelected 
                        ? 'bg-white/10 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                    }`}
                  >
                    {currentStep === 1 && option.image && (
                      <div className="absolute inset-0 opacity-20 grayscale group-hover:grayscale-0 transition-all">
                        <img src={option.image} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      </div>
                    )}

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                          isSelected ? 'bg-white text-black' : 'bg-white/5 text-gray-400'
                        }`}>
                          {option.id === 'explore' && <Sun size={20} />}
                          {option.id === 'create' && <Zap size={20} />}
                          {option.id === 'both' && <Sparkles size={20} />}
                          {currentStep === 2 && <Palette size={20} />}
                          {currentStep === 3 && <Layers size={20} />}
                          {currentStep === 4 && <Code size={20} />}
                          {currentStep === 5 && <Check size={16} />}
                        </div>
                        {isSelected && (
                          <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            className="bg-green-500 w-5 h-5 rounded-full flex items-center justify-center"
                          >
                            <Check size={12} className="text-white" />
                          </motion.div>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg">{option.label}</h3>
                      {option.description && <p className="text-sm text-gray-400 mt-1">{option.description}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="p-8 flex items-center justify-center gap-4 fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent">
        <button 
          onClick={back}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 transition-all ${
            currentStep === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/5'
          }`}
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <button 
          onClick={next}
          disabled={!formData[currentStepData.id] || (currentStepData.multi && (formData[currentStepData.id] as string[]).length === 0)}
          className="flex items-center gap-2 px-10 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : currentStep === steps.length - 1 ? "Complete Profile" : "Continue"}
          {!loading && <ChevronRight size={20} />}
        </button>
      </footer>
    </div>
  );
}
