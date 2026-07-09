"use client";

import React, { useState } from 'react';
import { Mail, ArrowRight, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      // TODO(dean): wire this up to a real form-submission endpoint.
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1500);
      });
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  return (
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
  );
}
