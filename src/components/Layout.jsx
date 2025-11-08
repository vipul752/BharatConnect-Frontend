import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-[1120px] mx-auto px-[clamp(1.25rem,4vw,2.5rem)] py-10 lg:py-16" role="main">
        {children}
      </main>
      <footer className="mt-16 border-t border-black/5 bg-white/70 backdrop-blur">
        <div className="max-w-[1120px] mx-auto px-[clamp(1.25rem,4vw,2.5rem)] py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center gap-[0.35rem] px-[0.9rem] py-[0.35rem] rounded-full bg-[rgba(255,107,44,0.14)] text-[#d94a00] font-semibold tracking-[0.02em] uppercase text-xs mb-2">BharatConnect</span>
              <p className="text-sm text-black/60 max-w-md">
                Crafted in India for creators, builders, and dreamers. Grow your professional story with a community that celebrates progress.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-black/60">
              <a href="#" className="rounded-full px-4 py-2 hover:bg-black/5 transition">About</a>
              <a href="#" className="rounded-full px-4 py-2 hover:bg-black/5 transition">Privacy</a>
              <a href="#" className="rounded-full px-4 py-2 hover:bg-black/5 transition">Terms</a>
              <a href="#" className="rounded-full px-4 py-2 hover:bg-black/5 transition">Support</a>
            </div>
          </div>
          <div className="mt-6 text-xs text-black/40">
            © {new Date().getFullYear()} BharatConnect. Designed for momentum.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
