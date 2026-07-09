
import { Project, StrategyItem, JournalEntry, Venture, FilterCategory, EducationItem, SkillCategory, SiteConfig } from './types';

// --- SOCIAL LINKS ---
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/deanaldo.ca',
  twitter: 'https://x.com/deanaldoca',
  linkedin: 'https://www.linkedin.com/in/semilore-oriade',
  behance: 'https://www.behance.net/deanoriade',
  tiktok: 'TIKTOK_URL', // placeholder — replace with real TikTok URL when available
};

// --- CMS ASSETS (MOCKED) ---
// In a real app, these URLs would come from your media library.
const ASSETS = {
  darkSuit: "https://i.pinimg.com/736x/06/11/49/0611498b790c927f828fa16c459ea364.jpg",
  abstractBlur: "https://i.pinimg.com/736x/dd/2e/31/dd2e313a5525251bbf0f0b4ad8d805d2.jpg",
  textureGrain: "https://i.pinimg.com/474x/e4/f7/9f/e4f79f8741ebc59378c7e45badd6b750.jpg",
  shadowPlay: "https://i.pinimg.com/736x/36/bc/66/36bc6662c44eab49a58484b65418feef.jpg",
  tokyoNight: "https://images.unsplash.com/photo-1503899036084-c55cdd92a8fa?q=80&w=2940&auto=format&fit=crop",
  brutalist: "https://images.unsplash.com/photo-1486748723438-6798c108c9d6?q=80&w=2940&auto=format&fit=crop"
};

// --- B. The Master JSON Data (Site Content) ---
export const SITE_CONTENT: SiteConfig = {
  home: {
    intro: "Before everything, photography came first...",
    subtext: "Entering the Infinite Archive.",
    heroImage: {
      url: ASSETS.darkSuit,
      alt: "Dean Oriade - Noir Aesthetic"
    }
  },
  about: {
    portraitImage: {
      url: "https://i.pinimg.com/736x/1c/07/c4/1c07c4928246f2061b380a7c4202fb1a.jpg",
      alt: "Dean Oriade Portrait"
    },
    narrative: [
      "Creative and Strategic Marketing Professional with 6+ years of experience in Marketing & Communications, and 10 years of experience in Photography, Design, and Videography/Editing. Proven ability to execute brand strategies and develop high-quality marketing initiatives that align with business goals.",
      "I specialize in partnering with stakeholders globally to enhance brand awareness, design compelling branding materials, and manage corporate messaging. From fundraising millions for the Canadian Film Centre to building grassroots movements for OYA, my work bridges the gap between data-driven strategy and human-centric storytelling."
    ]
  },
  work: {
    title: "Photo Archive",
    caption: "A curated collection of moments frozen in time.",
    wink: "Yes, I really took all of these."
  },
  strategy: {
    title: "Strategic Impact",
    caption: "Connecting the dots between creativity and commerce.",
    wink: "Corporate Dean is actually quite organized."
  },
  ventures: {
    title: "The Empire",
    caption: "Building ecosystems, not just products.",
    wink: "Sleep is for the weak. (Just kidding, I love sleep)."
  },
  contact: {
    title: "The Bridge",
    caption: "Let's build something that outlasts us.",
    wink: "I usually reply within 24 hours, unless I'm on set."
  }
};

