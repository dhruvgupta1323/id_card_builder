'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Palmtree, ArrowLeft, Share2, Download, CheckCircle, Flame, ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';

export default function SharePage({ params }: { params: { id: string } }) {
  const ticketId = params.id || 'HH-GOA-7757';

  const tweetText = `Check out my verified Hacker House Goa 2026 Builder Card! 🌴🔥\nTicket ID: #${ticketId}\n\n#FrameInGoa #HHGoa2026`;

  const handleShareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-goa-gradient flex flex-col text-white">
      <Header />

      <div className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full flex flex-col items-center justify-center text-center">
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold px-4 py-1.5 rounded-full text-xs mb-6 shadow-lg">
          <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          VERIFIED HACKER HOUSE GOA 2026 BUILDER BADGE
        </div>

        <h1 className="text-3xl sm:text-5xl font-black mb-3">
          Builder Identity <span className="text-goa-yellow">#{ticketId}</span>
        </h1>
        <p className="text-gray-300 text-sm max-w-md mb-8">
          This digital identity badge was dynamically generated & verified for Hacker House Goa 2026 • #FrameInGoa.
        </p>

        {/* Dynamic Interactive Display Badge Card */}
        <div className="relative w-full max-w-md bg-goa-card border border-white/20 rounded-3xl p-8 shadow-2xl shadow-goa-accent/20 mb-8 space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-goa-accent via-goa-orange to-goa-yellow p-1 shadow-xl">
            <div className="w-full h-full bg-goa-dark rounded-full flex items-center justify-center text-3xl">
              🌴
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">OFFICIAL BUILDER PASS</h2>
            <p className="text-xs font-bold text-goa-accent uppercase tracking-wider mt-1">
              HACKER HOUSE GOA 2026
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left bg-black/40 p-4 rounded-2xl border border-white/10 text-xs">
            <div>
              <span className="text-gray-400 font-semibold block mb-0.5">STATUS</span>
              <span className="text-emerald-400 font-black flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> CONFIRMED
              </span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block mb-0.5">TICKET ID</span>
              <span className="text-white font-mono font-bold">#{ticketId}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block mb-0.5">DATES</span>
              <span className="text-goa-yellow font-bold">28 - 31 OCT 2026</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block mb-0.5">LOCATION</span>
              <span className="text-goa-cyan font-bold">GOA, INDIA</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleShareX}
              className="w-full py-3.5 px-4 rounded-xl bg-black border border-white/20 hover:border-white/40 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Share2 className="w-4 h-4 text-goa-cyan" />
              Share Badge to X (Twitter)
            </button>

            <Link
              href="/"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-goa-accent to-goa-orange font-bold text-xs flex items-center justify-center gap-2 text-white shadow-lg transition-all"
            >
              <Palmtree className="w-4 h-4" />
              Create Your Own Builder ID Card
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Card Generator Workspace
        </Link>
      </div>
    </main>
  );
}
