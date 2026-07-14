const HOUR = 3600000
const DAY = 86400000
const now = Date.now()

const img = (seed, w = 1080, h = 1080) => `https://picsum.photos/seed/${seed}/${w}/${h}`
const avatar = (n) => `https://i.pravatar.cc/300?img=${n}`

const VIDEOS = {
  bunny: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  escapes: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  fun: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  joyrides: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  blazes: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  meltdowns: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
}

export const currentUser = {
  id: 'u0',
  username: 'siddha.jith',
  fullName: 'Siddharth Ajith',
  avatar: avatar(12),
  verified: false,
  bio: 'Building things for the web. Coffee first, code second.\nDubai · always chasing golden hour',
  website: 'siddharth.dev',
  pronouns: 'he/him',
  followers: 1284,
  following: 562,
}

export const users = [
  { id: 'u1', username: 'maya.lenz', fullName: 'Maya Lenz', avatar: avatar(47), verified: true, bio: 'Travel photographer · 34 countries and counting', website: 'mayalenz.photo', followers: 48200, following: 312 },
  { id: 'u2', username: 'kofi_draws', fullName: 'Kofi Mensah', avatar: avatar(59), verified: false, bio: 'Illustrator & muralist. Accra → Lisbon.', website: 'kofidraws.art', followers: 9210, following: 845 },
  { id: 'u3', username: 'elena.runs', fullName: 'Elena Petrova', avatar: avatar(31), verified: false, bio: 'Marathoner in training. 42.2km or bust.', website: '', followers: 3480, following: 501 },
  { id: 'u4', username: 'tomas.eats', fullName: 'Tomás Herrera', avatar: avatar(53), verified: true, bio: 'Chef. Recipes that actually work.', website: 'tomaseats.com', followers: 152000, following: 198 },
  { id: 'u5', username: 'aria.codes', fullName: 'Aria Nakamura', avatar: avatar(44), verified: false, bio: 'Frontend engineer. CSS is a love language.', website: 'aria.dev', followers: 12700, following: 430 },
  { id: 'u6', username: 'jonas.wild', fullName: 'Jonas Berg', avatar: avatar(68), verified: false, bio: 'Wildlife filmmaker for @northtrail.docs', website: '', followers: 27600, following: 274 },
  { id: 'u7', username: 'priya.paints', fullName: 'Priya Sharma', avatar: avatar(26), verified: false, bio: 'Watercolours, mostly. Commissions open.', website: 'priyapaints.shop', followers: 6890, following: 712 },
  { id: 'u8', username: 'leo.streetstyle', fullName: 'Leo Fontaine', avatar: avatar(61), verified: true, bio: 'Street style archive. Paris.', website: '', followers: 89400, following: 156 },
  { id: 'u9', username: 'nadia.plants', fullName: 'Nadia Osei', avatar: avatar(16), verified: false, bio: '83 houseplants and no regrets 🌿', website: '', followers: 4520, following: 388 },
  { id: 'u10', username: 'sam.frames', fullName: 'Sam Whitaker', avatar: avatar(33), verified: false, bio: 'Filmmaker. Frames from things I shoot.', website: 'samframes.co', followers: 15800, following: 267 },
  { id: 'u11', username: 'lucia.bakes', fullName: 'Lucía Moreno', avatar: avatar(20), verified: false, bio: 'Sourdough evangelist. Madrid.', website: '', followers: 7340, following: 529 },
  { id: 'u12', username: 'dev.on.wheels', fullName: 'Devon Clarke', avatar: avatar(65), verified: false, bio: 'Skateboarding + software. Both involve falling.', website: '', followers: 2190, following: 610 },
]

export const allUsers = [currentUser, ...users]
export const getUser = (id) => allUsers.find((u) => u.id === id)
export const getUserByUsername = (username) => allUsers.find((u) => u.username === username)