// --- C. The Resume JSON Data ---
export const RESUME_DATA: StrategyItem[] = [
  {
    id: '1',
    slug: 'cfc-marketing',
    company: 'Canadian Film Centre',
    role: 'Marketing Manager',
    period: 'Oct 2023 - Sep 2025',
    stat: '$550k+ Raised',
    description: "Driving high-impact campaigns and brand visibility for Canada's leading film institution.",
    image: {
      url: '/images/cfc-portrait.jpg',
      alt: "Canadian Film Centre"
    },
    content: {
      challenge: "To execute brand strategies and high-quality marketing initiatives that align with business goals while managing high-stakes events like the CFC Gala and Homecoming.",
      solution: "Led high-impact advertising campaigns in The Globe and Mail and The Toronto Star. Managed marketing teams for events attended by over 1,000 people and handled Salesforce email marketing for an audience of 10,000.",
      result: "Raised $250k at the CFC Gala and $300k+ at CFC Homecoming 2024. Achieved 20% overbooking for 'CFC Conversation with TD' and maintained a 90% retention rate."
    }
  },
  {
    id: '2',
    slug: 'oya-coalition',
    company: 'OYA Black Arts Coalition',
    role: 'Marketing Coordinator',
    period: 'Jun 2022 - Sep 2023',
    stat: '30% CPI Drop',
    description: 'Optimizing paid spend and building strategic partnerships for black arts advocacy.',
    image: {
       url: '/images/obac-event.jpg',
       alt: "OYA Black Arts Coalition Event"
    },
    content: {
      challenge: "To optimize paid marketing spend and build strong support for the mission amidst a need for better audience engagement across digital platforms.",
      solution: "Developed a video content strategy and executed keyword campaigns aligning with SEO objectives. Built strategic partnerships to expand audience reach organically.",
      result: "Reduced Cost Per Install (CPI) by 30% and drove 30% of total channel engagements over six months. Significantly increased organic search traffic."
    }
  },
  {
    id: '3',
    slug: 'siva-creative',
    company: "SIVA Creative",
    role: 'Digital Marketing Specialist',
    period: 'Mar 2022 - Jul 2022',
    stat: '16 Brands',
    description: 'Managing diverse media strategies across multiple industries.',
    image: {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
      alt: "Strategy Session"
    },
    content: {
      challenge: "Managing media strategies for 10+ companies across multiple industries simultaneously while needing to prove measurable ROI.",
      solution: "Created editorial calendars for 4 internal and 12 client brands. Conducted keyword/SEO audits and established an attribution model to track performance.",
      result: "Improved organic search visibility and outperformed competitors in search rankings. Successfully led a team of copywriters and designers for cohesive execution."
    }
  },
  {
    id: '4',
    slug: 'shaks-world',
    company: "Shak's World Assoc.",
    role: 'Digital Marketing Specialist',
    period: 'Sep 2020 - Feb 2022',
    stat: '30% Engagement',
    description: 'Leading organic content campaigns and SEO optimization.',
    image: {
      url: '/images/shakworld-event.jpg',
      alt: "Shak's World Association"
    },
    content: {
      challenge: "The need to increase engagement and improve web presence to drive visitor growth for the association.",
      solution: "Led an organic content campaign utilizing effective graphics and video. Developed an SEO-optimized website focused on search ranking improvement.",
      result: "Increased Instagram engagement by 30% through content strategies and achieved 10% weekly growth in visitors via the new website."
    }
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  { school: "Scrum Alliance", degree: "Certified Scrum Product Owner (CSPO)", year: "2024 - 2026" },
  { school: "Canon Canada", degree: "Canon Futures Creator", year: "2023 - 2024" },
  { school: "Google Academy", degree: "Advanced Google Analytics", year: "2020 - 2024" },
  { school: "Our Wave Hub", degree: "No-Code & Marketing Fundamentals", year: "2022" },
  { school: "York University", degree: "Communications & Social Science", year: "2016 - 2021" }
];

export const SKILLS_DATA: SkillCategory[] = [
  { category: "Creative", skills: ["Creative Direction", "Visual Storytelling", "Content Strategy", "Content Development", "Photography", "Videography", "Film Production", "Photo & Video Editing"] },
  { category: "Production", skills: ["Production Management", "Campaign Execution", "Gallery Showcase Production", "Brand Identity"] },
  { category: "AI & Tech", skills: ["AI-Assisted Web Development", "AI for Database Management", "Data Schema Creation", "AI User Testing", "Product Research", "Prompt Engineering"] },
  { category: "Strategy", skills: ["Marketing Communications", "Audience Development", "Partnership Execution", "Grant Writing"] },
  { category: "Technical", skills: ["HTML5", "CSS", "WordPress", "Webflow", "Elementor", "JavaScript", "Google Apps Script"] },
  { category: "Platforms", skills: ["Mailchimp", "Google Analytics", "Adobe Creative Cloud", "Hootsuite", "Salesforce"] },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    slug: 'neon-dreams',
    title: 'Neon Dreams',
    category: FilterCategory.FILM,
    year: 2025,
    client: 'Personal',
    thumbnail: {
      url: ASSETS.tokyoNight,
      alt: "Neon Dreams Thumbnail"
    },
    description: 'A study of light and shadow in Tokyo.',
    gallery: [
      { url: ASSETS.tokyoNight, alt: "Tokyo Street" },
      { url: "https://picsum.photos/id/12/1200/800", alt: "Night Rain" }
    ]
  },
  {
    id: 'p2',
    slug: 'concrete-jungle',
    title: 'Concrete Jungle',
    category: FilterCategory.ARCHITECTURE,
    year: 2024,
    client: 'Architectural Digest',
    thumbnail: {
      url: ASSETS.brutalist,
      alt: "Concrete Jungle Thumbnail"
    },
    description: 'Brutalist structures in the heart of London.',
    gallery: [
      { url: ASSETS.brutalist, alt: "Barbican Centre" },
      { url: "https://picsum.photos/id/16/1200/800", alt: "Abstract Concrete" }
    ]
  },
  {
    id: 'p3',
    slug: 'silent-portraits',
    title: 'Silent Portraits',
    category: FilterCategory.FACES,
    year: 2024,
    client: 'Vogue Italia',
    thumbnail: {
      url: ASSETS.textureGrain,
      alt: "Silent Portraits Thumbnail"
    },
    description: 'Editorial portraits focusing on unspoken emotions.',
    gallery: [
      { url: ASSETS.textureGrain, alt: "Portrait 1" },
      { url: "https://picsum.photos/id/19/1200/800", alt: "Portrait 2" }
    ]
  },
  {
    id: 'p4',
    slug: 'nike-kinetic',
    title: 'Kinetic Energy',
    category: FilterCategory.CLIENT,
    year: 2023,
    client: 'Nike',
    thumbnail: {
      url: ASSETS.shadowPlay,
      alt: "Nike Kinetic Thumbnail"
    },
    description: 'Campaign for the new Air Max line.',
    gallery: [
      { url: ASSETS.shadowPlay, alt: "Motion Blur" },
      { url: "https://picsum.photos/id/22/1200/800", alt: "Product Shot" }
    ]
  },
  {
    id: 'p5',
    slug: 'desert-mirage',
    title: 'Desert Mirage',
    category: FilterCategory.FILM,
    year: 2023,
    client: 'Personal',
    thumbnail: {
      url: "https://picsum.photos/id/23/600/800",
      alt: "Desert Mirage Thumbnail"
    },
    description: 'Short film stills from the Nevada desert.',
    gallery: [
      { url: "https://picsum.photos/id/24/1200/800", alt: "Dunes" }
    ]
  },
  {
    id: 'p6',
    slug: 'glass-house',
    title: 'The Glass House',
    category: FilterCategory.ARCHITECTURE,
    year: 2022,
    client: 'Private Client',
    thumbnail: {
      url: "https://picsum.photos/id/25/600/800",
      alt: "Glass House Thumbnail"
    },
    description: 'Modern residential photography.',
    gallery: [
      { url: "https://picsum.photos/id/26/1200/800", alt: "Interior" }
    ]
  }
];

