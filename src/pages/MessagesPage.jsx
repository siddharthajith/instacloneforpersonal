import { useState, useMemo, useRef, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import VerifiedBadge from '../components/ui/VerifiedBadge.jsx'
import { useApp } from '../context/AppContext.jsx'
import { getUser } from '../data/mockData.js'
import { conversationTime, clockTime } from '../utils/format.js'

const EMOJIS = ['😀', '😂', '😍', '🔥', '👏', '❤️', '🙌', '😮', '😢', '👍', '🎉', '✨']

function ConversationList({ activeId }) {
  const { conversations, sentMessages } = useApp()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const list = conversations.filter((c) => {
      const u = getUser(c.userId)
      return (
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.fullName.toLowerCase().includes(search.toLowerCase())
      )
    })
    return list.sort((a, b) => {
      const lastA = [...a.messages, ...(sentMessages[a.id] || [])].at(-1)?.timestamp || 0
      const lastB = [...b.messages, ...(sentMessages[b.id] || [])].at(-1)?.timestamp || 0
      return lastB - lastA
    })
  }, [conversations, sentMessages, search])

  return (
    <div className={`flex flex-col w-full md:w-[340px] md:shrink-0 md:border-r border-line bg-card h-full ${activeId ? 'hidden md:flex' : 'flex'}`}>
      <div className="px-5 pt-6 pb-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Messages</h1>
        <button type="button" aria-label="New message" className="p-1.5 text-ink hover:text-ink-soft">
          <Icon name="pencil" size={22} />
        </button>
      </div>
      <div className="px-4 pb-3">
        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations"
            aria-label="Search conversations"
            className="w-full bg-stone-100 rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
        </div>
      </div>
      <ul className="flex-1 overflow-y-auto pb-16 md:pb-0">
        {filtered.length === 0 && (
          <li className="px-5 py-10 text-center text-sm text-ink-faint">No conversations found.</li>
        )}
        {filtered.map((c) => {
          const u = getUser(c.userId)
          const extra = sentMessages[c.id] || []
          const last = [...c.messages, ...extra].at(-1)
          const preview =
            last.type === 'image' ? '📷 Photo' : last.type === 'voice' ? '🎤 Voice message' : last.text
          return (
            <li key={c.id}>
              <Link
                to={`/messages/${c.id}`}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors ${
                  activeId === c.id ? 'bg-stone-100' : ''
                }`}
              >
                <span className="relative shrink-0">
                  <Avatar src={u.avatar} alt="" size="md" />
                  {c.online && (
                    <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-card" title="Online" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm truncate ${c.unread > 0 ? 'font-bold' : 'font-semibold'}`}>
                    {u.fullName}
                  </span>
                  <span className={`block text-[13px] truncate ${c.unread > 0 ? 'text-ink font-semibold' : 'text-ink-faint'}`}>
                    {last.from === 'u0' ? 'You: ' : ''}{preview}
                  </span>
                </span>
                <span className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[11px] text-ink-faint">{conversationTime(last.timestamp)}</span>
                  {c.unread > 0 && (
                    <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function MessageBubble({ msg, user }) {
  const mine = msg.from === 'u0'
  return (
    <div className={`flex items-end gap-2 ${mine ? 'justify-end' : ''}`}>
      {!mine && <Avatar src={user.avatar} alt="" size="xs" />}
      <div className={`max-w-[75%] sm:max-w-[65%] ${mine ? 'items-end' : ''}`}>
        {msg.type === 'image' ? (
          <img src={msg.image} alt="Shared attachment" loading="lazy" className="rounded-2xl max-h-64 border border-line" />
        ) : msg.type === 'voice' ? (
          <div className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 ${mine ? 'bg-accent text-white' : 'bg-stone-100 text-ink'}`}>
            <Icon name="play" size={18} />
            <span className="flex items-center gap-[2px]" aria-hidden="true">
              {[8, 14, 10, 16, 7, 12, 9, 15, 11, 6].map((h, i) => (
                <span key={i} className="w-[3px] rounded-full bg-current opacity-70" style={{ height: h }} />
              ))}
            </span>
            <span className="text-xs font-medium">{msg.duration}</span>
          </div>
        ) : (
          <div className={`relative rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${mine ? 'bg-accent text-white rounded-br-md' : 'bg-stone-100 text-ink rounded-bl-md'}`}>
            {msg.text}
            {msg.reaction && (
              <span className="absolute -bottom-3 right-2 text-sm bg-card border border-line rounded-full px-1 shadow-sm">
                {msg.reaction}
              </span>
            )}
          </div>
        )}
        <p className={`text-[10px] text-ink-faint mt-1 ${mine ? 'text-right' : ''} ${msg.reaction ? 'mt-3.5' : ''}`}>
          {clockTime(msg.timestamp)}
          {mine && msg.seen && ' · Seen'}
        </p>
      </div>
    </div>
  )
}

function ChatArea({ conversation }) {
  const { sentMessages, sendMessage } = useApp()
  const user = getUser(conversation.userId)
  const [draft, setDraft] = useState('')
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [typing, setTyping] = useState(conversation.typing)
  const scrollRef = useRef(null)
  const emojiRef = useRef(null)
  const navigate = useNavigate()

  const messages = useMemo(
    () => [...conversation.messages, ...(sentMessages[conversation.id] || [])],
    [conversation, sentMessages],
  )

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages.length, typing, conversation.id])

  useEffect(() => {
    setTyping(conversation.typing)
  }, [conversation.id, conversation.typing])

  useEffect(() => {
    if (!emojiOpen) return
    const onClick = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) setEmojiOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [emojiOpen])

  const send = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    sendMessage(conversation.id, {
      id: `sm-${Date.now()}`,
      from: 'u0',
      text,
      timestamp: Date.now(),
      seen: false,
    })
    setDraft('')
    setEmojiOpen(false)
    // simulate a brief typing indicator response
    setTyping(true)
    setTimeout(() => setTyping(false), 2600)
  }

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-card">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-line">
        <button type="button" onClick={() => navigate('/messages')} aria-label="Back to conversations" className="md:hidden p-1 -ml-1 text-ink">
          <Icon name="chevronLeft" size={24} />
        </button>
        <Link to={`/profile/${user.username}`} className="relative shrink-0">
          <Avatar src={user.avatar} alt="" size="sm" />
          {conversation.online && (
            <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-500 border-2 border-card" />
          )}
        </Link>
        <div className="min-w-0 flex-1">
          <Link to={`/profile/${user.username}`} className="flex items-center gap-1 text-sm font-semibold hover:opacity-70">
            {user.fullName}
            {user.verified && <VerifiedBadge size={13} />}
          </Link>
          <p className="text-xs text-ink-faint">{conversation.online ? 'Active now' : 'Active recently'}</p>
        </div>
        <button type="button" aria-label="Voice call" className="p-2 text-ink hover:text-ink-soft"><Icon name="phone" size={22} /></button>
        <button type="button" aria-label="Video call" className="p-2 text-ink hover:text-ink-soft"><Icon name="video" size={22} /></button>
        <button type="button" aria-label="Conversation information" className="p-2 text-ink hover:text-ink-soft"><Icon name="info" size={22} /></button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {messages.map((m) => (
          <MessageBubble key={m.id} msg={m} user={user} />
        ))}
        {typing && (
          <div className="flex items-end gap-2" aria-label={`${user.fullName} is typing`}>
            <Avatar src={user.avatar} alt="" size="xs" />
            <div className="bg-stone-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
              <span className="typing-dot size-1.5 rounded-full bg-ink-faint" />
              <span className="typing-dot size-1.5 rounded-full bg-ink-faint" />
              <span className="typing-dot size-1.5 rounded-full bg-ink-faint" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={send} className="relative flex items-center gap-2 px-4 py-3 border-t border-line">
        {emojiOpen && (
          <div ref={emojiRef} className="absolute bottom-full left-4 mb-2 bg-card border border-line rounded-xl shadow-lg p-3 grid grid-cols-6 gap-1 animate-scale-in z-10">
            {EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setDraft((d) => d + e)}
                className="text-xl p-1.5 rounded-lg hover:bg-stone-100"
                aria-label={`Add ${e} emoji`}
              >
                {e}
              </button>
            ))}
          </div>
        )}
        <button type="button" onClick={() => setEmojiOpen((v) => !v)} aria-label="Open emoji picker" aria-expanded={emojiOpen} className="p-1.5 text-ink-soft hover:text-ink">
          <Icon name="smile" size={24} />
        </button>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Message ${user.fullName.split(' ')[0]}…`}
          aria-label={`Message ${user.fullName}`}
          className="flex-1 bg-stone-100 rounded-full px-4 py-2.5 text-sm placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
        <button type="button" aria-label="Attach file" className="p-1.5 text-ink-soft hover:text-ink">
          <Icon name="paperclip" size={22} />
        </button>
        {draft.trim() ? (
          <button type="submit" aria-label="Send message" className="p-1.5 text-accent hover:text-accent-deep">
            <Icon name="send" size={24} />
          </button>
        ) : (
          <button type="button" aria-label="Record voice message" className="p-1.5 text-ink-soft hover:text-ink">
            <Icon name="mic" size={22} />
          </button>
        )}
      </form>
    </div>
  )
}

export default function MessagesPage() {
  const { conversationId } = useParams()
  const { conversations } = useApp()
  const active = conversations.find((c) => c.id === conversationId)

  return (
    <div className={`${active ? 'h-dvh' : 'h-[calc(100dvh-56px)]'} md:h-dvh flex border-line md:border-l-0`}>
      <ConversationList activeId={active?.id} />
      {active ? (
        <div className={`flex-1 min-w-0 ${active ? 'flex' : 'hidden md:flex'}`}>
          <ChatArea key={active.id} conversation={active} />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 flex-col items-center justify-center text-center px-6 bg-card">
          <span className="size-20 rounded-full border-2 border-ink flex items-center justify-center mb-4">
            <Icon name="send" size={36} />
          </span>
          <h2 className="text-lg font-semibold">Your messages</h2>
          <p className="text-sm text-ink-faint mt-1">Select a conversation to start chatting.</p>
        </div>
      )}
    </div>
  )
}
