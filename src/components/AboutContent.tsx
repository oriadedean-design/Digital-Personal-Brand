"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, MapPin, Heart, GraduationCap, Cpu, ArrowUpRight } from 'lucide-react';
import type { AboutData, Brand } from '../types';

export function AboutContent({ data, brands }: { data: AboutData; brands: Brand[] }) {
  const heading = data.heading || 'Quiet Excellence.';
  const subtitle = data.subtitle || 'Marketing Manager / Strategist';
  const location = data.location || 'Mississauga, Ontario';

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 pt-12 md:pt-24 pb-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">

      {/* Left Col — portrait + gear */}
      <div className="md:col-span-5 md:sticky md:top-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-[3/4] rounded-lg overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl bg-white/5 border border-white/10"
        >
          {data.portraitImage ? (
            <Image
              src={data.portraitImage.url}
              alt={data.portraitImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          ) : (
            // TODO(dean): upload a portrait in Sanity Studio (siteConfig > About Page > Portrait Image)
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-serif text-6xl italic text-neutral-700">DO</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-8">
            <p className="font-serif text-2xl md:text-3xl italic text-white mb-1">Dean Oriade</p>
            <p className="text-xs text-neutral-400 uppercase tracking-widest">{subtitle}</p>
            <p className="text-xs text-neutral-500 mt-2 flex items-center gap-2">
              <MapPin className="w-3 h-3 shrink-0" /> {location}
            </p>
          </div>
        </motion.div>

        {data.gear && data.gear.length > 0 && (
          <div className="mt-6 p-5 md:p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
            <h3 className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 mb-4 tracking-widest">
              <Camera className="w-4 h-4" /> My Gear
            </h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              {data.gear.map((g, i) => (
                <li key={i} className="flex justify-between border-b border-white/5 pb-2 last:border-0">
                  <span>{g.item}</span>
                  <span className="text-neutral-500">{g.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
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
            {data.narrative.map((paragraph, idx) => (
              <p key={idx} className={idx > 0 ? 'mt-5 md:mt-6' : ''}>
                {paragraph}
              </p>
            ))}
          </motion.div>
        </section>

        {brands.length > 0 && (
          <section className="border-t border-white/10 pt-10 md:pt-12">
            <h3 className="text-sm font-mono uppercase text-neutral-400 mb-6 md:mb-8 tracking-widest">Ventures</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/${brand.slug}`}
                  className="group block p-5 md:p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-serif text-xl text-white">{brand.name}</h4>
                      <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest mt-1">{brand.role}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors shrink-0" />
                  </div>
                  {brand.tagline && <p className="text-sm text-neutral-400 mt-3">{brand.tagline}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
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
              {data.education.map((edu, idx) => (
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
        )}

        {data.skills && data.skills.length > 0 && (
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
              {data.skills.map((group, idx) => (
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
        )}

        {data.bucketList && data.bucketList.length > 0 && (
          <div className="pt-8 border-t border-white/10">
            <h3 className="flex items-center gap-2 text-sm font-mono uppercase text-neutral-400 mb-4 tracking-widest">
              <Heart className="w-4 h-4" /> Bucket List
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm">
              {data.bucketList.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 ${item.completed ? 'text-neutral-500 line-through decoration-neutral-500' : 'text-neutral-300'}`}
                >
                  <span className={`w-2 h-2 shrink-0 rounded-full ${item.completed ? 'bg-green-500/50' : 'bg-white/20'}`} />
                  {item.item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
