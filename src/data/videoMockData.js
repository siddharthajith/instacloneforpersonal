const HOUR = 3600000
const DAY = 86400000
const now = Date.now()

const img = (seed, w = 1280, h = 720) => `https://picsum.photos/seed/${seed}/${w}/${h}`
const portrait = (seed) => `https://picsum.photos/seed/${seed}/720/1280`
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const VIDEO_SOURCES = {
  bunny: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  escapes: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  fun: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  joyrides: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  blazes: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  meltdowns: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  idris: asset('videos/IdrisVideo1.mp4'),
}

export const VIDEO_CATEGORIES = [
  'All', 'Technology', 'Filmmaking', 'Education', 'Coding', 'Design',
  'Productivity', 'Documentaries', 'Artificial Intelligence', 'Recently Uploaded',
]

export const PROJECT_ASCEND_ID = 'project-ascend'

export const channels = [
  {
    id: PROJECT_ASCEND_ID,
    name: 'Project Ascend',
    handle: '@ProjectAscend',
    avatar: img('pa-avatar', 400, 400),
    banner: img('pa-banner', 2560, 424),
    verified: true,
    subscribers: 12400,
    description:
      'Project Ascend is a student-led creative studio exploring technology, filmmaking, artificial intelligence, and innovation. We document our journey from classroom concepts to competition-ready products — sharing tutorials, behind-the-scenes footage, and the lessons we learn along the way.',
    joined: now - 400 * DAY,
  },
  {
    id: 'tech-forward',
    name: 'Tech Forward Lab',
    handle: '@TechForwardLab',
    avatar: img('tfl-avatar', 400, 400),
    banner: img('tfl-banner', 2560, 424),
    verified: false,
    subscribers: 3200,
    description: 'Hands-on technology experiments and student innovation projects.',
    joined: now - 200 * DAY,
  },
]

const sources = Object.values(VIDEO_SOURCES)

function makeVideo(id, channelId, title, description, opts = {}) {
  const daysAgo = opts.daysAgo ?? 7
  const idx = opts.sourceIdx ?? 0
  const src = opts.src ?? sources[idx % sources.length]
  const thumb = opts.thumbnail ?? img(`thumb-${id}`, 1280, 720)
  return {
    id,
    channelId,
    type: 'video',
    title,
    description,
    thumbnail: thumb,
    poster: opts.poster ?? thumb,
    src,
    duration: opts.duration ?? 612,
    views: opts.views ?? 8400,
    likes: opts.likes ?? 420,
    dislikes: opts.dislikes ?? 12,
    timestamp: now - daysAgo * DAY,
    category: opts.category ?? 'Technology',
    tags: opts.tags ?? ['project ascend', 'students', 'technology'],
    comments: opts.comments ?? [],
    featured: opts.featured ?? false,
    trailer: opts.trailer ?? false,
  }
}

function makeShort(id, channelId, title, caption, opts = {}) {
  const daysAgo = opts.daysAgo ?? 3
  const idx = opts.sourceIdx ?? 1
  return {
    id,
    channelId,
    type: 'short',
    title,
    caption,
    description: caption,
    thumbnail: portrait(`short-${id}`),
    poster: portrait(`short-${id}`),
    src: sources[idx % sources.length],
    duration: opts.duration ?? 30,
    views: opts.views ?? 12000,
    likes: opts.likes ?? 890,
    timestamp: now - daysAgo * DAY,
    category: opts.category ?? 'Technology',
    audio: opts.audio ?? 'Original audio — Project Ascend',
    tags: opts.tags ?? ['shorts', 'project ascend'],
    comments: [],
  }
}