export const stories = [
  { id: 's1', userId: 'u1', viewed: false, media: img('story-maya', 720, 1280), timestamp: now - 2 * HOUR },
  { id: 's2', userId: 'u4', viewed: false, media: img('story-tomas', 720, 1280), timestamp: now - 3 * HOUR },
  { id: 's3', userId: 'u2', viewed: false, media: img('story-kofi', 720, 1280), timestamp: now - 5 * HOUR },
  { id: 's4', userId: 'u8', viewed: false, media: img('story-leo', 720, 1280), timestamp: now - 6 * HOUR },
  { id: 's5', userId: 'u3', viewed: false, media: img('story-elena', 720, 1280), timestamp: now - 8 * HOUR },
  { id: 's6', userId: 'u9', viewed: true, media: img('story-nadia', 720, 1280), timestamp: now - 12 * HOUR },
  { id: 's7', userId: 'u5', viewed: false, media: img('story-aria', 720, 1280), timestamp: now - 14 * HOUR },
  { id: 's8', userId: 'u11', viewed: true, media: img('story-lucia', 720, 1280), timestamp: now - 18 * HOUR },
  { id: 's9', userId: 'u6', viewed: false, media: img('story-jonas', 720, 1280), timestamp: now - 20 * HOUR },
  { id: 's10', userId: 'u12', viewed: true, media: img('story-devon', 720, 1280), timestamp: now - 22 * HOUR },
]

