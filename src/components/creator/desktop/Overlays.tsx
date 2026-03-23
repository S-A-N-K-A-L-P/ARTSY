import { useAesthetic } from '@/aesthetics/AestheticProvider';
import { ThemeName, themes } from '@/lib/theme/themes';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

// 24. AestheticSettingsModalDesktop
export const AestheticSettingsModalDesktop = () => {
  const { aesthetic, setAesthetic } = useAesthetic();
  
  return (
   <div className="p-10 rounded-[48px] bg-white/5 border border-white/5 flex flex-col gap-8">
      <div className="flex justify-between items-center">
         <h3 className="text-xl font-bold tracking-tighter italic">Global Visual Policy</h3>
         <span className="text-[10px] font-bold uppercase tracking-widest opacity-20">Currently Active: {aesthetic}</span>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
         {(Object.keys(themes) as ThemeName[]).map(t => (
            <button 
               key={t}
               onClick={() => setAesthetic(t)}
               className={cn(
                  "h-12 rounded-2xl border text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                  aesthetic === t ? "bg-white text-black border-white" : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
               )}
            >
               {t}
               {aesthetic === t && <Check size={10} />}
            </button>
         ))}
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
         {['Override Default Fonts', 'Enable Grain FX', 'Force Dark Perspective'].map(p => (
            <div key={p} className="flex justify-between items-center">
               <span className="text-xs font-bold opacity-40">{p}</span>
               <div className="w-10 h-5 rounded-full bg-white/10 p-1 flex justify-end"><div className="w-3 h-3 rounded-full bg-white" /></div>
            </div>
         ))}
      </div>
   </div>
  );
};

// 15. PageCustomizerSidebar
export const PageCustomizerSidebar = ({ page, onUpdate }: any) => (
  <div className="w-96 space-y-12 p-10 bg-white/5 border-l border-white/5 h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto no-scrollbar">
     <h3 className="text-xl font-bold tracking-tighter italic">Customize Space</h3>
     <div className="space-y-6">
        <label className="text-[10px] font-bold uppercase tracking-widest opacity-20">Typography Style</label>
        <div className="grid grid-cols-2 gap-2">
           {['Serif', 'Mono', 'Sans', 'Display'].map(f => (
              <button key={f} className="h-12 rounded-xl bg-white/5 border border-white/5 text-xs font-bold hover:border-white/20 transition-all">{f}</button>
           ))}
        </div>
     </div>
     <div className="space-y-6">
        <label className="text-[10px] font-bold uppercase tracking-widest opacity-20">Container Radius</label>
        <input type="range" className="w-full accent-white opacity-20 hover:opacity-100 transition-all" />
     </div>
  </div>
);

// 9. BulkActionToolbar
export const BulkActionToolbar = () => (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-center gap-8 z-[100]">
       <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest pr-8 border-r border-white/10">
          <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">3</span> Selected
       </div>
       <div className="flex items-center gap-6">
          {['Duplicate', 'Hide', 'Export', 'Delete'].map(a => (
             <button key={a} className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">{a}</button>
          ))}
       </div>
    </div>
 );
