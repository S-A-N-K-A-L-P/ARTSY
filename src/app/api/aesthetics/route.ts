import { NextResponse } from 'next/server';

export async function GET() {
  const aesthetics = [
    { id: 'noir', name: 'Noir', description: 'Dark, cinematic, sophisticated.' },
    { id: 'minimal', name: 'Minimal', description: 'Clean, simple, airy.' },
    { id: 'vaporwave', name: 'Vaporwave', description: 'Neon, retro-futuristic synthwave.' },
    { id: 'brutalist', name: 'Brutalist', description: 'Raw, unpolished, bold.' },
    { id: 'grunge', name: 'Grunge', description: 'Textured, distorted, alternative.' },
    { id: 'cyberpunk', name: 'Cyberpunk', description: 'High tech, low life, neon trails.' }
  ];

  return NextResponse.json(aesthetics);
}