export const posts = [
  {
    id: 'p1',
    userId: 'u1',
    type: 'carousel',
    media: [
      { type: 'image', src: img('faroe-1', 1080, 1350) },
      { type: 'image', src: img('faroe-2', 1080, 1350) },
      { type: 'image', src: img('faroe-3', 1080, 1350) },
    ],
    aspect: '4/5',
    location: 'Faroe Islands',
    caption: 'Three days of fog, then the clouds finally lifted. Worth every soggy sock.',
    hashtags: ['#faroeislands', '#landscapephotography', '#nordics'],
    likes: 12483,
    timestamp: now - 3 * HOUR,
    comments: [
      { id: 'c1', userId: 'u6', text: 'That second frame is unreal. What lens?', timestamp: now - 2 * HOUR, likes: 24 },
      { id: 'c2', userId: 'u10', text: 'Adding this to the location list immediately', timestamp: now - 1 * HOUR, likes: 8 },
      { id: 'c3', userId: 'u3', text: 'The light in the last one 😍', timestamp: now - 40 * 60000, likes: 3 },
    ],
    totalComments: 214,
  },
  {
    id: 'p2',
    userId: 'u4',
    type: 'image',
    media: [{ type: 'image', src: img('pasta-dish', 1080, 1080) }],
    aspect: '1/1',
    location: 'Mercado de San Miguel, Madrid',
    caption: 'Cacio e pepe with exactly three ingredients, because that is the whole point. Recipe on the site — link in bio.',
    hashtags: ['#pasta', '#simplefood', '#recipeoftheday'],
    likes: 45291,
    timestamp: now - 6 * HOUR,
    comments: [
      { id: 'c4', userId: 'u11', text: 'Made this last week, the toasted pepper step changes everything', timestamp: now - 5 * HOUR, likes: 156 },
      { id: 'c5', userId: 'u9', text: 'Dinner tonight, sorted.', timestamp: now - 4 * HOUR, likes: 12 },
    ],
    totalComments: 892,
  },
  {
    id: 'p3',
    userId: 'u5',
    type: 'image',
    media: [{ type: 'image', src: img('desk-setup', 1080, 1350) }],
    aspect: '4/5',
    location: 'Tokyo, Japan',
    caption: 'New desk setup finally done. The cable management took longer than the actual build, obviously.',
    hashtags: ['#desksetup', '#workspace', '#developerlife'],
    likes: 3862,
    timestamp: now - 10 * HOUR,
    comments: [
      { id: 'c6', userId: 'u12', text: 'What keyboard is that??', timestamp: now - 9 * HOUR, likes: 19 },
      { id: 'c7', userId: 'u2', text: 'Clean. Very clean.', timestamp: now - 7 * HOUR, likes: 5 },
    ],
    totalComments: 148,
  },
  {
    id: 'p4',
    userId: 'u6',
    type: 'video',
    media: [{ type: 'video', src: VIDEOS.escapes, poster: img('wild-video', 1080, 1350) }],
    aspect: '4/5',
    location: 'Svalbard, Norway',
    caption: 'Waited eleven hours in a hide for ninety seconds of this. Would do it again tomorrow.',
    hashtags: ['#wildlife', '#arctic', '#filmmaking'],
    likes: 28904,
    timestamp: now - 14 * HOUR,
    comments: [
      { id: 'c8', userId: 'u1', text: 'The patience this takes. Respect.', timestamp: now - 13 * HOUR, likes: 88 },
    ],
    totalComments: 431,
  },
  {
    id: 'p5',
    userId: 'u2',
    type: 'carousel',
    media: [
      { type: 'image', src: img('mural-1', 1080, 1080) },
      { type: 'image', src: img('mural-2', 1080, 1080) },
      { type: 'image', src: img('mural-3', 1080, 1080) },
      { type: 'image', src: img('mural-4', 1080, 1080) },
    ],
    aspect: '1/1',
    location: 'LX Factory, Lisbon',
    caption: 'Mural finished after two weeks. Swipe for the process — from blank wall to done. Thanks to everyone who brought coffee.',
    hashtags: ['#mural', '#streetart', '#lisbon', '#processvideo'],
    likes: 8317,
    timestamp: now - DAY,
    comments: [
      { id: 'c9', userId: 'u7', text: 'The colour palette on this one is my favourite of yours so far', timestamp: now - 20 * HOUR, likes: 31 },
      { id: 'c10', userId: 'u8', text: 'Walked past it yesterday, photos do not do it justice', timestamp: now - 18 * HOUR, likes: 27 },
    ],
    totalComments: 302,
  },
  {
    id: 'p6',
    userId: 'u3',
    type: 'image',
    media: [{ type: 'image', src: img('run-sunrise', 1080, 1350) }],
    aspect: '4/5',
    location: 'Kadıköy, Istanbul',
    caption: '32km done before most alarms went off. Marathon in six weeks and the legs are finally cooperating.',
    hashtags: ['#marathontraining', '#runnersofglimpse', '#sunriserun'],
    likes: 1547,
    timestamp: now - DAY - 4 * HOUR,
    comments: [
      { id: 'c11', userId: 'u12', text: 'The discipline is insane. Good luck!', timestamp: now - DAY, likes: 9 },
    ],
    totalComments: 64,
  },
  {
    id: 'p7',
    userId: 'u8',
    type: 'image',
    media: [{ type: 'image', src: img('street-fit', 1080, 1350) }],
    aspect: '4/5',
    location: 'Le Marais, Paris',
    caption: 'Spotted outside the gallery opening. Vintage coat, tailored everything else. This is how you do proportions.',
    hashtags: ['#streetstyle', '#parisfashion', '#ootd'],
    likes: 19204,
    timestamp: now - 2 * DAY,
    comments: [
      { id: 'c12', userId: 'u1', text: 'The coat!!', timestamp: now - 2 * DAY + HOUR, likes: 44 },
      { id: 'c13', userId: 'u5', text: 'Need the location of that coat immediately', timestamp: now - 2 * DAY + 2 * HOUR, likes: 21 },
    ],
    totalComments: 267,
  },
  {
    id: 'p8',
    userId: 'u11',
    type: 'carousel',
    media: [
      { type: 'image', src: img('bread-1', 1080, 1080) },
      { type: 'image', src: img('bread-2', 1080, 1080) },
    ],
    aspect: '1/1',
    location: 'Madrid, Spain',
    caption: 'Crumb shot of the week. 78% hydration, 40 hour cold ferment. Swipe for the ear.',
    hashtags: ['#sourdough', '#breadmaking', '#realbread'],
    likes: 4230,
    timestamp: now - 2 * DAY - 6 * HOUR,
    comments: [
      { id: 'c14', userId: 'u4', text: 'That crumb structure is perfect. Well done.', timestamp: now - 2 * DAY, likes: 67 },
    ],
    totalComments: 118,
  },
  {
    id: 'p9',
    userId: 'u9',
    type: 'image',
    media: [{ type: 'image', src: img('plant-shelf', 1080, 1350) }],
    aspect: '4/5',
    location: '',
    caption: 'The monstera finally unfurled leaf number twenty. Yes, I counted. Yes, I have a spreadsheet.',
    hashtags: ['#houseplants', '#monstera', '#plantparent'],
    likes: 987,
    timestamp: now - 3 * DAY,
    comments: [
      { id: 'c15', userId: 'u3', text: 'A spreadsheet 😂 iconic behaviour', timestamp: now - 3 * DAY + HOUR, likes: 14 },
    ],
    totalComments: 43,
  },
  {
    id: 'p10',
    userId: 'u10',
    type: 'video',
    media: [{ type: 'video', src: VIDEOS.joyrides, poster: img('film-frame', 1080, 1080) }],
    aspect: '1/1',
    location: 'Big Sur, California',
    caption: 'Test footage from the coast shoot. Colour graded on the drive home, could not wait.',
    hashtags: ['#filmmaking', '#bigsur', '#colorgrade'],
    likes: 6742,
    timestamp: now - 3 * DAY - 8 * HOUR,
    comments: [
      { id: 'c16', userId: 'u6', text: 'That grade is buttery. LUT or from scratch?', timestamp: now - 3 * DAY, likes: 22 },
    ],
    totalComments: 97,
  },
  {
    id: 'p11',
    userId: 'u7',
    type: 'image',
    media: [{ type: 'image', src: img('watercolor', 1080, 1080) }],
    aspect: '1/1',
    location: 'Jaipur, India',
    caption: 'Commission finished — a client\u2019s grandmother\u2019s house from an old photograph. These are always my favourite ones to paint.',
    hashtags: ['#watercolour', '#commission', '#artistsofglimpse'],
    likes: 2891,
    timestamp: now - 4 * DAY,
    comments: [
      { id: 'c17', userId: 'u2', text: 'The way you handle light in windows is something else', timestamp: now - 4 * DAY + 2 * HOUR, likes: 18 },
    ],
    totalComments: 76,
  },
  {
    id: 'p12',
    userId: 'u12',
    type: 'image',
    media: [{ type: 'image', src: img('skate-spot', 1080, 1350) }],
    aspect: '4/5',
    location: 'Venice Beach, Los Angeles',
    caption: 'New spot unlocked. Only ate concrete twice, which for me is basically a clean session.',
    hashtags: ['#skateboarding', '#veniceskate'],
    likes: 1120,
    timestamp: now - 5 * DAY,
    comments: [
      { id: 'c18', userId: 'u5', text: 'Progress!! 🛹', timestamp: now - 5 * DAY + HOUR, likes: 6 },
    ],
    totalComments: 38,
  },
]