export const videos = [
  makeVideo('v-pa-1', PROJECT_ASCEND_ID, 'Building Our First AI-Powered Student Platform',
    'We walk through the full process of designing and building an AI-powered platform for students — from initial wireframes to a working prototype that handles real user input.',
    { daysAgo: 2, duration: 1248, views: 28400, likes: 1820, category: 'Artificial Intelligence', featured: true, sourceIdx: 0 }),
  makeVideo('v-pa-2', PROJECT_ASCEND_ID, 'Behind the Scenes of a School Media Production',
    'Go behind the camera with our team as we plan, shoot, and edit a school media production from first meeting to final export.',
    { daysAgo: 5, duration: 892, views: 15600, likes: 940, category: 'Filmmaking', sourceIdx: 1 }),
  makeVideo('v-pa-3', PROJECT_ASCEND_ID, 'How We Designed a Modern Portfolio Website',
    'A complete breakdown of our portfolio redesign — typography choices, layout systems, responsive breakpoints, and the tools we used.',
    { daysAgo: 8, duration: 1044, views: 22100, likes: 1310, category: 'Design', sourceIdx: 2 }),
  makeVideo('v-pa-4', PROJECT_ASCEND_ID, 'Turning an Idea Into a Working Prototype',
    'From sticky notes on a whiteboard to a clickable prototype — here is how we validated our concept before writing production code.',
    { daysAgo: 12, duration: 756, views: 9800, likes: 620, category: 'Productivity', sourceIdx: 3 }),
  makeVideo('v-idris-1', PROJECT_ASCEND_ID, 'IdrisVideo1',
    'Original upload — IdrisVideo1. Tap to play the full clip.',
    {
      daysAgo: 3,
      duration: 63,
      views: 1250,
      likes: 94,
      category: 'Filmmaking',
      src: VIDEO_SOURCES.idris,
      thumbnail: asset('videos/IdrisVideo1-thumb.jpg'),
      poster: asset('videos/IdrisVideo1-thumb.jpg'),
      tags: ['idris', 'project ascend', 'filmmaking'],
    }),
  makeVideo('v-pa-5', PROJECT_ASCEND_ID, 'Creating a Cinematic Competition Presentation',
    'Our step-by-step approach to building a competition presentation that feels cinematic, confident, and memorable.',
    { daysAgo: 15, duration: 1104, views: 31200, likes: 2100, category: 'Filmmaking', sourceIdx: 4 }),
  makeVideo('v-pa-6', PROJECT_ASCEND_ID, 'Building a Smart Retail Analytics System',
    'We built a retail analytics dashboard that tracks inventory trends and customer patterns — here is the architecture and demo.',
    { daysAgo: 18, duration: 1332, views: 18700, likes: 1100, category: 'Technology', sourceIdx: 5 }),
  makeVideo('v-pa-7', PROJECT_ASCEND_ID, 'Our Journey From Concept to Final Product',
    'Six months of development condensed into one honest documentary about what it really takes to ship a student project.',
    { daysAgo: 22, duration: 1848, views: 42000, likes: 3200, category: 'Documentaries', trailer: true, sourceIdx: 0 }),
  makeVideo('v-pa-8', PROJECT_ASCEND_ID, 'How Students Can Start Learning Artificial Intelligence',
    'A practical roadmap for students who want to begin learning AI — resources, projects, and mistakes to avoid early on.',
    { daysAgo: 25, duration: 948, views: 35600, likes: 2400, category: 'Education', sourceIdx: 1 }),
  makeVideo('v-pa-9', PROJECT_ASCEND_ID, 'Designing a Social Media Platform From Scratch',
    'We share the design decisions behind building a social platform — navigation, feeds, profiles, and the trade-offs we made.',
    { daysAgo: 30, duration: 1420, views: 27300, likes: 1680, category: 'Coding', sourceIdx: 2 }),
  makeVideo('v-pa-10', PROJECT_ASCEND_ID, 'A Week Inside Project Ascend',
    'Seven days of filming inside our studio — meetings, coding sessions, editing marathons, and the moments in between.',
    { daysAgo: 35, duration: 1560, views: 19800, likes: 1450, category: 'Documentaries', sourceIdx: 3 }),
  makeVideo('v-tf-1', 'tech-forward', 'Rapid Prototyping with Modern Web Tools',
  'A quick tour of the tools we use to prototype web applications in under a weekend.',
    { daysAgo: 10, duration: 540, views: 4200, likes: 210, category: 'Coding', sourceIdx: 4 }),
]

