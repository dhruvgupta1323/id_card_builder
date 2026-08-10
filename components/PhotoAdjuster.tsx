import React from 'react';
import { ZoomIn, Move, RotateCcw } from 'lucide-react';

interface PhotoAdjusterProps {
  scale: number;
  offsetX: number;
  offsetY: number;
  onChangeScale: (scale: number) => void;
  onChangeOffsetX: (x: number) => void;
  onChangeOffsetY: (y: number) => void;
  onReset: () => void;
}

export const PhotoAdjuster: React.FC<PhotoAdjusterProps> = ({
  scale,
  offsetX,
  offsetY,
  onChangeScale,
  onChangeOffsetX,
  onChangeOffsetY,
  onReset,
}) => {
  return (
    <div className="bg-goa-card/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
          <Move className="w-4 h-4 text-goa-yellow" />
          Framing & Position Controls
        </label>
        <button
          onClick={onReset}
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors py-1 px-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
        {/* Zoom Level */}
        <div>
          <div className="flex justify-between font-semibold text-gray-400 mb-1">
            <span className="flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5 text-goa-cyan" /> Zoom
            </span>
            <span className="text-white font-mono">{Math.round(scale * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.05"
            value={scale}
            onChange={(e) => onChangeScale(parseFloat(e.target.value))}
            className="w-full accent-goa-cyan cursor-pointer h-2 bg-white/15 rounded-lg touch-none"
          />
        </div>

        {/* Pan X */}
        <div>
          <div className="flex justify-between font-semibold text-gray-400 mb-1">
            <span>Left / Right</span>
            <span className="text-white font-mono">{offsetX}px</span>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            step="2"
            value={offsetX}
            onChange={(e) => onChangeOffsetX(parseInt(e.target.value))}
            className="w-full accent-goa-yellow cursor-pointer h-2 bg-white/15 rounded-lg touch-none"
          />
        </div>

        {/* Pan Y */}
        <div>
          <div className="flex justify-between font-semibold text-gray-400 mb-1">
            <span>Up / Down</span>
            <span className="text-white font-mono">{offsetY}px</span>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            step="2"
            value={offsetY}
            onChange={(e) => onChangeOffsetY(parseInt(e.target.value))}
            className="w-full accent-goa-accent cursor-pointer h-2 bg-white/15 rounded-lg touch-none"
          />
        </div>
      </div>
    </div>
  );
};