// My own posts for the profile grid
export const myPosts = [
  { id: 'mp1', userId: 'u0', type: 'image', media: [{ type: 'image', src: img('my-coffee', 1080, 1080) }], aspect: '1/1', location: 'Dubai, UAE', caption: 'Third coffee, first good idea.', hashtags: ['#coffee'], likes: 214, timestamp: now - 2 * DAY, comments: [], totalComments: 12 },
  { id: 'mp2', userId: 'u0', type: 'image', media: [{ type: 'image', src: img('my-desert', 1080, 1080) }], aspect: '1/1', location: 'Al Qudra, Dubai', caption: 'Desert run before the heat won.', hashtags: ['#dubai'], likes: 342, timestamp: now - 6 * DAY, comments: [], totalComments: 21 },
  { id: 'mp3', userId: 'u0', type: 'carousel', media: [{ type: 'image', src: img('my-city-1', 1080, 1080) }, { type: 'image', src: img('my-city-2', 1080, 1080) }], aspect: '1/1', location: 'Downtown Dubai', caption: 'City walk, camera in hand.', hashtags: ['#streetphotography'], likes: 189, timestamp: now - 9 * DAY, comments: [], totalComments: 8 },
  { id: 'mp4', userId: 'u0', type: 'image', media: [{ type: 'image', src: img('my-food', 1080, 1080) }], aspect: '1/1', location: '', caption: 'Weekend cooking experiments continue.', hashtags: [], likes: 156, timestamp: now - 12 * DAY, comments: [], totalComments: 5 },
  { id: 'mp5', userId: 'u0', type: 'image', media: [{ type: 'image', src: img('my-beach', 1080, 1080) }], aspect: '1/1', location: 'Kite Beach', caption: 'Golden hour delivered again.', hashtags: ['#goldenhour'], likes: 428, timestamp: now - 15 * DAY, comments: [], totalComments: 19 },
  { id: 'mp6', userId: 'u0', type: 'image', media: [{ type: 'image', src: img('my-code', 1080, 1080) }], aspect: '1/1', location: '', caption: 'Shipped the thing. Sleep now.', hashtags: ['#buildinpublic'], likes: 267, timestamp: now - 20 * DAY, comments: [], totalComments: 14 },
]