export const VENTURES: Venture[] = [
  {
    id: 'v1',
    slug: 'lotus',
    name: 'Lotus Media',
    role: 'Founder & Creative Director',
    description: 'Lotus Media is a full-service creative production company offering photography, video, design, and web services. Clients include University of Toronto Varsity Blues, Liberal Party of Canada, Virtual Reality Toronto, Canadian Film Centre, Oya Black Arts Coalition, TIFF, Canadian Screen Awards, and Nigerian talent Saga Adilulu, Stan Izzy, Some Kelly, and Yhanha.',
    image: {
      url: ASSETS.abstractBlur,
      alt: "Lotus Media Branding"
    },
    link: 'https://lotusmedia.example.com'
  },
  {
    id: 'v2',
    slug: 'rosse',
    name: 'ROSSE Creative Collective',
    role: 'Co-Founder',
    description: 'ROSSE Creative Collective is a Toronto-based collective built to empower creatives locally and globally. We produce gallery showcases, host creative sessions, and build community across disciplines. Our Breaking the Glass Ceiling showcase received 60 to 70 plus applicants at Capsul Studio in November 2024.',
    image: {
      url: "https://picsum.photos/id/31/800/1000",
      alt: "ROSSE Lifestyle"
    },
    link: 'https://rosse.example.com'
  },
  {
    id: 'v3',
    slug: 'shaks-world',
    name: "Shak's World Assoc.",
    role: 'Digital Marketing Specialist',
    // DESCRIPTION PLACEHOLDER — update with actual Shak's World description
    description: 'DESCRIPTION PLACEHOLDER: Add full description for Shak\'s World Association here.',
    image: {
      url: '/images/shakworld-event.jpg',
      alt: "Shak's World Association Event"
    },
    link: ''
  }
];

