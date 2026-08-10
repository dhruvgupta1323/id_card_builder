import React from 'react';
import { Sparkles, Dices, User, Briefcase, Tag, Compass, Palette, Ticket, Luggage } from 'lucide-react';
import { BuilderProfile, CardThemeId, AVAILABLE_BEACH_BAG_ITEMS, BeachBagItem } from '@/types/builder';
import { CARD_THEMES } from '@/lib/cardThemes';
import { generateRandomTitle, generateRandomMotto, generateTicketId } from '@/lib/titleGenerator';

interface DetailsFormProps {
  profile: BuilderProfile;
  onChange: (updated: Partial<BuilderProfile>) => void;
}

export const DetailsForm: React.FC<DetailsFormProps> = ({ profile, onChange }) => {
  const handleGenerateTitle = () => {
    const newTitle = generateRandomTitle(profile.role);
    onChange({ builderTitle: newTitle });
  };

  const handleGenerateMotto = () => {
    const newMotto = generateRandomMotto();
    onChange({ motto: newMotto });
  };

  const handleNewTicketId = () => {
    onChange({ ticketId: generateTicketId() });
  };

  const toggleBeachBagItem = (item: BeachBagItem) => {
    const current = profile.beachBag || [];
    const exists = current.some((i) => i.label === item.label);

    let updated: BeachBagItem[];
    if (exists) {
      if (current.length <= 1) return;
      updated = current.filter((i) => i.label !== item.label);
    } else {
      if (current.length >= 3) {
        updated = [current[0], current[1], item];
      } else {
        updated = [...current, item];
      }
    }
    onChange({ beachBag: updated });
  };

  return (
    <div className="bg-goa-card/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4.5">
      <div className="border-b border-white/10 pb-2.5">
        <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-goa-yellow" />
          Enter Your Details
        </h2>
        <p className="text-[11px] sm:text-xs text-gray-400">
          Updates the live card preview & scannable QR code instantly.
        </p>
      </div>

      {/* Name Input */}
      <div>
        <label className="block text-xs font-bold text-gray-300 mb-1 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-goa-cyan" />
          Full Name
        </label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g. MADHAVAN SINGH"
          className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white placeholder-gray-500 focus:outline-none focus:border-goa-cyan focus:ring-1 focus:ring-goa-cyan transition-all min-h-[44px]"
        />
      </div>

      {/* Stack / Role Input */}
      <div>
        <label className="block text-xs font-bold text-gray-300 mb-1 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-goa-accent" />
          Role / Stack
        </label>
        <input
          type="text"
          value={profile.role}
          onChange={(e) => onChange({ role: e.target.value })}
          placeholder="e.g. FULL STACK DEVELOPER"
          className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white placeholder-gray-500 focus:outline-none focus:border-goa-accent focus:ring-1 focus:ring-goa-accent transition-all min-h-[44px]"
        />
      </div>

      {/* Builder Title & Random Generator Button */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-goa-yellow" />
            Builder Class Title
          </label>
          <button
            type="button"
            onClick={handleGenerateTitle}
            className="text-[11px] font-bold text-goa-yellow hover:text-yellow-300 flex items-center gap-1 bg-goa-yellow/10 hover:bg-goa-yellow/20 border border-goa-yellow/30 px-2 py-1 rounded-lg transition-all active:scale-95"
          >
            <Dices className="w-3 h-3 animate-spin" />
            Randomize
          </button>
        </div>
        <input
          type="text"
          value={profile.builderTitle}
          onChange={(e) => onChange({ builderTitle: e.target.value })}
          placeholder="e.g. TERMINAL WIZARD"
          className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm font-bold text-goa-yellow placeholder-gray-500 focus:outline-none focus:border-goa-yellow focus:ring-1 focus:ring-goa-yellow transition-all uppercase min-h-[44px]"
        />
      </div>

      {/* Motto / Currently Shipping & Generator */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-goa-emerald" />
            Shipping Motto / Vibe
          </label>
          <button
            type="button"
            onClick={handleGenerateMotto}
            className="text-[11px] font-bold text-goa-emerald hover:text-emerald-300 flex items-center gap-1 bg-goa-emerald/10 hover:bg-goa-emerald/20 border border-goa-emerald/30 px-2 py-1 rounded-lg transition-all active:scale-95"
          >
            <Dices className="w-3 h-3" />
            Randomize
          </button>
        </div>
        <input
          type="text"
          value={profile.motto}
          onChange={(e) => onChange({ motto: e.target.value })}
          placeholder="e.g. BUILDING THE FUTURE"
          className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm font-bold text-goa-emerald placeholder-gray-500 focus:outline-none focus:border-goa-emerald focus:ring-1 focus:ring-goa-emerald transition-all uppercase min-h-[44px]"
        />
      </div>

      {/* Beach Bag Items Selector */}
      <div>
        <label className="block text-xs font-bold text-gray-300 mb-1.5 flex items-center gap-1.5">
          <Luggage className="w-3.5 h-3.5 text-goa-yellow" />
          Beach Bag Essentials <span className="text-gray-400 font-normal">(Pick 3)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {AVAILABLE_BEACH_BAG_ITEMS.map((item) => {
            const isSelected = (profile.beachBag || []).some((i) => i.label === item.label);
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => toggleBeachBagItem(item)}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border flex items-center gap-1 transition-all touch-manipulation active:scale-95 ${
                  isSelected
                    ? 'border-goa-yellow bg-goa-yellow/20 text-goa-yellow shadow-md'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Theme Picker */}
      <div>
        <label className="block text-xs font-bold text-gray-300 mb-1.5 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-goa-cyan" />
          Card Theme
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(CARD_THEMES) as CardThemeId[]).map((themeKey) => {
            const th = CARD_THEMES[themeKey];
            const isSelected = profile.theme === themeKey;
            return (
              <button
                key={themeKey}
                type="button"
                onClick={() => onChange({ theme: themeKey })}
                className={`p-2 rounded-xl text-xs font-bold border text-left flex items-center justify-between transition-all touch-manipulation ${
                  isSelected
                    ? 'border-goa-cyan bg-goa-cyan/15 text-white shadow-md'
                    : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                }`}
              >
                <span className="truncate pr-1">{th.name}</span>
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                  style={{ backgroundColor: th.bgColor }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Ticket ID */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
        <span className="text-gray-400 flex items-center gap-1 font-semibold">
          <Ticket className="w-3.5 h-3.5 text-goa-yellow" />
          ID: <span className="font-mono text-white font-bold">{profile.ticketId}</span>
        </span>
        <button
          type="button"
          onClick={handleNewTicketId}
          className="text-gray-400 hover:text-white underline font-medium py-1"
        >
          New ID
        </button>
      </div>
    </div>
  );
};