export const allPosts = [...posts, ...myPosts]
export const getPost = (id) => allPosts.find((p) => p.id === id)

export const explorePosts = [
  ...posts,
  { id: 'e1', userId: 'u7', type: 'image', media: [{ type: 'image', src: img('exp-market', 1080, 1080) }], aspect: '1/1', caption: 'Market colours', hashtags: [], likes: 5231, timestamp: now - DAY, comments: [], totalComments: 87, location: '' },
  { id: 'e2', userId: 'u10', type: 'video', media: [{ type: 'video', src: VIDEOS.fun, poster: img('exp-surf', 1080, 1350) }], aspect: '4/5', caption: 'Swell season opener', hashtags: [], likes: 11020, timestamp: now - DAY, comments: [], totalComments: 203, location: '' },
  { id: 'e3', userId: 'u9', type: 'image', media: [{ type: 'image', src: img('exp-garden', 1080, 1080) }], aspect: '1/1', caption: 'Botanical garden morning', hashtags: [], likes: 2140, timestamp: now - 2 * DAY, comments: [], totalComments: 45, location: '' },
  { id: 'e4', userId: 'u1', type: 'carousel', media: [{ type: 'image', src: img('exp-alps-1', 1080, 1080) }, { type: 'image', src: img('exp-alps-2', 1080, 1080) }], aspect: '1/1', caption: 'Dolomites dispatch', hashtags: [], likes: 18730, timestamp: now - 2 * DAY, comments: [], totalComments: 340, location: '' },
  { id: 'e5', userId: 'u4', type: 'image', media: [{ type: 'image', src: img('exp-dessert', 1080, 1080) }], aspect: '1/1', caption: 'Basque cheesecake, burnt on purpose', hashtags: [], likes: 32180, timestamp: now - 3 * DAY, comments: [], totalComments: 512, location: '' },
  { id: 'e6', userId: 'u12', type: 'video', media: [{ type: 'video', src: VIDEOS.blazes, poster: img('exp-skate', 1080, 1080) }], aspect: '1/1', caption: 'Line of the week', hashtags: [], likes: 4470, timestamp: now - 3 * DAY, comments: [], totalComments: 92, location: '' },
  { id: 'e7', userId: 'u8', type: 'image', media: [{ type: 'image', src: img('exp-fashion', 1080, 1350) }], aspect: '4/5', caption: 'Fashion week, day two', hashtags: [], likes: 25610, timestamp: now - 4 * DAY, comments: [], totalComments: 428, location: '' },
  { id: 'e8', userId: 'u2', type: 'image', media: [{ type: 'image', src: img('exp-sketch', 1080, 1080) }], aspect: '1/1', caption: 'Sketchbook page 141', hashtags: [], likes: 3320, timestamp: now - 4 * DAY, comments: [], totalComments: 64, location: '' },
  { id: 'e9', userId: 'u6', type: 'image', media: [{ type: 'image', src: img('exp-fox', 1080, 1350) }], aspect: '4/5', caption: 'Arctic fox, 6am', hashtags: [], likes: 41200, timestamp: now - 5 * DAY, comments: [], totalComments: 683, location: '' },
  { id: 'e10', userId: 'u11', type: 'image', media: [{ type: 'image', src: img('exp-croissant', 1080, 1080) }], aspect: '1/1', caption: 'Lamination practice, batch nine', hashtags: [], likes: 6890, timestamp: now - 5 * DAY, comments: [], totalComments: 134, location: '' },
  { id: 'e11', userId: 'u3', type: 'image', media: [{ type: 'image', src: img('exp-trail', 1080, 1350) }], aspect: '4/5', caption: 'Trail race recap', hashtags: [], likes: 1980, timestamp: now - 6 * DAY, comments: [], totalComments: 51, location: '' },
  { id: 'e12', userId: 'u5', type: 'image', media: [{ type: 'image', src: img('exp-neon', 1080, 1080) }], aspect: '1/1', caption: 'Shibuya after rain', hashtags: [], likes: 9340, timestamp: now - 6 * DAY, comments: [], totalComments: 176, location: '' },
]

