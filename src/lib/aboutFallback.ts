// Verbatim personal bio content, preserved exactly as authored.
// This is real content (not mock/placeholder data) and is also seeded into
// Sanity (see scripts/seed.ts) so it can be edited in Studio going forward.
// Kept here as a guaranteed fallback so the About page narrative and bucket
// list are never lost, altered, or replaced with a fabricated empty state.
import type { AboutData } from '../types';

export const ABOUT_FALLBACK: AboutData = {
  heading: 'Quiet Excellence.',
  subtitle: 'Marketing Manager / Strategist',
  location: 'Mississauga, Ontario',
  narrative: [
    'Creative and Strategic Marketing Professional with 6+ years of experience in Marketing & Communications, and 10 years of experience in Photography, Design, and Videography/Editing. Proven ability to execute brand strategies and develop high-quality marketing initiatives that align with business goals.',
    'I specialize in partnering with stakeholders globally to enhance brand awareness, design compelling branding materials, and manage corporate messaging. From fundraising millions for the Canadian Film Centre to building grassroots movements for OYA, my work bridges the gap between data-driven strategy and human-centric storytelling.',
  ],
  gear: [
    { item: 'Canon R50', detail: 'Main Body' },
    { item: 'RF 35mm f/1.2', detail: 'Storyteller' },
    { item: 'MacBook Pro M1', detail: 'Workhorse' },
  ],
  education: [
    { school: 'Scrum Alliance', degree: 'Certified Scrum Product Owner (CSPO)', year: '2024 - 2026' },
    { school: 'Canon Canada', degree: 'Canon Futures Creator', year: '2023 - 2024' },
    { school: 'Google Academy', degree: 'Advanced Google Analytics', year: '2020 - 2024' },
    { school: 'Our Wave Hub', degree: 'No-Code & Marketing Fundamentals', year: '2022' },
    { school: 'York University', degree: 'Communications & Social Science', year: '2016 - 2021' },
  ],
  skills: [
    { category: 'Creative', skills: ['Creative Direction', 'Visual Storytelling', 'Content Strategy', 'Content Development', 'Photography', 'Videography', 'Film Production', 'Photo & Video Editing'] },
    { category: 'Production', skills: ['Production Management', 'Campaign Execution', 'Gallery Showcase Production', 'Brand Identity'] },
    { category: 'AI & Tech', skills: ['AI-Assisted Web Development', 'AI for Database Management', 'Data Schema Creation', 'AI User Testing', 'Product Research', 'Prompt Engineering'] },
    { category: 'Strategy', skills: ['Marketing Communications', 'Audience Development', 'Partnership Execution', 'Grant Writing'] },
    { category: 'Technical', skills: ['HTML5', 'CSS', 'WordPress', 'Webflow', 'Elementor', 'JavaScript', 'Google Apps Script'] },
    { category: 'Platforms', skills: ['Mailchimp', 'Google Analytics', 'Adobe Creative Cloud', 'Hootsuite', 'Salesforce'] },
  ],
  bucketList: [
    { item: 'Get Married', completed: true },
    { item: 'Have a film at TIFF', completed: false },
    { item: 'Build a website from scratch', completed: true },
    { item: 'Build a house', completed: false },
  ],
};
