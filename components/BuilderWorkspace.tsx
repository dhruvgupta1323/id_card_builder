import React, { useState } from 'react';
import { BuilderProfile, DEFAULT_PROFILE } from '@/types/builder';
import { UploadBox } from './UploadBox';
import { PhotoAdjuster } from './PhotoAdjuster';
import { DetailsForm } from './DetailsForm';
import { CardPreview } from './CardPreview';
import { ExportModal } from './ExportModal';
import { Palmtree, Flame, Sparkles, Eye, ArrowDown } from 'lucide-react';

export const BuilderWorkspace: React.FC = () => {
  const [profile, setProfile] = useState<BuilderProfile>(DEFAULT_PROFILE);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleUpdateProfile = (updated: Partial<BuilderProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const scrollToPreview = () => {
    const el = document.getElementById('card-preview-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Hero Banner Header */}
      <div className="text-center mb-6 sm:mb-10 space-y-2 sm:space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-goa-accent/20 via-goa-cyan/20 to-goa-yellow/20 border border-white/15 px-3 py-1 rounded-full text-[11px] sm:text-xs font-black text-white shadow-lg">
          <Palmtree className="w-3.5 h-3.5 text-goa-yellow" />
          HACKER HOUSE GOA 2026 OFFICIAL SHORTLISTING TASK
          <Flame className="w-3.5 h-3.5 text-goa-accent" />
        </div>
        <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Create Your <span className="bg-gradient-to-r from-goa-accent via-goa-orange to-goa-yellow bg-clip-text text-transparent">Goa Builder ID Card</span>
        </h1>
        <p className="text-xs sm:text-base text-gray-300 max-w-2xl mx-auto font-medium px-2">
          Upload your photo, enter your details, and instantly generate your branded downloadable badge for <span className="text-goa-yellow font-bold">#FrameInGoa</span>.
        </p>

        {/* Jump to Preview button for small mobile screens */}
        <div className="lg:hidden pt-2">
          <button
            onClick={scrollToPreview}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-goa-cyan bg-goa-cyan/10 border border-goa-cyan/30 px-3.5 py-1.5 rounded-full active:scale-95 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            Jump to Live Preview
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Main Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6 order-1">
          <UploadBox
            photoUrl={profile.photoUrl}
            onPhotoSelected={(url) => handleUpdateProfile({ photoUrl: url })}
          />

          {profile.photoUrl && (
            <PhotoAdjuster
              scale={profile.photoScale}
              offsetX={profile.photoOffsetX}
              offsetY={profile.photoOffsetY}
              onChangeScale={(scale) => handleUpdateProfile({ photoScale: scale })}
              onChangeOffsetX={(x) => handleUpdateProfile({ photoOffsetX: x })}
              onChangeOffsetY={(y) => handleUpdateProfile({ photoOffsetY: y })}
              onReset={() =>
                handleUpdateProfile({
                  photoScale: 1.0,
                  photoOffsetX: 0,
                  photoOffsetY: 0,
                })
              }
            />
          )}

          <DetailsForm profile={profile} onChange={handleUpdateProfile} />
        </div>

        {/* Right Column: Live Card Preview (Sticky on desktop, prominently stacked on mobile) */}
        <div id="card-preview-section" className="lg:col-span-6 lg:sticky lg:top-20 order-2">
          <CardPreview
            profile={profile}
            onGenerateClick={() => setIsExportOpen(true)}
          />
        </div>
      </div>

      {/* Export & Download Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        profile={profile}
        canvasElement={
          typeof window !== 'undefined'
            ? (document.querySelector('canvas') as HTMLCanvasElement)
            : null
        }
      />
    </div>
  );
};