export const reels = [
  { id: 'r1', userId: 'u10', video: VIDEOS.escapes, poster: img('reel-1', 720, 1280), caption: 'Coastline test footage — graded in the car because patience is not my strength', audio: 'Original audio · sam.frames', likes: 45210, comments: 892, shares: 1204, timestamp: now - 5 * HOUR },
  { id: 'r2', userId: 'u6', video: VIDEOS.bunny, poster: img('reel-2', 720, 1280), caption: 'Ninety seconds of arctic light after eleven hours of waiting', audio: 'Northern Drift · Ambient Fields', likes: 128400, comments: 2140, shares: 5620, timestamp: now - 12 * HOUR },
  { id: 'r3', userId: 'u12', video: VIDEOS.blazes, poster: img('reel-3', 720, 1280), caption: 'Finally landed it on camera. Only took forty tries.', audio: 'Kickflip Theory · The Copers', likes: 8930, comments: 341, shares: 208, timestamp: now - DAY },
  { id: 'r4', userId: 'u4', video: VIDEOS.fun, poster: img('reel-4', 720, 1280), caption: '60-second cacio e pepe. Watch the emulsion, that is the whole trick.', audio: 'Original audio · tomas.eats', likes: 210300, comments: 4820, shares: 15200, timestamp: now - DAY - 6 * HOUR },
  { id: 'r5', userId: 'u1', video: VIDEOS.joyrides, poster: img('reel-5', 720, 1280), caption: 'Faroe Islands in motion. Sound on for the wind (or not, it was loud)', audio: 'Fjord Lines · Kaia Sund', likes: 67800, comments: 1130, shares: 3400, timestamp: now - 2 * DAY },
  { id: 'r6', userId: 'u2', video: VIDEOS.meltdowns, poster: img('reel-6', 720, 1280), caption: 'Two weeks of mural work in twenty seconds', audio: 'Paint It Forward · Streetlight Collective', likes: 32100, comments: 760, shares: 1890, timestamp: now - 3 * DAY },
]

export const conversations = [
  {
    id: 'cv1', userId: 'u1', unread: 2, online: true, typing: false,
    messages: [
      { id: 'm1', from: 'u1', text: 'Hey! Saw your desert shots, they came out great', timestamp: now - 2 * DAY, seen: true },
      { id: 'm2', from: 'u0', text: 'Thanks! Shot them all before 7am, the light gets brutal fast out there', timestamp: now - 2 * DAY + 10 * 60000, seen: true },
      { id: 'm3', from: 'u1', text: 'Classic. Same story in the Faroes except replace heat with horizontal rain', timestamp: now - 2 * DAY + 15 * 60000, seen: true },
      { id: 'm4', from: 'u1', type: 'image', image: img('dm-faroe', 800, 600), text: '', timestamp: now - 2 * DAY + 16 * 60000, seen: true },
      { id: 'm5', from: 'u0', text: 'Okay that is absurd. Straight out of camera??', timestamp: now - 2 * DAY + 20 * 60000, seen: true },
      { id: 'm6', from: 'u1', text: 'Barely touched it. The place does the work for you', timestamp: now - 40 * 60000, seen: false, reaction: null },
      { id: 'm7', from: 'u1', text: 'Also — are you around in November? Thinking of a group trip', timestamp: now - 38 * 60000, seen: false },
    ],
  },
  {
    id: 'cv2', userId: 'u5', unread: 0, online: true, typing: true,
    messages: [
      { id: 'm8', from: 'u0', text: 'That desk setup post — what monitor arm is that?', timestamp: now - 8 * HOUR, seen: true },
      { id: 'm9', from: 'u5', text: 'The Ergotron LX! Worth every dirham, my neck thanks me daily', timestamp: now - 7 * HOUR, seen: true },
      { id: 'm10', from: 'u0', text: 'Ordering one now. My current setup is a stack of books, no joke', timestamp: now - 7 * HOUR + 5 * 60000, seen: true },
      { id: 'm11', from: 'u5', text: '😂 the developer way. Books first, ergonomics later', timestamp: now - 6 * HOUR, seen: true, reaction: '😂' },
    ],
  },
  {
    id: 'cv3', userId: 'u4', unread: 1, online: false, typing: false,
    messages: [
      { id: 'm12', from: 'u4', text: 'Tried the harissa variation you suggested. You were right about the honey', timestamp: now - DAY, seen: true },
      { id: 'm13', from: 'u0', text: 'Told you! The sweetness rounds out the heat', timestamp: now - DAY + HOUR, seen: true },
      { id: 'm14', from: 'u4', type: 'voice', duration: '0:42', text: '', timestamp: now - 3 * HOUR, seen: false },
    ],
  },
  {
    id: 'cv4', userId: 'u3', unread: 0, online: false, typing: false,
    messages: [
      { id: 'm15', from: 'u3', text: 'Signed up for the Dubai marathon!! See you at the start line?', timestamp: now - 3 * DAY, seen: true },
      { id: 'm16', from: 'u0', text: 'Ha! I will be at the finish line. With coffee. Cheering loudly', timestamp: now - 3 * DAY + 2 * HOUR, seen: true },
      { id: 'm17', from: 'u3', text: 'Coward 😄 offer accepted though', timestamp: now - 3 * DAY + 3 * HOUR, seen: true },
    ],
  },
  {
    id: 'cv5', userId: 'u2', unread: 0, online: true, typing: false,
    messages: [
      { id: 'm18', from: 'u0', text: 'The mural process carousel was so good. Do you film everything?', timestamp: now - 4 * DAY, seen: true },
      { id: 'm19', from: 'u2', text: 'Tripod in the corner, timelapse mode, forget about it. Low effort high reward', timestamp: now - 4 * DAY + HOUR, seen: true },
    ],
  },
  {
    id: 'cv6', userId: 'u9', unread: 0, online: false, typing: false,
    messages: [
      { id: 'm20', from: 'u9', text: 'Your monstera question — yes, repot it. It is definitely rootbound', timestamp: now - 5 * DAY, seen: true },
      { id: 'm21', from: 'u0', text: 'On it this weekend. Thank you plant doctor 🌿', timestamp: now - 5 * DAY + 30 * 60000, seen: true },
    ],
  },
]

