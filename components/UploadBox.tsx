import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { convertHeicToJpeg } from '@/lib/heicConverter';

interface UploadBoxProps {
  photoUrl: string | null;
  onPhotoSelected: (dataUrl: string | null) => void;
}

export const UploadBox: React.FC<UploadBoxProps> = ({ photoUrl, onPhotoSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const processedFile = await convertHeicToJpeg(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onPhotoSelected(dataUrl);
        setIsProcessing(false);
      };
      reader.onerror = () => {
        setErrorMsg('Failed to read image file.');
        setIsProcessing(false);
      };
      reader.readAsDataURL(processedFile);
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not process this image format. Please try JPG or PNG.');
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-goa-card/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl">
      <div className="flex items-center justify-between mb-2.5">
        <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-goa-cyan" />
          Builder Photo <span className="text-goa-accent text-[11px] font-normal">(JPG, PNG, HEIC)</span>
        </label>
        {photoUrl && (
          <button
            onClick={() => onPhotoSelected(null)}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors py-1 px-2"
          >
            Remove
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
        accept="image/png, image/jpeg, image/webp, image/heic, image/heif"
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`group relative cursor-pointer border-2 border-dashed rounded-xl p-4 sm:p-6 transition-all duration-200 text-center flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px] touch-manipulation ${
          photoUrl
            ? 'border-goa-emerald/40 bg-goa-emerald/5 hover:border-goa-emerald'
            : 'border-white/20 hover:border-goa-cyan bg-white/5 hover:bg-white/[0.07]'
        }`}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center gap-2 text-goa-cyan">
            <RefreshCw className="w-7 h-7 animate-spin" />
            <span className="text-xs font-bold">Processing Photo...</span>
          </div>
        ) : photoUrl ? (
          <div className="flex items-center gap-3 sm:gap-4 w-full">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-goa-emerald shrink-0 shadow-lg">
              <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-goa-emerald text-xs sm:text-sm font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Photo Loaded
              </div>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 truncate">
                Tap to change. Adjust scale & framing below.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-goa-cyan/10 border border-goa-cyan/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-goa-cyan" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-white mb-0.5">
              Tap to upload photo or <span className="text-goa-cyan underline">browse</span>
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400">
              Auto-crop & position controls for any face photo
            </p>
          </>
        )}
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 mt-3 text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg}
        </div>
      )}
    </div>
  );
};
