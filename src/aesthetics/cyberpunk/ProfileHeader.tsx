'use client';

export const ProfileHeader = () => (
  <div className="relative h-64 bg-gradient-to-b from-[#0F0F1A] to-[#1A1A2E] border-b border-[#00F5D4]/20 flex items-end p-8">
    <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,212,0.3) 2px, rgba(0,245,212,0.3) 4px)' }} />
    <div className="flex items-center gap-6 relative z-10">
      <div className="w-20 h-20 rounded border-2 border-[#00F5D4] bg-[#1A1A2E] flex items-center justify-center">
        <span className="text-[#00F5D4] font-mono font-bold text-2xl">&#62;_</span>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-[#E0E0FF] font-mono">User_Profile</h2>
        <p className="text-xs text-[#00F5D4] font-mono tracking-widest">STATUS: ONLINE</p>
      </div>
    </div>
  </div>
);