export const shorts = [
  makeShort('s-pa-1', PROJECT_ASCEND_ID, '30 Seconds of Our Latest Project',
    'A quick look at what we shipped this week.', { daysAgo: 1, duration: 30, views: 45000, likes: 3200 }),
  makeShort('s-pa-2', PROJECT_ASCEND_ID, 'Before and After the Website Redesign',
    'The transformation speaks for itself.', { daysAgo: 4, duration: 28, views: 38000, likes: 2800 }),
  makeShort('s-pa-3', PROJECT_ASCEND_ID, 'How We Shot This Cinematic Scene',
    'One lighting setup that changed everything.', { daysAgo: 6, duration: 32, views: 29000, likes: 2100 }),
  makeShort('s-pa-4', PROJECT_ASCEND_ID, 'The Code That Fixed Everything',
    'Sometimes the solution is embarrassingly simple.', { daysAgo: 9, duration: 25, views: 52000, likes: 4100 }),
  makeShort('s-pa-5', PROJECT_ASCEND_ID, 'One Editing Trick Every Student Should Know',
    'This cut technique saves hours in post-production.', { daysAgo: 11, duration: 35, views: 34000, likes: 2600 }),
]

export const playlists = [
  {
    id: 'pl-pa-1', channelId: PROJECT_ASCEND_ID, title: 'Project Ascend Originals',
    description: 'Our flagship series documenting major projects from start to finish.',
    thumbnail: img('pl-pa-1', 640, 360), videoIds: ['v-pa-1', 'v-pa-7', 'v-pa-10'], visibility: 'public',
  },
  {
    id: 'pl-pa-2', channelId: PROJECT_ASCEND_ID, title: 'Student Technology Projects',
    description: 'Technology builds, prototypes, and system demos from our studio.',
    thumbnail: img('pl-pa-2', 640, 360), videoIds: ['v-pa-1', 'v-pa-6', 'v-pa-9'], visibility: 'public',
  },
  {
    id: 'pl-pa-3', channelId: PROJECT_ASCEND_ID, title: 'Filmmaking Behind the Scenes',
    description: 'Camera work, editing workflows, and production breakdowns.',
    thumbnail: img('pl-pa-3', 640, 360), videoIds: ['v-pa-2', 'v-pa-5'], visibility: 'public',
  },
  {
    id: 'pl-pa-4', channelId: PROJECT_ASCEND_ID, title: 'Coding and AI Tutorials',
    description: 'Step-by-step tutorials for students learning to code and explore AI.',
    thumbnail: img('pl-pa-4', 640, 360), videoIds: ['v-pa-8', 'v-pa-9'], visibility: 'public',
  },
  {
    id: 'pl-pa-5', channelId: PROJECT_ASCEND_ID, title: 'Website Development',
    description: 'Design and development walkthroughs for modern websites.',
    thumbnail: img('pl-pa-5', 640, 360), videoIds: ['v-pa-3', 'v-pa-9'], visibility: 'public',
  },
  {
    id: 'pl-pa-6', channelId: PROJECT_ASCEND_ID, title: 'Productivity for Students',
    description: 'Workflows, planning methods, and tools that help students ship faster.',
    thumbnail: img('pl-pa-6', 640, 360), videoIds: ['v-pa-4', 'v-pa-10'], visibility: 'public',
  },
]

export const videoNotifications = [
  { id: 'vn-1', type: 'upload', channelId: PROJECT_ASCEND_ID, videoId: 'v-pa-1', text: 'Project Ascend uploaded: Building Our First AI-Powered Student Platform', timestamp: now - 2 * DAY, platform: 'video' },
  { id: 'vn-2', type: 'reply', channelId: PROJECT_ASCEND_ID, videoId: 'v-pa-3', text: 'Project Ascend replied to your comment', timestamp: now - DAY, platform: 'video' },
  { id: 'vn-3', type: 'subscriber', channelId: PROJECT_ASCEND_ID, text: 'You gained a new subscriber on your channel', timestamp: now - 3 * DAY, platform: 'video' },
  { id: 'vn-4', type: 'milestone', channelId: PROJECT_ASCEND_ID, videoId: 'v-pa-5', text: 'Your video reached 30,000 views', timestamp: now - 5 * DAY, platform: 'video' },
  { id: 'vn-5', type: 'live', channelId: PROJECT_ASCEND_ID, text: 'Project Ascend is going live soon: Studio Q&A Session', timestamp: now - 6 * HOUR, platform: 'video' },
  { id: 'vn-6', type: 'community', channelId: PROJECT_ASCEND_ID, text: 'New community post from Project Ascend', timestamp: now - 12 * HOUR, platform: 'video' },
]

