import React, { useEffect, useRef, useState } from 'react';
import { Download, Share2, Sparkles, RefreshCw, Eye, QrCode } from 'lucide-react';
import { BuilderProfile } from '@/types/builder';
import { drawCardOnCanvas } from '@/lib/canvasRenderer';

interface CardPreviewProps {
  profile: BuilderProfile;
  onGenerateClick: () => void;
}

export const CardPreview: React.FC<CardPreviewProps> = ({ profile, onGenerateClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState<HTMLImageElement | null>(null);

  // Load profile photo when URL changes
  useEffect(() => {
    if (!profile.photoUrl) {
      setImageLoaded(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImageLoaded(img);
    };
    img.src = profile.photoUrl;
  }, [profile.photoUrl]);

  // Re-render canvas whenever profile state or loaded image changes
  useEffect(() => {
    if (canvasRef.current) {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
      drawCardOnCanvas(canvasRef.current, profile, {
        userImageElement: imageLoaded,
        originUrl: origin,
      });
    }
  }, [profile, imageLoaded]);

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      {/* Badge Container */}
      <div className="relative w-full bg-goa-dark/90 p-4 sm:p-6 rounded-3xl border border-white/15 shadow-2xl shadow-goa-accent/10">
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-goa-yellow uppercase tracking-wider">
            <Eye className="w-4 h-4 text-goa-yellow animate-pulse" />
            Live Card Preview
          </div>
          <span className="text-[10px] font-bold text-goa-emerald bg-goa-emerald/10 border border-goa-emerald/30 px-2.5 py-1 rounded-full flex items-center gap-1">
            <QrCode className="w-3 h-3" />
            Real Scannable QR & Barcode
          </span>
        </div>

        {/* Canvas Display Box */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-white/20 shadow-inner bg-black/40 group">
          <canvas
            ref={canvasRef}
            className="w-full h-auto object-contain transition-transform duration-300"
          />
        </div>

        {/* Action Button */}
        <div className="mt-5">
          <button
            onClick={onGenerateClick}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-goa-accent via-goa-orange to-goa-yellow text-white font-black text-base shadow-lg shadow-goa-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 uppercase tracking-wide group"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Generate Official Card
          </button>
        </div>
      </div>
    </div>
  );
};
