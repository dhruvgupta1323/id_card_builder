'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Palmtree, Flame, Sparkles, ArrowRight, Camera, FileText, Download, ShieldCheck, Zap, Star } from 'lucide-react';

// Animated floating particle
function FloatingOrb({ className }: { className: string }) {
  return <div className={`absolute rounded-full pointer-events-none ${className}`} />;
}

// Feature card
function FeatureCard({
  icon,
  step,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div
      className="group relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
    >
      {/* Step number */}
      <div
        className="text-[10px] font-black tracking-widest mb-4 px-3 py-1 rounded-full border"
        style={{ color, borderColor: `${color}40`, background: `${color}15` }}
      >
        STEP {step}
      </div>

      {/* Icon circle */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}18`, border: `1.5px solid ${color}35` }}
      >
        <div style={{ color }}>{icon}</div>
      </div>

      <h3 className="text-base sm:text-lg font-black text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on mouse move
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      hero.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-goa-gradient text-white overflow-hidden flex flex-col">

      {/* ── Layered Ambient Glow Background ── */}
      <FloatingOrb className="w-[600px] h-[600px] -top-60 -left-40 bg-goa-accent/10 blur-[130px] animate-pulse-slow" />
      <FloatingOrb className="w-[500px] h-[500px] top-1/3 -right-40 bg-goa-cyan/10 blur-[110px] animate-pulse-slow" />
      <FloatingOrb className="w-[400px] h-[400px] bottom-0 left-1/3 bg-goa-purple/10 blur-[100px] animate-pulse-slow" />
      <FloatingOrb className="w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-goa-yellow/5 blur-[90px]" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-50 w-full bg-goa-dark/80 backdrop-blur-xl border-b border-white/[0.08] py-3 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-goa-accent via-goa-orange to-goa-yellow p-[2px] shadow-lg shadow-goa-accent/30 shrink-0">
              <div className="w-full h-full bg-goa-card rounded-[10px] flex items-center justify-center">
                <Palmtree className="w-4.5 h-4.5 text-goa-yellow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black tracking-widest text-white">
                  HACKER <span className="text-goa-accent">गोवा</span> HOUSE
                </span>
                <span className="bg-goa-accent/20 text-goa-accent text-[10px] font-bold px-2 py-0.5 rounded-full border border-goa-accent/40">
                  2026
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium hidden sm:block">
                Official Builder ID Card Generator
              </p>
            </div>
          </div>

          {/* Header badges */}
          <div className="flex items-center gap-2 text-[11px] font-semibold">
            <div className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Scannable QR
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-goa-yellow">
              <Flame className="w-3.5 h-3.5" />
              Instant PNG
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-20 sm:py-28 relative z-10">
        {/* Badge pill */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-goa-accent/20 via-goa-orange/20 to-goa-yellow/20 border border-white/15 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black text-white shadow-lg mb-8 backdrop-blur-sm">
          <Palmtree className="w-3.5 h-3.5 text-goa-yellow shrink-0" />
          <span>HACKER HOUSE GOA 2026 — OFFICIAL SHORTLISTING TASK</span>
          <Flame className="w-3.5 h-3.5 text-goa-accent shrink-0" />
        </div>

        {/* Two-column layout: text left, card right */}
        <div ref={heroRef} className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-transform duration-75 ease-out will-change-transform">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight text-white">
              Create Your{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #FF007A 0%, #FF5E00 50%, #FFDF00 100%)',
                }}
              >
                Goa Builder
                <br />
                ID Card
              </span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg max-w-lg leading-relaxed font-medium">
              Upload your photo, fill in your hacker details, and instantly generate
              your branded, downloadable badge for{' '}
              <span className="text-goa-yellow font-bold">#FrameInGoa</span>.
              No design skills needed.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 text-sm">
              {[
                { value: '100%', label: 'Free' },
                { value: '<30s', label: 'Generate' },
                { value: 'HD', label: 'PNG Export' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl font-black text-white">{s.value}</span>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link
                href="/builder"
                id="cta-create-card"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-black text-white shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-goa-accent/40 active:scale-[0.98] overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #FF007A 0%, #FF5E00 60%, #FFDF00 100%)',
                  boxShadow: '0 0 40px rgba(255, 0, 122, 0.4), 0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
                <Sparkles className="w-5 h-5 shrink-0" />
                Create My Builder Card
                <ArrowRight className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <span className="text-xs text-gray-500 font-medium">No sign-up required</span>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              {[
                { icon: <Zap className="w-3 h-3" />, text: 'Instant rendering', color: '#00F0FF' },
                { icon: <Star className="w-3 h-3" />, text: '#FrameInGoa Official', color: '#FFDF00' },
                { icon: <ShieldCheck className="w-3 h-3" />, text: 'Scannable QR code', color: '#10B981' },
              ].map((t) => (
                <div
                  key={t.text}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ color: t.color, background: `${t.color}12`, border: `1px solid ${t.color}25` }}
                >
                  {t.icon}
                  {t.text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Animated Card Preview ── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Outer glow ring */}
            <div
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-[80px] opacity-60 animate-pulse-slow"
              style={{ background: 'radial-gradient(circle, rgba(255,0,122,0.25) 0%, rgba(255,94,0,0.15) 50%, transparent 70%)' }}
            />

            {/* Floating card mockup */}
            <div
              className="relative animate-float rounded-3xl overflow-hidden shadow-2xl"
              style={{
                width: 'clamp(240px, 45vw, 320px)',
                boxShadow: '0 0 80px rgba(255,0,122,0.3), 0 40px 80px rgba(0,0,0,0.6)',
                background: 'linear-gradient(135deg, #12192E 0%, #1a0b2e 100%)',
                border: '1.5px solid rgba(255,255,255,0.12)',
              }}
            >
              {/* Card top accent strip */}
              <div
                className="h-1.5 w-full"
                style={{ background: 'linear-gradient(90deg, #FF007A, #FF5E00, #FFDF00)' }}
              />

              <div className="p-6 sm:p-8 flex flex-col gap-5">
                {/* Card header */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-0.5">HACKER HOUSE GOA</div>
                    <div className="text-xs font-black text-white">BUILDER PASS</div>
                  </div>
                  <div
                    className="text-[10px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(255,0,122,0.15)', color: '#FF007A', border: '1px solid rgba(255,0,122,0.3)' }}
                  >
                    2026
                  </div>
                </div>

                {/* Avatar placeholder */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #FF007A22, #00F0FF22)',
                      border: '2px solid rgba(255,0,122,0.4)',
                    }}
                  >
                    🧑‍💻
                  </div>
                  <div>
                    <div className="text-sm font-black text-white">Your Name</div>
                    <div className="text-[10px] text-gray-400 font-medium mt-0.5">Full Stack Builder</div>
                    <div className="text-[10px] text-goa-cyan font-bold mt-1">@yourhandle</div>
                  </div>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5">
                  {['Full Stack', 'AI/ML', 'Web3', 'Rust'].map((tag, i) => {
                    const colors = ['#FF007A', '#00F0FF', '#FFDF00', '#8B5CF6'];
                    return (
                      <span
                        key={tag}
                        className="text-[9px] font-black px-2 py-0.5 rounded-full"
                        style={{ color: colors[i], background: `${colors[i]}18`, border: `1px solid ${colors[i]}30` }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* Bottom: QR + tag */}
                <div className="flex items-end justify-between pt-1">
                  <div className="text-[9px] text-gray-500 font-medium">
                    <span className="text-goa-yellow font-bold">#FrameInGoa</span>
                    <br />
                    hhgoa.com/2026
                  </div>
                  {/* Mini QR placeholder */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="10" height="10" rx="1.5" fill="rgba(255,255,255,0.6)" />
                      <rect x="16" y="2" width="10" height="10" rx="1.5" fill="rgba(255,255,255,0.6)" />
                      <rect x="2" y="16" width="10" height="10" rx="1.5" fill="rgba(255,255,255,0.6)" />
                      <rect x="4" y="4" width="6" height="6" rx="0.5" fill="#0A0F1D" />
                      <rect x="18" y="4" width="6" height="6" rx="0.5" fill="#0A0F1D" />
                      <rect x="4" y="18" width="6" height="6" rx="0.5" fill="#0A0F1D" />
                      <rect x="16" y="16" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.6)" />
                      <rect x="22" y="16" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.6)" />
                      <rect x="16" y="22" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.6)" />
                      <rect x="22" y="22" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.6)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative floating badges around the card */}
            <div
              className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-[11px] font-black px-3 py-1.5 rounded-xl backdrop-blur-md animate-bounce"
              style={{
                background: 'rgba(0,240,255,0.12)',
                border: '1px solid rgba(0,240,255,0.3)',
                color: '#00F0FF',
                boxShadow: '0 0 20px rgba(0,240,255,0.2)',
                animationDelay: '0.3s',
              }}
            >
              🔥 #FrameInGoa
            </div>
            <div
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 text-[11px] font-black px-3 py-1.5 rounded-xl backdrop-blur-md"
              style={{
                background: 'rgba(255,223,0,0.12)',
                border: '1px solid rgba(255,223,0,0.3)',
                color: '#FFDF00',
                boxShadow: '0 0 20px rgba(255,223,0,0.15)',
                animation: 'float 5s ease-in-out infinite',
                animationDelay: '1s',
              }}
            >
              🌴 GOA 2026
            </div>
          </div>
        </div>

        {/* ── How It Works ── */}
        <div className="w-full max-w-6xl mt-24 sm:mt-32">
          <div className="text-center mb-10 sm:mb-14">
            <div
              className="inline-block text-[10px] font-black tracking-[0.25em] px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.2)' }}
            >
              HOW IT WORKS
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Three steps to your{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #00F0FF, #8B5CF6)' }}
              >
                builder card
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            <FeatureCard
              step="01"
              icon={<Camera className="w-7 h-7" />}
              title="Upload Your Photo"
              desc="Drop in your best headshot. Adjust the position and scale to frame it perfectly."
              color="#FF007A"
            />
            <FeatureCard
              step="02"
              icon={<FileText className="w-7 h-7" />}
              title="Fill Your Details"
              desc="Add your name, handle, role, skills, and a punchy one-liner about what you build."
              color="#00F0FF"
            />
            <FeatureCard
              step="03"
              icon={<Download className="w-7 h-7" />}
              title="Download & Share"
              desc="Instantly export a high-res PNG of your official Hacker House Goa builder pass."
              color="#FFDF00"
            />
          </div>

          {/* Big CTA repeat */}
          <div className="flex justify-center mt-12 sm:mt-16">
            <Link
              href="/builder"
              id="cta-create-card-bottom"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-black text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF007A 0%, #FF5E00 60%, #FFDF00 100%)',
                boxShadow: '0 0 40px rgba(255, 0, 122, 0.4), 0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
              <Sparkles className="w-5 h-5 shrink-0" />
              Let's Build Your Card →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 w-full border-t border-white/[0.08] py-6 px-4 text-center text-xs text-gray-500 bg-goa-dark/40 backdrop-blur-sm">
        <p className="font-medium">
          Built for <span className="text-white font-bold">Hacker House Goa 2026</span> •{' '}
          Official Builder ID Card Generator
        </p>
        <p className="mt-1 text-[11px] text-gray-600">
          Instant Canvas Rendering • #FrameInGoa Official Tag • Format B Builder Card
        </p>
      </footer>
    </main>
  );
}
