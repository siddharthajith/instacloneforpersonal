export function formatDuration(seconds) {
  const s = Math.max(0, Math.floor(seconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return `${m}:${String(sec).padStart(2, '0')}`
}

export function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
  if (n >= 10_000) return `${Math.round(n / 100) / 10}K`
  if (n >= 1_000) return n.toLocaleString()
  return String(n)
}

export function timeAgo(timestamp, short = false) {
  const seconds = Math.max(1, Math.floor((Date.now() - timestamp) / 1000))
  const units = [
    [31536000, 'y', 'year'],
    [604800, 'w', 'week'],
    [86400, 'd', 'day'],
    [3600, 'h', 'hour'],
    [60, 'm', 'minute'],
    [1, 's', 'second'],
  ]
  for (const [secs, abbr, word] of units) {
    if (seconds >= secs) {
      const value = Math.floor(seconds / secs)
      if (short) return `${value}${abbr}`
      return `${value} ${word}${value > 1 ? 's' : ''} ago`
    }
  }
  return short ? 'now' : 'just now'
}

export function clockTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export function conversationTime(timestamp) {
  const diff = Date.now() - timestamp
  if (diff < 86400000) return clockTime(timestamp)
  if (diff < 604800000) return new Date(timestamp).toLocaleDateString([], { weekday: 'short' })
  return new Date(timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })
}
