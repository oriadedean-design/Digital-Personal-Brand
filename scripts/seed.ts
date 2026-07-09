// One-time seed: pushes real, already-verified content into Sanity so the
// site is CMS-driven from day one. Only facts explicitly provided by Dean are
// included here — nothing is invented. Safe to re-run (uses fixed doc IDs and
// createOrReplace, so it updates rather than duplicates).
import { createClient } from '@sanity/client';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ABOUT_FALLBACK } from '../src/lib/aboutFallback';

try {
  process.loadEnvFile('.env.local');
} catch {
  // .env.local not found — fall back to whatever is already in the environment
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name} (see .env.example)`);
    process.exit(1);
  }
  return value;
}

const projectId = requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID');
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = requireEnv('SANITY_WRITE_TOKEN');

const client = createClient({ projectId, dataset, token, apiVersion: '2024-03-23', useCdn: false });

let key = 0;
function nextKey() {
  key += 1;
  return `k${key}`;
}

// Converts plain paragraphs (separated by blank lines) into Portable Text blocks.
function toPortableText(text: string) {
  return text
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((paragraph) => ({
      _type: 'block',
      _key: nextKey(),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: nextKey(), text: paragraph, marks: [] }],
    }));
}

async function uploadLocalImage(relativePath: string) {
  const filePath = path.join(process.cwd(), 'public', relativePath);
  const buffer = await readFile(filePath);
  const asset = await client.assets.upload('image', buffer, { filename: path.basename(filePath) });
  return { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: asset._id } };
}

async function seedSiteConfig() {
  const cfcImage = await uploadLocalImage('images/cfc-portrait.jpg');

  await client.createOrReplace({
    _id: 'siteConfig',
    _type: 'siteConfig',
    title: 'Dean Oriade',
    about: {
      heading: ABOUT_FALLBACK.heading,
      subtitle: ABOUT_FALLBACK.subtitle,
      location: ABOUT_FALLBACK.location,
      narrative: ABOUT_FALLBACK.narrative,
      gear: ABOUT_FALLBACK.gear,
      education: ABOUT_FALLBACK.education,
      skills: ABOUT_FALLBACK.skills,
      bucketList: ABOUT_FALLBACK.bucketList,
      // portraitImage intentionally left unset — no verified real portrait
      // provided yet. TODO(dean): upload a real portrait in Studio.
    },
    socialLinks: {
      instagram: 'https://www.instagram.com/deanaldo.ca',
      twitter: 'https://x.com/deanaldoca',
      linkedin: 'https://www.linkedin.com/in/semilore-oriade',
      behance: 'https://www.behance.net/deanoriade',
    },
  });

  console.log('✓ siteConfig (about, social links)');
  return { cfcImage };
}

async function seedStrategy(cfcImage: Awaited<ReturnType<typeof uploadLocalImage>>) {
  const obacImage = await uploadLocalImage('images/obac-event.jpg');

  const items: ({ _id: string; _type: string } & Record<string, any>)[] = [
    {
      _id: 'strategy-cfc-marketing',
      _type: 'strategy',
      company: 'Canadian Film Centre',
      slug: { _type: 'slug', current: 'cfc-marketing' },
      role: 'Marketing Manager',
      period: 'Nov 2023 - Aug 2025',
      stat: '$550k+ Raised',
      description: "Driving high-impact campaigns and brand visibility for Canada's leading film institution.",
      image: cfcImage,
      challenge: "To execute brand strategies and high-quality marketing initiatives that align with business goals while managing high-stakes events like the CFC Gala and Homecoming.",
      solution: "Led high-impact advertising campaigns in The Globe and Mail and The Toronto Star. Managed marketing teams for events attended by over 1,000 people and handled Salesforce email marketing for an audience of 10,000.",
      result: "Raised $250k at the CFC Gala and $300k+ at CFC Homecoming 2024. Achieved 20% overbooking for 'CFC Conversation with TD' and maintained a 90% retention rate.",
    },
    {
      _id: 'strategy-oya-coalition',
      _type: 'strategy',
      company: 'OYA Black Arts Coalition',
      slug: { _type: 'slug', current: 'oya-coalition' },
      role: 'Marketing and Communications',
      period: '2021 to 2023',
      stat: '30% CPI Drop',
      description: 'Optimizing paid spend and building strategic partnerships for black arts advocacy.',
      image: obacImage,
      challenge: "To optimize paid marketing spend and build strong support for the mission amidst a need for better audience engagement across digital platforms.",
      solution: "Developed a video content strategy and executed keyword campaigns aligning with SEO objectives. Built strategic partnerships to expand audience reach organically.",
      result: "Reduced Cost Per Install (CPI) by 30% and drove 30% of total channel engagements over six months. Significantly increased organic search traffic.",
    },
    {
      _id: 'strategy-siva-creative',
      _type: 'strategy',
      company: 'SIVA Creative',
      slug: { _type: 'slug', current: 'siva-creative' },
      role: 'Digital Marketing Specialist',
      period: '2020 to 2021',
      stat: '16 Brands',
      description: 'Managing diverse media strategies across multiple industries.',
      // No verified real photo for this role — intentionally left unset
      // rather than reusing a generic stock image.
      challenge: "Managing media strategies for 10+ companies across multiple industries simultaneously while needing to prove measurable ROI.",
      solution: "Created editorial calendars for 4 internal and 12 client brands. Conducted keyword/SEO audits and established an attribution model to track performance.",
      result: "Improved organic search visibility and outperformed competitors in search rankings. Successfully led a team of copywriters and designers for cohesive execution.",
    },
  ];

  for (const item of items) {
    await client.createOrReplace(item);
    console.log(`✓ strategy: ${item.company}`);
  }
}

async function seedBrands() {
  await client.createOrReplace({
    _id: 'brand-lotus-media',
    _type: 'brand',
    name: 'Lotus Media',
    slug: { _type: 'slug', current: 'lotus-media' },
    tagline: 'Video production and creative studio, Toronto.',
    founded: '2019',
    role: 'Founder & Director',
    description: toPortableText(
      'Lotus Media is a video production and creative studio based in Toronto, founded by Dean Oriade in 2019.\n\nClient work includes the full campaign website for a Ward 7 Toronto municipal campaign, built with Next.js, Sanity, and Stripe donations, live at lornaantwi.com.'
    ),
    accomplishments: [
      {
        _key: nextKey(),
        title: 'Ward 7 Toronto Campaign Website',
        detail: 'Full campaign website with Next.js, Sanity, and Stripe donations, live at lornaantwi.com.',
      },
      // TODO(dean): supply 3-5 additional client projects with names, years, and one-line outcomes.
    ],
    instagramUrl: 'https://www.instagram.com/chooselotusmedia/',
  });
  console.log('✓ brand: Lotus Media');

  await client.createOrReplace({
    _id: 'brand-rosse',
    _type: 'brand',
    name: 'ROSSE Creative Collective',
    slug: { _type: 'slug', current: 'rosse' },
    tagline: 'Community organization building infrastructure for Black creatives in Toronto and globally.',
    founded: '2024',
    role: 'Founder',
    description: toPortableText(
      'ROSSE Creative Collective is a community organization building infrastructure for Black creatives in Toronto and globally.\n\nThe collective produced Breaking the Glass Ceiling, a gallery showcase funded by the Toronto Arts Council.'
    ),
    accomplishments: [
      {
        _key: nextKey(),
        title: 'Breaking the Glass Ceiling',
        detail: 'A gallery showcase funded by the Toronto Arts Council.',
      },
      // TODO(dean): supply attendance figures, featured artist count, and press links.
    ],
    instagramUrl: 'https://www.instagram.com/rosse.hub/',
  });
  console.log('✓ brand: ROSSE Creative Collective');
}

async function seedJournal() {
  const entries = [
    {
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

  for (const entry of entries) {
    await client.createOrReplace({
      _id: `journal-${entry.slug}`,
      _type: 'journal',
      title: entry.title,
      slug: { _type: 'slug', current: entry.slug },
      date: entry.date,
      category: entry.category,
      excerpt: entry.excerpt,
      body: toPortableText(entry.content),
      published: true,
    });
    console.log(`✓ journal: ${entry.title}`);
  }
}

async function main() {
  console.log('Seeding real content into Sanity...\n');
  const { cfcImage } = await seedSiteConfig();
  await seedStrategy(cfcImage);
  await seedBrands();
  await seedJournal();
  console.log('\nDone. Review drafts and publish any that need it in Sanity Studio.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
