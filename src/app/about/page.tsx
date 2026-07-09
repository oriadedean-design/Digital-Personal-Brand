"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Heart, GraduationCap, Cpu } from 'lucide-react';
import { EDUCATION_DATA, SKILLS_DATA, SITE_CONTENT } from '../../constants';
import { client, urlFor, isSanityConfigured } from '@/sanity/client';
import { ABOUT_META_QUERY } from '@/sanity/queries';

const DEFAULT_GEAR = [
  { item: 'Canon R50',        detail: 'Main Body'  },
  { item: 'RF 35mm f/1.2',   detail: 'Storyteller' },
  { item: 'MacBook Pro M1',  detail: 'Workhorse'   },
];

export default function About() {
  const [aboutData, setAboutData] = useState(SITE_CONTENT.about);
  const [educationData]           = useState(EDUCATION_DATA);
  const [skillsData]              = useState(SKILLS_DATA);
  const [hasError, setHasError]   = useState(false);

  useEffect(() => {
    if (!isSanityConfigured) return;

    client.fetch(ABOUT_META_QUERY).then((data) => {
      if (data) {
        setAboutData({
          portraitImage: data.portraitImage
            ? { url: urlFor(data.portraitImage).width(800).format('webp').quality(80).url(), alt: 'Portrait' }
            : SITE_CONTENT.about.portraitImage,
          narrative:  data.narrative  || SITE_CONTENT.about.narrative,
          heading:    data.heading    || SITE_CONTENT.about.heading,
          subtitle:   data.subtitle   || SITE_CONTENT.about.subtitle,
          location:   data.location   || SITE_CONTENT.about.location,
          gear:       data.gear       || SITE_CONTENT.about.gear,
          education:  data.education,
          bucketList: data.bucketList,
        });
      }
    }).catch((err) => {
      console.error(err);
      setHasError(true);
    });
  }, []);

  const heading  = aboutData.heading  || 'Quiet Excellence.';
  const subtitle = aboutData.subtitle || 'Marketing Manager / Strategist';
  const location = aboutData.location || 'Mississauga, Ontario';
  const gear     = aboutData.gear     || DEFAULT_GEAR;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 pt-12 md:pt-24 pb-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">

      {/* Left Col — portrait + gear */}
      <div className="md:col-span-5 md:sticky md:top-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-[3/4] rounded-lg overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
        >
          <img
            src={aboutData.portraitImage.url}
            alt={aboutData.portraitImage.alt}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-8">
            <p className="font-serif text-2xl md:text-3xl italic text-white mb-1">Dean Oriade</p>
            <p className="text-xs text-neutral-400 uppercase tracking-widest">{subtitle}</p>
            <p className="text-xs text-neutral-500 mt-2 flex items-center gap-2">
              <MapPin className="w-3 h-3 shrink-0" /> {location}
            </p>
          </div>
        </motion.div>

        {hasError && (
          <p className="text-[10px] font-mono text-neutral-700 mt-3 text-center">Showing cached data.</p>
        )}

        <div className="mt-6 p-5 md:p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
          <h3 className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 mb-4 tracking-widest">
            <Camera className="w-4 h-4" /> My Gear
          </h3>
          <ul className="space-y-3 text-sm text-neutral-300">
            {gear.map((g, i) => (
              <li key={i} className="flex justify-between border-b border-white/5 pb-2 last:border-0">
                <span>{g.item}</span>
                <span className="text-neutral-500">{g.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Col — narrative + resume */}
      <div className="md:col-span-7 space-y-12 md:space-y-16">
        <section className="text-base md:text-lg text-neutral-300 leading-relaxed space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl mb-6 md:mb-8 text-white">{heading}</h1>
            {aboutData.narrative.map((paragraph, idx) => (
              <p key={idx} className={idx > 0 ? 'mt-5 md:mt-6' : ''}>
                {paragraph}
              </p>
            ))}
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-10 md:pt-12"
        >
          <h3 className="flex items-center gap-2 text-sm font-mono uppercase text-neutral-400 mb-6 md:mb-8 tracking-widest">
            <GraduationCap className="w-4 h-4" /> Education & Certification
          </h3>
          <div className="grid grid-cols-1 gap-5 md:gap-6">
            {(aboutData.education || educationData).map((edu, idx) => (
              <div
                key={idx}
                className="group flex flex-col md:flex-row justify-between md:items-end border-b border-white/5 pb-4 hover:border-white/20 transition-colors"
              >
                <div>
                  <h4 className="font-serif text-lg md:text-xl text-white group-hover:text-neutral-200 transition-colors">{edu.degree}</h4>
                  <p className="text-sm text-neutral-500 font-mono mt-1">{edu.school}</p>
                </div>
                <span className="text-xs text-neutral-600 font-mono mt-2 md:mt-0">{edu.year}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-10 md:pt-12"
        >
          <h3 className="flex items-center gap-2 text-sm font-mono uppercase text-neutral-400 mb-6 md:mb-8 tracking-widest">
            <Cpu className="w-4 h-4" /> Technical Competencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {skillsData.map((group, idx) => (
              <div key={idx}>
                <h4 className="text-sm text-white font-medium mb-3 md:mb-4 border-l-2 border-white pl-3">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-white/5 rounded text-xs text-neutral-400 border border-white/5 hover:border-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="pt-8 border-t border-white/10">
          <h3 className="flex items-center gap-2 text-sm font-mono uppercase text-neutral-400 mb-4 tracking-widest">
            <Heart className="w-4 h-4" /> Bucket List
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm">
            {aboutData.bucketList ? (
              aboutData.bucketList.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 ${item.completed ? 'text-neutral-500 line-through decoration-neutral-500' : 'text-neutral-300'}`}
                >
                  <span className={`w-2 h-2 shrink-0 rounded-full ${item.completed ? 'bg-green-500/50' : 'bg-white/20'}`} />
                  {item.item}
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center gap-3 text-neutral-500 line-through decoration-neutral-500"><span className="w-2 h-2 shrink-0 rounded-full bg-green-500/50" /> Get Married</div>
                <div className="flex items-center gap-3 text-neutral-300"><span className="w-2 h-2 shrink-0 rounded-full bg-white/20" /> Have a film at TIFF</div>
                <div className="flex items-center gap-3 text-neutral-500 line-through decoration-neutral-500"><span className="w-2 h-2 shrink-0 rounded-full bg-green-500/50" /> Build a website from scratch</div>
                <div className="flex items-center gap-3 text-neutral-300"><span className="w-2 h-2 shrink-0 rounded-full bg-white/20" /> Build a house</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
