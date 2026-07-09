"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Instagram, Linkedin, MapPin, AlertCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../../constants';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      // Simulate form submission — replace with real endpoint when ready
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1500);
      });
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 pt-10 md:pt-24 pb-28 md:pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

        {/* Left Col — Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10 md:space-y-12"
        >
          <div>
            <h1 className="font-serif text-4xl md:text-7xl mb-4 md:mb-6">Let's build<br/>something.</h1>
            <p className="text-neutral-400 text-base md:text-lg max-w-md leading-relaxed">
              Currently accepting new projects for Q2 2026. Whether it's a brand overhaul, a new venture, or a creative campaign, I'm ready to collaborate.
            </p>
          </div>

          <div className="space-y-5 md:space-y-6">
            <a
              href="mailto:oriade.dean@gmail.com"
              className="group flex items-center gap-4 text-lg md:text-xl font-serif hover:text-neutral-300 transition-colors"
            >
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shrink-0">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              oriade.dean@gmail.com
            </a>

            <div className="flex items-center gap-4 text-neutral-400">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              Mississauga, Ontario
            </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-white/10">
            <p className="text-xs font-mono uppercase text-neutral-500 mb-4 tracking-widest">Socials</p>
            <div className="flex gap-3 md:gap-4 flex-wrap">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all min-h-[44px] min-w-[44px] flex items-center justify-center font-bold text-sm"
              >
                𝕏
              </a>
              <a
                href={SOCIAL_LINKS.behance}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Behance"
                className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all min-h-[44px] min-w-[44px] flex items-center justify-center font-bold text-xs"
              >
                Bē
              </a>
              {SOCIAL_LINKS.tiktok !== 'TIKTOK_URL' && (
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all min-h-[44px] min-w-[44px] flex items-center justify-center font-bold text-xs"
                >
                  TT
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Col — Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <form onSubmit={handleSubmit} className="space-y-7 md:space-y-8 bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10">
            {formState === 'success' ? (
              <div className="min-h-[360px] md:min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl">Message Sent</h3>
                <p className="text-neutral-400 text-sm md:text-base">I'll get back to you within 48 hours.</p>
                <button
                  type="button"
                  onClick={() => setFormState('idle')}
                  className="mt-6 md:mt-8 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors min-h-[44px]"
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                {formState === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Something went wrong. Please try again or email directly.</span>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono uppercase text-neutral-500 tracking-widest">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono uppercase text-neutral-500 tracking-widest">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="inquiry" className="text-xs font-mono uppercase text-neutral-500 tracking-widest">Inquiry Type</label>
                  <select
                    id="inquiry"
                    name="inquiry"
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors appearance-none"
                  >
                    <option value="project" className="bg-neutral-900">New Project</option>
                    <option value="consulting" className="bg-neutral-900">Consulting</option>
                    <option value="speaking" className="bg-neutral-900">Speaking</option>
                    <option value="other" className="bg-neutral-900">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono uppercase text-neutral-500 tracking-widest">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors resize-none placeholder:text-neutral-600"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full group flex items-center justify-between bg-white text-black px-5 md:px-6 py-3 md:py-4 rounded-lg font-medium hover:bg-neutral-200 active:scale-[0.98] transition-all disabled:opacity-50 min-h-[44px]"
                >
                  {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