export const notifications = [
  { id: 'n1', type: 'like', userId: 'u1', postId: 'mp5', timestamp: now - 25 * 60000, read: false },
  { id: 'n2', type: 'follow', userId: 'u12', timestamp: now - 2 * HOUR, read: false },
  { id: 'n3', type: 'comment', userId: 'u4', postId: 'mp4', text: 'That plating though. Nicely done.', timestamp: now - 4 * HOUR, read: false },
  { id: 'n4', type: 'mention', userId: 'u5', postId: 'p3', text: 'mentioned you in a comment: "@siddha.jith you would love this setup"', timestamp: now - 9 * HOUR, read: false },
  { id: 'n5', type: 'like', userId: 'u3', postId: 'mp2', timestamp: now - 20 * HOUR, read: true },
  { id: 'n6', type: 'follow', userId: 'u7', timestamp: now - DAY - 2 * HOUR, read: true },
  { id: 'n7', type: 'tag', userId: 'u2', postId: 'p5', text: 'tagged you in a post', timestamp: now - 2 * DAY, read: true },
  { id: 'n8', type: 'like', userId: 'u11', postId: 'mp1', timestamp: now - 3 * DAY, read: true },
  { id: 'n9', type: 'comment', userId: 'u9', postId: 'mp3', text: 'The second shot is my favourite', timestamp: now - 4 * DAY, read: true },
  { id: 'n10', type: 'request', userId: 'u8', timestamp: now - 6 * DAY, read: true },
  { id: 'n11', type: 'follow', userId: 'u10', timestamp: now - 9 * DAY, read: true },
  { id: 'n12', type: 'like', userId: 'u6', postId: 'mp6', timestamp: now - 12 * DAY, read: true },
]

export const suggestions = [
  { userId: 'u7', reason: 'Followed by maya.lenz' },
  { userId: 'u10', reason: 'Followed by kofi_draws + 2 more' },
  { userId: 'u11', reason: 'Suggested for you' },
  { userId: 'u12', reason: 'Followed by elena.runs' },
  { userId: 'u6', reason: 'New to Glimpse' },
]

export const highlights = [
  { id: 'h1', label: 'Travel', cover: img('hl-travel', 200, 200) },
  { id: 'h2', label: 'Food', cover: img('hl-food', 200, 200) },
  { id: 'h3', label: 'Work', cover: img('hl-work', 200, 200) },
  { id: 'h4', label: 'Friends', cover: img('hl-friends', 200, 200) },
]
