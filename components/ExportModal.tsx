import React, { useEffect, useState } from 'react';
import { Download, Share2, Copy, Check, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BuilderProfile } from '@/types/builder';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: BuilderProfile;
  canvasElement: HTMLCanvasElement | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  profile,
  canvasElement,
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF007A', '#00F0FF', '#FFDF00', '#10B981'],
      });

      if (canvasElement) {
        setDataUrl(canvasElement.toDataURL('image/png'));
      }
    }
  }, [isOpen, canvasElement]);

  if (!isOpen || !dataUrl) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    const sanitizedName = (profile.name || 'Builder').replace(/[^a-zA-Z0-9]/g, '_');
    a.download = `HH-Goa-2026-${sanitizedName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const tweetText = `Building, shipping and vibing in Goa 🌴\nI'm joining @HackerHouseGoa 2026 as a ${profile.role}! 🔥\n\nCheck out my official builder identity card:\n#FrameInGoa #HHGoa2026 #HackerHouseGoa`;

  const handleShareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(tweetText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleCopyImage = () => {
    if (!canvasElement) return;
    canvasElement.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2000);
      } catch (err) {
        console.error('Could not copy image to clipboard:', err);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-goa-dark border border-white/20 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4 sm:mb-6 pr-6">
          <div className="inline-flex items-center gap-1.5 bg-goa-accent/20 border border-goa-accent/40 text-goa-accent text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Card Generated! 🎉
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Your Official Builder ID</h2>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
            High-res PNG with scannable QR code for <span className="text-goa-yellow font-bold">#FrameInGoa</span>
          </p>
        </div>

        {/* Generated Image Preview */}
        <div className="relative w-full max-w-[240px] sm:max-w-xs mx-auto rounded-2xl overflow-hidden border-2 border-goa-accent/40 shadow-xl mb-5 bg-black/50">
          <img src={dataUrl} alt="Generated Builder Card" className="w-full h-auto" />
        </div>

        {/* Action Grid */}
        <div className="space-y-2.5">
          {/* Download PNG Button */}
          <button
            onClick={handleDownload}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-goa-emerald via-teal-500 to-emerald-400 text-goa-dark font-black text-xs sm:text-sm shadow-lg shadow-goa-emerald/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 uppercase tracking-wide min-h-[46px]"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            Download PNG (High-Res)
          </button>

          {/* Share to X Button */}
          <button
            onClick={handleShareX}
            className="w-full py-3.5 px-4 rounded-2xl bg-black border border-white/20 hover:border-white/40 text-white font-black text-xs sm:text-sm shadow-lg hover:bg-zinc-900 active:scale-[0.99] transition-all flex items-center justify-center gap-2 uppercase tracking-wide min-h-[46px]"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-goa-cyan" />
            Share to X (Twitter) • #FrameInGoa
          </button>

          {/* Copy Controls Row */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleCopyImage}
              className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-[11px] sm:text-xs font-bold text-gray-300 flex items-center justify-center gap-1 transition-colors min-h-[40px]"
            >
              {copiedImage ? (
                <>
                  <Check className="w-3.5 h-3.5 text-goa-emerald" />
                  Copied Image!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-goa-yellow" />
                  Copy Image
                </>
              )}
            </button>

            <button
              onClick={handleCopyText}
              className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-[11px] sm:text-xs font-bold text-gray-300 flex items-center justify-center gap-1 transition-colors min-h-[40px]"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-goa-emerald" />
                  Copied Status!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-goa-cyan" />
                  Copy Caption
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