export const seedComments = {
  'v-pa-1': [
    { id: 'c1', userId: 'ext-1', author: 'Alex Chen', avatar: img('alex', 100, 100), text: 'This is exactly the kind of content students need. Clear, practical, and inspiring.', timestamp: now - DAY, likes: 42, dislikes: 0, pinned: true, hearted: true, replies: [
      { id: 'c1r1', userId: PROJECT_ASCEND_ID, author: 'Project Ascend', avatar: img('pa-avatar', 100, 100), text: 'Thank you Alex — we really appreciate the support!', timestamp: now - DAY + 3600000, likes: 18, dislikes: 0 },
    ]},
    { id: 'c2', userId: 'ext-2', author: 'Maya Rodriguez', avatar: img('maya-v', 100, 100), text: 'The architecture section at 8:42 was incredibly helpful. Subscribed!', timestamp: now - 2 * DAY, likes: 28, dislikes: 1, replies: [] },
    { id: 'c3', userId: 'ext-3', author: 'Jordan Lee', avatar: img('jordan', 100, 100), text: 'How long did the prototype phase take? We are starting something similar at our school.', timestamp: now - 3 * DAY, likes: 15, dislikes: 0, replies: [
      { id: 'c3r1', userId: PROJECT_ASCEND_ID, author: 'Project Ascend', avatar: img('pa-avatar', 100, 100), text: 'About three weeks from first sketch to working demo. Happy to share our timeline doc!', timestamp: now - 2 * DAY, likes: 9, dislikes: 0 },
    ]},
  ],
  'v-pa-3': [
    { id: 'c4', userId: 'ext-4', author: 'Samira Khan', avatar: img('samira', 100, 100), text: 'The typography choices are spot on. What font pairing did you use?', timestamp: now - 4 * DAY, likes: 22, dislikes: 0, replies: [] },
  ],
}

export const allVideoContent = [...videos, ...shorts]

export function getChannel(id) {
  return channels.find((c) => c.id === id)
}

export function getVideo(id) {
  return allVideoContent.find((v) => v.id === id)
}

export function getPlaylist(id) {
  return playlists.find((p) => p.id === id)
}

export function getChannelVideos(channelId, type = 'video') {
  return allVideoContent.filter((v) => v.channelId === channelId && (type === 'all' || v.type === type))
}

export function getPlaylistVideos(playlistId) {
  const pl = getPlaylist(playlistId)
  if (!pl) return []
  return pl.videoIds.map(getVideo).filter(Boolean)
}

export function getPlaylistDuration(playlistId) {
  return getPlaylistVideos(playlistId).reduce((sum, v) => sum + (v?.duration ?? 0), 0)
}

export function searchVideoContent(query) {
  const q = query.trim().toLowerCase()
  if (!q) return { channels: [], videos: [], shorts: [], playlists: [] }
  const match = (text) => text.toLowerCase().includes(q)
  return {
    channels: channels.filter((c) => match(c.name) || match(c.handle) || match(c.description)),
    videos: videos.filter((v) => match(v.title) || match(v.description) || v.tags.some(match)),
    shorts: shorts.filter((v) => match(v.title) || match(v.caption) || v.tags.some(match)),
    playlists: playlists.filter((p) => match(p.title) || match(p.description)),
  }
}

export function getRecommendedVideos(videoId, limit = 12) {
  const current = getVideo(videoId)
  const sameChannel = allVideoContent.filter((v) => v.id !== videoId && v.channelId === PROJECT_ASCEND_ID)
  const others = allVideoContent.filter((v) => v.id !== videoId && v.channelId !== PROJECT_ASCEND_ID)
  const pool = current?.channelId === PROJECT_ASCEND_ID
    ? [...sameChannel, ...others]
    : [...sameChannel, ...allVideoContent.filter((v) => v.id !== videoId && v.channelId === current?.channelId), ...others]
  return pool.slice(0, limit)
}