export const JOURNAL: JournalEntry[] = [
  {
    id: 'j1',
    slug: 'development-in-film',
    title: 'Development in Film',
    date: 'Oct 12, 2024',
    category: 'Photography Notes',
    excerpt: 'Why analog processes still matter in a digital age.',
    content: "There is a deliberate slowness to film that forces intention. In a world of rapid-fire shutter speeds, waiting for the development process is an act of faith...",
    coverImage: {
      url: ASSETS.textureGrain,
      alt: "Film Grain Texture"
    }
  },
  {
    id: 'j2',
    slug: 'building-this-app',
    title: 'Building The Infinite Archive',
    date: 'Sep 05, 2024',
    category: 'Life',
    excerpt: 'Transitioning from designer to engineer using React and AI.',
    content: "The challenge wasn't just writing the code; it was translating a feeling. How do you make a website feel like a physical space? We used liquid motion...",
    coverImage: {
      url: "https://picsum.photos/id/2/800/600",
      alt: "Code Screen"
    }
  },
  {
    id: 'j3',
    slug: 'faith-and-creativity',
    title: 'Faith & Creativity',
    date: 'Aug 21, 2024',
    category: 'Faith',
    excerpt: 'Where the spiritual meets the artistic.',
    content: "I believe creativity is a divine attribute. When we create, we are echoing the first act of creation. It's not just about aesthetics; it's about truth...",
    coverImage: {
      url: "https://picsum.photos/id/3/800/600",
      alt: "Sky"
    }
  },
  // --- NEW POSTS (2026-04-20) ---
  {
    id: 'j4',
    slug: 'creative-direction-starts-with-research',
    title: 'Creative Direction Starts With Research',
    date: '2026-04-20',
    category: 'Creative Essays',
    excerpt: 'Most creative direction writing talks about vision and taste. Those things matter, but they are downstream of two harder disciplines.',
    content: `Most creative direction writing talks about vision and taste. Those things matter, but they are downstream of two harder disciplines. Knowing how execution actually works, from having done it. And knowing how the subject matter has been tackled before, so you enter the conversation with something new to say.

The research paper analogy is the one I keep coming back to. Before you write a paper, you need to know the discourse. You read what came before. You map the arguments. You figure out where your voice fits. If you skip that step, you end up restating what has already been said with slightly different words. The same logic applies to a campaign.

When I am directing work in a category, I want to know the history of that category. Who has done this before. What worked. What became cliche. What the audience has already seen five hundred times. Without that context, you end up proposing ideas that feel fresh to you and tired to everyone else.

This is where the execution side comes in. Because I have spent years in Adobe Suite, shot on Canon, built websites, cut video, written copy, my feedback lands differently. I know what is possible and what is not. I know when a timeline is unrealistic because I have stayed up doing that exact job. I know when a designer is hiding behind a trend instead of solving the brief. I can read a creative deck and spot the thinking that is load-bearing versus the thinking that is decoration.

My photography reference points are Wong Kar-wai, Nan Goldin, Todd Hido, Mara Leite, Andre Wagner. I did not land on those names by accident. I studied the tradition I wanted to enter. When I shoot a portrait, I know what Goldin did with intimacy and what Wagner does with Black subjects on the street. That knowledge is what lets me make something that feels like mine and not like a mood board with my name on it.

Creative direction that skips research produces work that looks competent and says nothing. Creative direction that skips execution knowledge produces briefs that sound smart and fall apart on set. The job is holding both.

If you are leading a creative team and you are not reading the history of your medium, you are directing on vibes. If you are leading a creative team and you have never produced the work yourself, your briefs will stay one layer too abstract to be useful. The people actually making the thing will fill in the blanks, and the output will drift.

Taste is real. Vision matters. But they only translate into work when the person holding them knows the craft and knows the canon. Everything else is just opinion with a title attached.`,
  },
  {
    id: 'j5',
    slug: 'building-a-brand-arc-across-years-the-cfc-case',
    title: 'Building a Brand Arc Across Years: The CFC Case',
    date: '2026-04-20',
    category: 'Marketing',
    excerpt: 'Creative direction is the translation layer between business strategy and brand expression. That is the job. Everything else is finishing work.',
    content: `Creative direction is the translation layer between business strategy and brand expression. That is the job. Everything else is finishing work.

Two years at the Canadian Film Centre taught me what that translation actually looks like when it holds across campaigns and scales beyond a single event.

Decades, 2024. The CFC was launching a rebrand. The strategic need was to anchor the organization in legacy while signalling evolution. Norman Jewison's impact on generations of Canadian filmmakers was the obvious throughline, but the creative challenge was expressing time itself. How do you design a campaign that feels like it spans eras without looking like a history project.

Every choice routed through that brief. Typography that could sit across decades. A visual language that referenced film history without becoming pastiche. Print collateral that honoured the people Jewison shaped. The Gala was not a standalone event. It was the launch vehicle for how the CFC would talk about itself going forward.

Growing Futures, 2025. The strategic need shifted. The organization needed continuity, and needed to communicate its role as a developer of talent. I built a botanical analogy that framed CFC as nurturer, growing the next generation of Canadian filmmakers.

The brief was a Gala theme. The output was a full year brand framework. Key artwork, step and repeat, flyers, digital screens, partner ad templates, auction platform design, script contributions, narrative consistency throughout event night. Every touchpoint extended from the same identity because the strategic direction demanded coherence across the year.

Homecoming, 2025. TIFF was the setting. The strategic need was visibility at the world's most prominent film festival. The creative move was extending the Growing Futures design system into an event that carved out space for Canadian stories inside a global moment. Orange and coral warmth. Floral signage. Branded merch. Red carpet media. Same story, scaled for a bigger stage.

The pattern across all three campaigns is consistent. I started with the strategic need. I asked what the organization actually had to accomplish. Then I found a creative idea that could carry that weight without collapsing into it.

Most campaign briefs treat strategy and creative as sequential. Strategy defines the box. Creative fills the box. That model produces work that feels obedient and forgettable.

The better model is concurrent. The strategy shapes the creative. The creative pressures the strategy. A good concept can expose weaknesses in a business plan. A good business need can sharpen a creative idea that was too loose. You want both sides talking until the output feels inevitable.

A brand arc across years is not about sticking to a single visual system. It is about every campaign serving a real goal and still belonging to the same family. The visual system is downstream of that alignment.`,
  },
  {
    id: 'j6',
    slug: 'building-from-zero-creative-operations-behind-rosse',
    title: 'Building From Zero: Creative Operations Behind ROSSE',
    date: '2026-04-20',
    category: 'Announcements',
    excerpt: 'I founded ROSSE Creative Collective in 2024 to empower creatives locally and globally. The creative work mattered. The operational work was what made it possible.',
    content: `I founded ROSSE Creative Collective in 2024 to empower creatives locally and globally. Breaking the Glass Ceiling was the first major output. Capsul Studio. November 2024. A gallery showcase that brought photographers, filmmakers, and visual artists into the same room.

The creative work mattered. The operational work was what actually made it possible.

When I talk about creative direction on ROSSE, people assume I mean the visual choices. The colour palette, the curation, the event design. Those choices were real and I made most of them. But the work that determined whether the event happened at all was the infrastructure I built so other people could execute without needing me in the loop for every decision.

Start with the brand system. I contracted a designer based in Qatar to develop the identity. The brief I wrote for that engagement had to carry context across time zones, across cultures, and across a lot of unspoken assumptions about what ROSSE was supposed to feel like. I could not be in the room. I could not sketch on a whiteboard. The brief had to stand on its own.

That experience taught me something I have carried forward. A creative brief is a piece of infrastructure. It is not a marketing document. It is the load-bearing structure that determines whether the work gets made correctly when you are not there.

Once the identity came back, the next job was turning it into a social asset system. Templates. Frames. Post formats. Story layouts. Each one built so my community manager could produce content without needing to rebuild the wheel every time. She was not a designer. She did not need to be. The system did the design work. She did the creative work.

This is what I mean when I say creative direction is really creative operations. You are not just directing the output. You are directing the conditions that produce the output. The brief, the templates, the system, the handoff points, the quality bar. All of that has to be designed with the same care you would give a hero image.

When a team is small and distributed, the creative director who cannot build infrastructure becomes a bottleneck. Every decision routes through them. Every asset waits on their approval. The work slows to the speed of their inbox.

The creative director who can build infrastructure disappears from the critical path. The team moves. The work ships. The voice stays intact because the voice lives in the system, not in any single person's approval queue.

Breaking the Glass Ceiling received 60-70 plus applications. We handled curation, logistics, volunteer coordination, collateral, and community outreach with a team that could act without me hovering. That was possible because the operational work happened before the creative work. The system existed. Everyone knew where the assets lived, what the standards were, and how to execute without breaking the brand.

ROSSE taught me that a creative collective is a test of whether you can actually build the conditions for other people to do their best work. It is a much harder test than making the work yourself.`,
  },
  {
    id: 'j7',
    slug: 'photographing-black-skin-with-direction',
    title: 'Photographing Black Skin With Direction',
    date: '2026-04-20',
    category: 'Photography Notes',
    excerpt: 'Canon Canada named me a Top 20 Creator in 2023 and 2024. The recognition was for photography, but the work behind it was almost entirely creative direction.',
    content: `Canon Canada named me a Top 20 Creator in 2023 and 2024. The recognition was for photography, but the work behind it was almost entirely creative direction.

Most conversations about photographing Black skin focus on technical fundamentals. Lighting ratios, exposure, white balance, post-processing decisions. All of that matters and all of it is solvable. The harder conversation is about direction. What you are actually asking the person in front of the camera to do, and what you are actually trying to capture.

My approach starts with a refusal. I am not interested in typical posing. I am not looking for the standard three-quarter turn, the hand on the hip, the performative smile. Those poses exist to make subjects look like content. I want to make them look like themselves.

That distinction shows up in every direction I give on set. When I am shooting a portrait, I am not choreographing a pose. I am having a conversation and watching for the moments when the person stops performing. The direction I am giving is usually not about the body. It is about attention. Where are they looking. What are they thinking about. What just happened that made their face change.

For Black subjects specifically, this matters more. So much photography of Black people flattens them into aesthetic objects. Beautiful lighting, beautiful skin, zero interior life. The frame treats the subject like a surface. Direction is the tool that prevents that. If I am directing well, the person in front of me is never just a texture. They are a presence.

The technical work supports the direction. I light for skin tones that hold depth. I shoot in formats that preserve detail in darker values. I edit with restraint because most post-processing decisions in mainstream photography are calibrated for lighter skin and flatten everything else. Those choices are important. But they are in service of the direction, not a substitute for it.

On set, the brief is happening in real time. I am not handing someone a mood board and asking them to match it. I am reading what they bring into the room and shaping the shoot around it. A headshot and a portrait are almost the same technically. The difference is entirely about direction. A headshot asks someone to look professional. A portrait asks someone to be themselves while the camera is on.

The Canon recognition came from a body of work that included portraits, headshots, group photography, and event coverage. The thread across all of it was the same. I was directing first and photographing second. The camera was a tool for capturing what the direction produced.

People ask how to get better at photographing Black skin. The technical answers are on YouTube. The better answer is to take the direction more seriously than the lighting. Know who you are photographing. Know what you want them to feel. Make the set a place where that feeling can actually happen. The image will follow.`,
  },
];
