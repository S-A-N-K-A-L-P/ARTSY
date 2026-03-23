'use client';

export const ProfileHeader = () => (
  <div className="relative h-64 bg-gradient-to-b from-[#1E1E1E] to-[#121212] border-b border-[#2A2A2A] flex items-end p-8">
    <div className="flex items-center gap-6">
      <div className="w-20 h-20 rounded-lg bg-[#2A2A2A] border border-[#4A5D4E] flex items-center justify-center">
        <span className="text-[#4A5D4E] font-mono font-bold text-xl">GR</span>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-[#D1D1D1] font-mono">Your Profile</h2>
        <p className="text-xs text-[#4A5D4E] font-mono">Raw & Authentic</p>
      </div>
    </div>
  </div>
);
