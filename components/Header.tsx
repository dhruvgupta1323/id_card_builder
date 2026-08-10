import React from 'react';
import { Palmtree, Flame, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-goa-dark/85 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-goa-accent via-goa-orange to-goa-yellow p-[2px] shadow-lg shadow-goa-accent/20 shrink-0">
            <div className="w-full h-full bg-goa-card rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
              <Palmtree className="w-5 h-5 sm:w-6 sm:h-6 text-goa-yellow animate-bounce" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-xl font-black tracking-wider text-white">
                HACKER <span className="text-goa-accent font-extrabold">गोवा</span> HOUSE
              </h1>
              <span className="bg-goa-accent/20 text-goa-accent text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full border border-goa-accent/40">
                2026
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400 font-medium truncate max-w-[200px] sm:max-w-none">
              Official Builder ID Generator • #FrameInGoa
            </p>
          </div>
        </div>

        {/* Feature Badges - Hidden on tiny screens, visible on sm+ */}
        <div className="hidden sm:flex items-center gap-2.5 text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            Scannable QR
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-goa-yellow">
            <Flame className="w-4 h-4" />
            Instant PNG Export
          </div>
        </div>
      </div>
    </header>
  );
};
