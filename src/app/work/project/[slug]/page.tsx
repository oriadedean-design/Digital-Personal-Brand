"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PROJECTS, JOURNAL } from '../../../../constants';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { client, isSanityConfigured } from '@/sanity/client';
import { PROJECTS_QUERY, toProject } from '@/sanity/queries';
import { Project } from '../../../../types';
import { PortableText } from '@portabletext/react';

function LoadingSkeleton() {
  return (
    <div className="max-w-5xl mx-auto pt-16 md:pt-24 px-4 md:px-0 animate-pulse">
      <div className="h-4 w-24 bg-white/5 rounded mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="h-14 bg-white/5 rounded w-3/4" />
          <div className="h-3 bg-white/5 rounded w-1/2 mt-6" />
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-white/5 rounded" />
          <div className="h-4 bg-white/5 rounded w-4/5" />
          <div className="h-4 bg-white/5 rounded w-3/5" />
        </div>
      </div>
      <div className="space-y-6">
        <div className="h-64 bg-white/5 rounded" />
        <div className="h-96 bg-white/5 rounded" />
      </div>
    </div>
  );
}

function NotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-0 pt-16 md:pt-24">
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-neutral-500 hover:text-white mb-12 transition-colors min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs uppercase tracking-widest">Back to Archive</span>
      </button>
      <div className="flex flex-col items-center justify-center h-[40vh] text-center">
        <AlertCircle className="w-8 h-8 text-neutral-600 mb-4" />
        <p className="font-serif text-2xl italic text-neutral-500 mb-2">Not in the archive.</p>
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-700">This project could not be found.</p>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const params  = useParams();
  const slug    = params?.slug as string;
  const router  = useRouter();

  const [project, setProject]       = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>(PROJECTS);
  const [loading, setLoading]       = useState(true);
  const [hasError, setHasError]     = useState(false);

  useEffect(() => {
    if (!slug) return;

    if (!isSanityConfigured) {
      setProject(PROJECTS.find(p => p.slug === slug) || null);
      setLoading(false);
      return;
    }

    client.fetch(PROJECTS_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          const formatted = data.map(toProject);
          setAllProjects(formatted);
          setProject(formatted.find((p: Project) => p.slug === slug) || null);
        } else {
          setProject(PROJECTS.find(p => p.slug === slug) || null);
        }
      })
      .catch((err) => {
        console.error(err);
        setHasError(true);
        setProject(PROJECTS.find(p => p.slug === slug) || null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSkeleton />;
  if (!project) return <NotFound onBack={() => router.push('/work')} />;

  const currentIndex  = allProjects.findIndex(p => p.slug === slug);
  const nextProject   = allProjects[(currentIndex + 1) % allProjects.length] || allProjects[0];
  const relatedJournal = JOURNAL[0];

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-0 pt-16 md:pt-24">
      <button
        onClick={() => router.push('/work')}
        className="group flex items-center gap-2 text-neutral-500 hover:text-white mb-8 transition-colors min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs uppercase tracking-widest">Back to Archive</span>
      </button>

      {hasError && (
        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-6">
          <AlertCircle className="w-3 h-3" /> Showing cached data
        </div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16 items-end"
      >
        <div>
          <h1 className="font-serif text-4xl md:text-7xl mb-4 md:mb-6">{project.title}</h1>
          <div className="flex flex-wrap gap-4 md:gap-8 text-xs font-mono text-neutral-400 border-t border-white/10 pt-4">
            {project.client   && <div><span className="block text-neutral-600 mb-1">CLIENT</span>{project.client}</div>}
            {project.year     && <div><span className="block text-neutral-600 mb-1">YEAR</span>{project.year}</div>}
            {project.category && <div><span className="block text-neutral-600 mb-1">CATEGORY</span>{project.category}</div>}
            {project.discipline       && <div><span className="block text-neutral-600 mb-1">DISCIPLINE</span>{project.discipline}</div>}
            {project.metadataCamera   && <div><span className="block text-neutral-600 mb-1">CAMERA</span>{project.metadataCamera}</div>}
            {project.metadataLocation && <div><span className="block text-neutral-600 mb-1">LOCATION</span>{project.metadataLocation}</div>}
          </div>
        </div>
        <div className="text-neutral-300 text-base md:text-lg leading-relaxed">
          {project.body ? (
            <div className="prose prose-invert prose-neutral max-w-none">
              <PortableText value={project.body} />
            </div>
          ) : (
            project.description
          )}
          {project.pullQuote && (
            <p className="mt-4 text-sm text-neutral-500 italic">"{project.pullQuote}"</p>
          )}
        </div>
      </motion.div>

      {/* Gallery */}
      <div className="space-y-4 md:space-y-8 mb-16 md:mb-24">
        {project.gallery.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full overflow-hidden rounded-sm"
          >
            <img
              src={img.url}
              alt={img.alt || project.title}
              className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-1000"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
            />
          </motion.div>
        ))}
      </div>

      {/* Next steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 border-t border-white/10 pt-8 md:pt-12 pb-16 md:pb-24">
        <Link
          href={`/journal/${relatedJournal.slug}`}
          className="block group p-6 md:p-8 border border-white/5 bg-white/5 hover:bg-white/10 transition-all rounded-lg"
        >
          <span className="text-xs font-mono text-neutral-500 uppercase mb-2 block">Related Thought</span>
          <h3 className="font-serif text-xl md:text-2xl italic mb-2 group-hover:text-white transition-colors">{relatedJournal.title}</h3>
          <p className="text-sm text-neutral-400 line-clamp-2">{relatedJournal.excerpt}</p>
        </Link>

        {nextProject && (
          <Link
            href={`/work/project/${nextProject.slug}`}
            className="block group p-6 md:p-8 text-right relative overflow-hidden rounded-lg border border-transparent hover:border-white/10 transition-all"
          >
            <div className="absolute inset-0 bg-neutral-900 -z-10" />
            <img
              src={nextProject.thumbnail.url}
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-sm"
              alt=""
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
            />
            <div className="relative z-10">
              <span className="text-xs font-mono text-neutral-400 uppercase mb-2 block">Next Project</span>
              <h3 className="font-serif text-2xl md:text-3xl text-white">{nextProject.title}</h3>
              <div className="mt-3 md:mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest">
                View Case <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
