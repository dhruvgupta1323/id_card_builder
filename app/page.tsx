'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { BuilderWorkspace } from '@/components/BuilderWorkspace';

export default function Home() {
  return (
    <main className="min-h-screen bg-goa-gradient flex flex-col relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-goa-accent/15 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-goa-cyan/15 rounded-full filter blur-[120px] pointer-events-none" />

      <Header />
      <div className="flex-1 pb-16">
        <BuilderWorkspace />
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-6 px-4 text-center text-xs text-gray-400 bg-goa-dark/60">
        <p className="font-medium">
          Built for <span className="text-white font-bold">Hacker House Goa 2026</span> • Format B Builder ID Card Generator
        </p>
        <p className="mt-1 text-[11px] text-gray-400">
          Instant Canvas Rendering • #FrameInGoa Official Tag
        </p>
      </footer>
    </main>
  );
}
