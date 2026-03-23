'use client';

import React from 'react';

// 25. StorefrontFooterDesktop
export const StorefrontFooterDesktop = () => (
    <footer className="px-20 py-20 border-t border-white/5 grid grid-cols-4 gap-20">
       <div className="col-span-2 space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter italic">Artsy Creator</h2>
          <p className="text-white/20 text-sm leading-relaxed max-w-md font-medium">The world's first high-depth aesthetic commerce protocol. Curate, host, and trade digital and physical assets in specialized visual spaces.</p>
       </div>
       <div className="space-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-20">Network</h4>
          <div className="space-y-2 text-sm font-bold opacity-40">
             <p>Explore</p><p>Connect</p><p>Govern</p>
          </div>
       </div>
       <div className="space-y-6 text-right">
          <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-20">© 2026 Artsy</h4>
          <p className="text-[10px] opacity-10 uppercase tracking-widest leading-loose">Visual Integrity Guaranteed<br/>SSL SECURE ENDPOINT</p>
       </div>
    </footer>
 );
