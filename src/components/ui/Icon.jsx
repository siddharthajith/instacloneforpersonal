const paths = {
  home: (
    <>
      <path d="M4 10.5 12 3.5l8 7V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.5Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.6-4.6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.2 5-5 2.2 2.2-5 5-2.2Z" />
    </>
  ),
  clips: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M3.5 8.5h17M8.5 3.5l3 5M14 3.5l3 5" />
      <path d="m10.5 12.5 4 2.5-4 2.5v-5Z" fill="currentColor" stroke="none" />
    </>
  ),
  message: (
    <>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="m8 12 3 1.5 5-3.5-3 4-3-1.5-2-.5Z" fill="currentColor" stroke="none" />
    </>
  ),
  heart: (
    <path d="M12 20.5S4 15.3 4 9.8C4 7 6.2 4.9 8.8 4.9c1.3 0 2.5.6 3.2 1.6.7-1 1.9-1.6 3.2-1.6 2.6 0 4.8 2.1 4.8 4.9 0 5.5-8 10.7-8 10.7Z" />
  ),
  plusSquare: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5c1.2-3.5 4-5.2 7.5-5.2s6.3 1.7 7.5 5.2" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l2-1.5-2-3.4-2.4.9a7.6 7.6 0 0 0-2.6-1.5L14 2.5h-4l-.4 2.5a7.6 7.6 0 0 0-2.6 1.5l-2.4-.9-2 3.4 2 1.5a7.6 7.6 0 0 0 0 3l-2 1.5 2 3.4 2.4-.9a7.6 7.6 0 0 0 2.6 1.5l.4 2.5h4l.4-2.5a7.6 7.6 0 0 0 2.6-1.5l2.4.9 2-3.4-2-1.5Z" />
    </>
  ),
  menu: <path d="M4 6.5h16M4 12h16M4 17.5h16" />,
  logout: (
    <>
      <path d="M14.5 4h-8A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20h8" />
      <path d="M11 12h9.5M17 8.5l3.5 3.5-3.5 3.5" />
    </>
  ),
  comment: <path d="M20.5 12a8.5 8.5 0 1 0-3.3 6.7l3.3 1-1-3.1A8.5 8.5 0 0 0 20.5 12Z" />,
  share: <path d="M20.5 3.5 3.5 10l6.5 2.5L12.5 19l8-15.5ZM10 12.5l10.5-9" />,
  bookmark: <path d="M6 3.5h12V21l-6-4.5L6 21V3.5Z" />,
  dots: (
    <>
      <circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  close: <path d="m5.5 5.5 13 13m0-13-13 13" />,
  chevronLeft: <path d="m14.5 6-6 6 6 6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  verified: (
    <>
      <path
        d="M12 2.2 14.5 4.5l3.3-.4 1 3.2 2.9 1.7-1.2 3 1.2 3-2.9 1.7-1 3.2-3.3-.4L12 21.8 9.5 19.5l-3.3.4-1-3.2L2.3 15l1.2-3-1.2-3 2.9-1.7 1-3.2 3.3.4L12 2.2Z"
        fill="currentColor"
        stroke="none"
      />
      <path d="m8.7 12.2 2.2 2.2 4.4-4.6" stroke="#fff" strokeWidth="2" fill="none" />
    </>
  ),
  camera: (
    <>
      <path d="M4 7.5h3l1.5-2.5h7L17 7.5h3A1.5 1.5 0 0 1 21.5 9v9.5A1.5 1.5 0 0 1 20 20H4a1.5 1.5 0 0 1-1.5-1.5V9A1.5 1.5 0 0 1 4 7.5Z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
  phone: <path d="M6.5 3.5h3l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5C11 18.8 5.2 13 4.9 5.1a1.5 1.5 0 0 1 1.6-1.6Z" />,
  video: (
    <>
      <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
      <path d="m15.5 10.5 6-3v9l-6-3" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="7.8" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5a4.5 4.5 0 0 0 7 0" />
      <circle cx="9" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <circle cx="9" cy="10" r="1.7" />
      <path d="m4.5 17.5 4.5-4 3.5 3 3.5-3.5 4.5 4" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3.5" width="6" height="11" rx="3" />
      <path d="M5.5 12a6.5 6.5 0 0 0 13 0M12 18.5V21" />
    </>
  ),
  send: <path d="M20.5 3.5 3.5 10l6.5 2.5L12.5 19l8-15.5Z" />,
  play: <path d="M8 5.5v13l10-6.5-10-6.5Z" fill="currentColor" stroke="none" />,
  pause: <path d="M8 5.5v13M16 5.5v13" strokeWidth="3" />,
  volumeOn: (
    <>
      <path d="M4 9.5v5h3l5 4v-13l-5 4H4Z" />
      <path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" />
    </>
  ),
  volumeOff: (
    <>
      <path d="M4 9.5v5h3l5 4v-13l-5 4H4Z" />
      <path d="m16 9.5 5 5m0-5-5 5" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M3.5 9.2h17M3.5 14.8h17M9.2 3.5v17M14.8 3.5v17" />
    </>
  ),
  tag: (
    <>
      <path d="M12.6 2.9 21 11.4a1.5 1.5 0 0 1 0 2.1l-7.5 7.5a1.5 1.5 0 0 1-2.1 0L3 12.6V4.5A1.5 1.5 0 0 1 4.5 3l8.1-.1Z" />
      <circle cx="8" cy="8" r="1.5" />
    </>
  ),
  carousel: (
    <path d="M17.5 2.5h-9A2 2 0 0 0 6.5 4.5v0h11a2 2 0 0 1 2 2v11h0a2 2 0 0 0 2-2v-9a4 4 0 0 0-4-4ZM14.5 6.5h-9a2 2 0 0 0-2 2v9a4 4 0 0 0 4 4h5a4 4 0 0 0 4-4v-9a2 2 0 0 0-2-2Z" fill="currentColor" stroke="none" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.5l3.5 2" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  doubleCheck: <path d="m2.5 12.5 4 4L14 9m-4.5 7.5.5.5L19.5 9" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M4.5 5.5 19.5 19M9.7 6a9.8 9.8 0 0 1 2.3-.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3 3.7M6 7.5A16.6 16.6 0 0 0 2.5 12S6 18.5 12 18.5a9 9 0 0 0 3.3-.7" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </>
  ),
  paperclip: <path d="m19 11.5-7 7a5 5 0 0 1-7-7l7.8-7.8a3.3 3.3 0 0 1 4.7 4.7l-7.8 7.8a1.7 1.7 0 0 1-2.4-2.4l7.2-7.2" />,
  crop: <path d="M6 2.5v13A2.5 2.5 0 0 0 8.5 18h13M2.5 6h13A2.5 2.5 0 0 1 18 8.5v13" />,
  upload: <path d="M12 15.5V4m0 0L7.5 8.5M12 4l4.5 4.5M4.5 16v3A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-3" />,
  mapPin: (
    <>
      <path d="M12 21.5s7-6.2 7-11.5a7 7 0 1 0-14 0c0 5.3 7 11.5 7 11.5Z" />
      <circle cx="12" cy="9.7" r="2.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
    </>
  ),
  refresh: <path d="M20 5v5h-5m5-.5A8.5 8.5 0 1 0 20.5 14" />,
  bell: (
    <>
      <path d="M6 9.5a6 6 0 0 1 12 0c0 5 2 6.5 2 6.5H4s2-1.5 2-6.5Z" />
      <path d="M10 19.5a2.2 2.2 0 0 0 4 0" />
    </>
  ),
  music: (
    <>
      <path d="M9 18.5V5.8l11-2.3v12.7" />
      <circle cx="6.5" cy="18.5" r="2.5" />
      <circle cx="17.5" cy="16.2" r="2.5" />
    </>
  ),
  trash: <path d="M4.5 6.5h15M9.5 6V4.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V6M6.5 6.5l.8 12.6a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4l.8-12.6M10 10.5v6M14 10.5v6" />,
  pencil: <path d="m14.5 5.5 4 4L8 20l-4.8.8L4 16 14.5 5.5Zm2-2 1.4-1.4a1.5 1.5 0 0 1 2.1 0l1.9 1.9a1.5 1.5 0 0 1 0 2.1L20.5 7.5l-4-4Z" />,
  thumbsUp: <path d="M7.5 10.5V20M7.5 10.5 4.5 10.5a1.5 1.5 0 0 0-1.5 1.5V17a3 3 0 0 0 3 3h8.2a2 2 0 0 0 2-1.6l1.3-6.5a2 2 0 0 0-2-2.4H12l1.5-6.5a2 2 0 0 0-2-2.2l-4 2.2Z" />,
  thumbsDown: <path d="M16.5 13.5V4M16.5 13.5 19.5 13.5a1.5 1.5 0 0 1 1.5 1.5V7a3 3 0 0 0-3-3h-8.2a2 2 0 0 0-2 1.6l-1.3 6.5a2 2 0 0 0 2 2.4H12l-1.5 6.5a2 2 0 0 0 2 2.2l4-2.2Z" />,
  list: (
    <>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="4" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4" cy="18" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  theater: (
    <>
      <rect x="2" y="7" width="20" height="10" rx="1.5" />
      <path d="M2 10h20M6 7V5M18 7V5" />
    </>
  ),
  pip: (
    <>
      <rect x="3" y="5" width="14" height="10" rx="1.5" />
      <rect x="13" y="11" width="8" height="6" rx="1" />
    </>
  ),
  captions: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 14h4M13 14h4M7 17h10" />
    </>
  ),
  fullscreen: (
    <>
      <path d="M4 9V4.5h4.5M15.5 4.5H20V9M20 15v4.5h-4.5M8.5 19.5H4V15" />
    </>
  ),
  shuffle: <path d="M16 3.5 20.5 8 16 12.5M20.5 8H14a4 4 0 0 0-4 4v0M8 20.5 3.5 16 8 11.5M3.5 16H10a4 4 0 0 0 4-4v0" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.2a2.8 2.8 0 0 1 5 1.7c0 2-2.5 2.5-2.5 4.3" />
      <circle cx="12" cy="17.2" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  feedback: <path d="M4 5.5h16v11H8l-4 3.5V5.5Z" />,
  film: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 5v14M17 5v14M3 10h18M3 14h18" />
    </>
  ),
  queue: (
    <>
      <rect x="4" y="4" width="16" height="4" rx="1" />
      <rect x="4" y="10" width="16" height="4" rx="1" />
      <rect x="4" y="16" width="10" height="4" rx="1" />
    </>
  ),
  download: <path d="M12 4v10m0 0 3.5-3.5M12 14l-3.5-3.5M5 18.5h14" />,
  library: (
    <>
      <path d="M5 4.5h3v15H5a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 5 4.5Z" />
      <path d="M8 4.5h11.5A1.5 1.5 0 0 1 21 6v12.5a1.5 1.5 0 0 1-1.5 1.5H8V4.5Z" />
      <path d="M12 9h5M12 12.5h5" />
    </>
  ),
  history: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" />
      <path d="M3.5 7.5V12h4.5" />
      <path d="M12 8v4.5l3 1.5" />
    </>
  ),
  shorts: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="m11 9.5 4 2.5-4 2.5v-5Z" fill="currentColor" stroke="none" />
    </>
  ),
}

export default function Icon({ name, size = 24, filled = false, className = '', strokeWidth = 1.7, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
