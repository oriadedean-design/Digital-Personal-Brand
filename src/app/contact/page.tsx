import type { Metadata } from 'next';
import { Mail, Instagram, Linkedin, MapPin } from 'lucide-react';
import { SOCIAL_LINKS } from '../../constants';
import { ContactForm } from '../../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | Dean Oriade',
  description: "Get in touch with Dean Oriade for photography, film, and creative direction projects.",
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 pt-10 md:pt-24 pb-28 md:pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

        {/* Left Col — Info */}
        <div className="space-y-10 md:space-y-12">
          <div>
            <h1 className="font-serif text-4xl md:text-7xl mb-4 md:mb-6">Let's build<br/>something.</h1>
            <p className="text-neutral-400 text-base md:text-lg max-w-md leading-relaxed">
              Whether it's a brand overhaul, a new venture, or a creative campaign, I'm ready to collaborate.
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
            </div>
          </div>
        </div>

        {/* Right Col — Form */}
        <ContactForm />
      </div>
    </div>
  );
}
