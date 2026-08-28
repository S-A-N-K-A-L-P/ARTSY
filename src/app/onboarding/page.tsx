'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronLeft, ChevronRight, Layers, Palette, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Stack, Alert } from '@/components/ui';

interface Option {
  id: string;
  label: string;
  description?: string;
  image?: string;
  swatch?: string;
}

interface Step {
  id: string;
  title: string;
  description: string;
  multi?: boolean;
  options: Option[];
}

/**
 * Aesthetic ids must match the keys in lib/theme/palettes.json. This step used
 * to offer "solar" (Solarpunk), which is not a theme the app has — picking it
 * silently produced no aesthetic at all.
 */
const STEPS: Step[] = [
  {
    id: 'interests',
    title: 'What do you make?',
    description: 'Pick as many as apply. This shapes what you see first.',
    multi: true,
    options: [
      { id: 'digital', label: 'Digital art', description: 'CGI, generative, AI-assisted' },
      { id: 'physical', label: 'Physical work', description: 'Sculpture, painting, ceramics' },
      { id: 'ux', label: 'Product & UX', description: 'Industrial and interface design' },
      { id: 'fashion', label: 'Fashion', description: 'Couture, streetwear, textiles' },
    ],
  },
  {
    id: 'aesthetics',
    title: 'Pick your aesthetic',
    description: 'This becomes the look of your storefront. You can change it later.',
    multi: true,
    options: [
      { id: 'minimal', label: 'Minimal', description: 'Quiet, white, precise' },
      { id: 'noir', label: 'Noir', description: 'Black, gold, serif' },
      { id: 'brutalist', label: 'Brutalist', description: 'Raw, square, high contrast' },
      { id: 'vaporwave', label: 'Vaporwave', description: 'Neon, retro, saturated' },
      { id: 'cyberpunk', label: 'Cyberpunk', description: 'Dark, teal, monospace' },
      { id: 'luxury', label: 'Luxury', description: 'Warm, gold, editorial' },
    ],
  },
  {
    id: 'palette',
    title: 'Your palette',
    description: 'The colour family your work sits in.',
    options: [
      { id: 'mono', label: 'Monochrome', swatch: 'linear-gradient(135deg,#3f3f46,#09090b)' },
      { id: 'earth', label: 'Earth & wood', swatch: 'linear-gradient(135deg,#b45309,#451a03)' },
      { id: 'neon', label: 'Neon', swatch: 'linear-gradient(135deg,#c026d3,#6b21a8)' },
      { id: 'pastel', label: 'Pastel', swatch: 'linear-gradient(135deg,#fbcfe8,#bfdbfe)' },
    ],
  },
  {
    id: 'productType',
    title: 'What will you sell?',
    description: 'Pick as many as apply.',
    multi: true,
    options: [
      { id: 'prints', label: 'Limited prints' },
      { id: 'originals', label: 'Original works' },
      { id: 'digital_assets', label: 'Digital goods' },
      { id: 'objects', label: 'Objects & sculpture' },
    ],
  },
];

const ICONS: Record<string, React.ReactNode> = {
  digital: <Sparkles size={18} />,
  physical: <Palette size={18} />,
  ux: <Zap size={18} />,
  fashion: <Layers size={18} />,
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, string | string[]>>({
    interests: [],
    aesthetics: [],
    palette: '',
    productType: [],
  });

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  const answered = useMemo(() => {
    const v = data[current.id];
    return Array.isArray(v) ? v.length > 0 : Boolean(v);
  }, [data, current.id]);

  const toggle = (optionId: string) => {
    setError(null);
    setData((d) => {
      if (!current.multi) return { ...d, [current.id]: optionId };
      const list = (d[current.id] as string[]) ?? [];
      return {
        ...d,
        [current.id]: list.includes(optionId)
          ? list.filter((v) => v !== optionId)
          : [...list, optionId],
      };
    });
  };

  const next = async () => {
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Could not save your answers');
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setSaving(false);
    }
  };

  return (
    // Themed, not a hardcoded #050505 slab: this runs after sign-up, so the
    // user already has an aesthetic and the screen should honour it.
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <div className="h-1 w-full bg-elevated fixed top-0 z-50">
        <div
          className="h-full bg-accent transition-[width] duration-500"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-label="Onboarding progress"
        />
      </div>

      <main className="flex-1 w-full max-w-3xl mx-auto px-5 pt-20 pb-40">
        <Stack gap="lg">
          <div>
            <p className="text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted">
              Step {step + 1} of {STEPS.length}
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-black tracking-tighter text-text">
              {current.title}
            </h1>
            <p className="mt-2 text-sm text-text-secondary">{current.description}</p>
          </div>

          {error && <Alert tone="error">{error}</Alert>}

          <div
            className={cn(
              'grid gap-3',
              current.id === 'aesthetics' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
            )}
          >
            {current.options.map((opt) => {
              const value = data[current.id];
              const selected = Array.isArray(value) ? value.includes(opt.id) : value === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggle(opt.id)}
                  aria-pressed={selected}
                  className={cn(
                    'text-left p-5 rounded-[var(--radius-lg)] border transition-colors',
                    'active:scale-[0.99]',
                    selected
                      ? 'border-accent bg-accent-soft'
                      : 'border-line bg-card hover:border-line-strong'
                  )}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    {opt.swatch ? (
                      <span
                        className="w-10 h-10 rounded-full shrink-0"
                        style={{ backgroundImage: opt.swatch }}
                      />
                    ) : (
                      <span
                        className={cn(
                          'w-10 h-10 rounded-[var(--radius-sm)] shrink-0 flex items-center justify-center',
                          selected ? 'bg-accent text-on-accent' : 'bg-elevated text-text-muted'
                        )}
                      >
                        {ICONS[opt.id] ?? <Sparkles size={18} />}
                      </span>
                    )}

                    {selected && (
                      <span className="w-6 h-6 rounded-full bg-accent text-on-accent flex items-center justify-center shrink-0">
                        <Check size={13} strokeWidth={3} />
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-text">{opt.label}</p>
                  {opt.description && (
                    <p className="mt-1 text-[var(--text-caption)] text-text-secondary leading-relaxed">
                      {opt.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </Stack>
      </main>

      <footer className="fixed bottom-0 inset-x-0 border-t border-line bg-card/95 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            iconLeft={<ChevronLeft size={16} />}
          >
            Back
          </Button>

          <Button
            onClick={next}
            disabled={!answered}
            loading={saving}
            size="lg"
            iconRight={!isLast ? <ChevronRight size={16} /> : undefined}
          >
            {isLast ? 'Enter workspace' : 'Continue'}
          </Button>
        </div>
      </footer>
    </div>
  );
}
