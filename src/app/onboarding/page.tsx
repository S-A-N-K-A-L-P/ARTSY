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
    title: "Artistic Interests",
    id: "interests",
    multi: true,
    options: [
      { id: "digital", label: "Digital Art", description: "CGI, AI, and generative pieces" },
      { id: "physical", label: "Physical Fine Art", description: "Sculptures and paintings" },
      { id: "ux", label: "UX & Products", description: "Industrial and interface design" },
      { id: "fashion", label: "High Fashion", description: "Couture and street style" }
    ]
  },
  {
    title: "Pick your Aesthetic",
    id: "aesthetics",
    multi: true,
    options: [
      { id: "minimal", label: "Zen Minimal", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=200&auto=format&fit=crop" },
      { id: "brutalist", label: "Brutalist Raw", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=200&auto=format&fit=crop" },
      { id: "vaporwave", label: "Vaporwave Retro", image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=200&auto=format&fit=crop" },
      { id: "solar", label: "Solarpunk Future", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    title: "The Palette",
    id: "palette",
    options: [
      { id: "mono", label: "Monochrome Gray", color: "from-gray-800 to-black" },
      { id: "earth", label: "Earth & Wood", color: "from-amber-800 to-amber-950" },
      { id: "neon", label: "Cyber Neon", color: "from-fuchsia-600 to-purple-800" },
      { id: "pastel", label: "Dreamy Pastel", color: "from-pink-100 to-blue-100" }
    ]
  },
  {
    title: "Investment Budget",
    id: "budget",
    options: [
      { id: "entry", label: "Entry Level", description: "Under $500" },
      { id: "mid", label: "Mid Range", description: "$500 - $5,000" },
      { id: "collector", label: "High Collector", description: "$5,000 - $50,000" },
      { id: "ultimate", label: "Gallery Tier", description: "$50,000+" }
    ]
  },
  {
    title: "Product Medium",
    id: "productType",
    multi: true,
    options: [
      { id: "prints", label: "Limited Prints" },
      { id: "originals", label: "Original Works" },
      { id: "digital_assets", label: "Digital Ownership" },
      { id: "objects", label: "Sculptural Objects" }
    ]
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    interests: [],
    aesthetics: [],
    palette: [],
    budget: '',
    productType: []
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
            <div className="mb-16 text-center">
              <span className="text-xs font-bold text-white/20 uppercase tracking-[0.3em] block mb-4">Phase {currentStep + 1} of {steps.length}</span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">{currentStepData.title}</h1>
            </div>

            <div className={`grid gap-4 ${
              currentStep === 1 ? 'grid-cols-2' : 
              currentStep === 2 ? 'grid-cols-2 md:grid-cols-4' : 
              'grid-cols-1 md:grid-cols-2'
            }`}>
              {currentStepData.options.map((option: any) => {
                const isSelected = currentStepData.multi 
                  ? (formData[currentStepData.id] as string[]).includes(option.id)
                  : formData[currentStepData.id] === option.id;

                return (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleSelect(currentStepData.id, option.id, currentStepData.multi)}
                    className={`cursor-pointer group relative overflow-hidden p-6 rounded-[32px] border transition-all duration-500 ${
                      isSelected 
                        ? 'bg-white/10 border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.3)]' 
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                    }`}
                  >
                    {/* Background Visual for Aesthetics */}
                    {currentStep === 1 && option.image && (
                      <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img src={option.image} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                      </div>
                    )}

                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-6">
                        {/* Icon or Color Circle */}
                        {currentStep === 2 ? (
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br shadow-lg ${option.color}`} />
                        ) : (
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                            isSelected ? 'bg-white text-black' : 'bg-white/5 text-white/40'
                          }`}>
                            {currentStep === 0 && (
                              <>
                                {option.id === 'digital' && <Sparkles size={22} />}
                                {option.id === 'physical' && <Palette size={22} />}
                                {option.id === 'ux' && <Zap size={22} />}
                                {option.id === 'fashion' && <Layers size={22} />}
                              </>
                            )}
                            {currentStep === 1 && <Sun size={22} />}
                            {currentStep === 3 && <Moon size={22} />}
                            {currentStep === 4 && <Check size={22} />}
                          </div>
                        )}

                        {isSelected && (
                          <motion.div 
                            initial={{ scale: 0, rotate: -45 }} 
                            animate={{ scale: 1, rotate: 0 }}
                            className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center shadow-xl"
                          >
                            <Check size={14} strokeWidth={3} />
                          </motion.div>
                        )}
                      </div>

                      <h3 className="font-bold text-xl tracking-tight mb-1">{option.label}</h3>
                      {option.description && (
                        <p className="text-white/40 text-sm font-medium leading-relaxed">{option.description}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="p-10 flex items-center justify-center gap-6 fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent backdrop-blur-sm">
        <button 
          onClick={back}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 pr-8 pl-6 py-4 rounded-2xl border border-white/5 font-bold text-sm tracking-wide transition-all ${
            currentStep === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/5'
          }`}
        >
          <ChevronLeft size={18} />
          Back
        </button>
        <button 
          onClick={next}
          disabled={!formData[currentStepData.id] || (currentStepData.multi && (formData[currentStepData.id] as string[]).length === 0)}
          className="flex items-center gap-3 px-12 py-4 rounded-2xl bg-white text-black font-bold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all disabled:opacity-30"
        >
          {loading ? "Initializing..." : currentStep === steps.length - 1 ? "Enter Workspace" : "Continue"}
          {!loading && <ChevronRight size={18} />}
        </button>
      </footer>
    </div>
  );
}
