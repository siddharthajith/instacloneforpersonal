import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../ui/Modal.jsx'
import Icon from '../ui/Icon.jsx'
import Avatar from '../ui/Avatar.jsx'
import Button from '../ui/Button.jsx'
import { useApp } from '../../context/AppContext.jsx'

const STEPS = ['Upload', 'Edit', 'Details', 'Share']
const ASPECTS = [
  { id: '1/1', label: 'Square 1:1', cls: 'aspect-square' },
  { id: '4/5', label: 'Portrait 4:5', cls: 'aspect-[4/5]' },
  { id: '16/9', label: 'Wide 16:9', cls: 'aspect-video' },
]
const FITS = [
  { id: 'cover', label: 'Fill' },
  { id: 'contain', label: 'Fit' },
]

export default function CreateModal({ open, onClose }) {
  const { profile, addCreatedPost } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [files, setFiles] = useState([])
  const [slide, setSlide] = useState(0)
  const [aspect, setAspect] = useState('1/1')
  const [fit, setFit] = useState('cover')
  const [dragging, setDragging] = useState(false)
  const [fileError, setFileError] = useState('')
  const [details, setDetails] = useState({
    caption: '', location: '', tags: '', altText: '',
    disableComments: false, hideLikes: false,
  })
  const [progress, setProgress] = useState(0)
  const [shared, setShared] = useState(false)
  const inputRef = useRef(null)
  const objectUrls = useRef([])

  const reset = useCallback(() => {
    objectUrls.current.forEach((u) => URL.revokeObjectURL(u))
    objectUrls.current = []
    setStep(0)
    setFiles([])
    setSlide(0)
    setAspect('1/1')
    setFit('cover')
    setFileError('')
    setDetails({ caption: '', location: '', tags: '', altText: '', disableComments: false, hideLikes: false })
    setProgress(0)
    setShared(false)
  }, [])

  const close = useCallback(() => {
    onClose()
    reset()
  }, [onClose, reset])

  const addFiles = (list) => {
    setFileError('')
    const accepted = Array.from(list).filter(
      (f) => f.type.startsWith('image/') || f.type.startsWith('video/'),
    )
    if (accepted.length === 0) {
      setFileError('Only image and video files are supported.')
      return
    }
    const mapped = accepted.slice(0, 10 - files.length).map((f) => {
      const url = URL.createObjectURL(f)
      objectUrls.current.push(url)
      return { url, type: f.type.startsWith('video/') ? 'video' : 'image', name: f.name }
    })
    setFiles((prev) => [...prev, ...mapped])
    setStep(1)
  }

  const removeFile = (i) => {
    setFiles((prev) => {
      const next = prev.filter((_, idx) => idx !== i)
      if (next.length === 0) setStep(0)
      return next
    })
    setSlide((s) => Math.max(0, Math.min(s - (i <= s ? 1 : 0), files.length - 2)))
  }

  // Simulated upload on Share step
  useEffect(() => {
    if (step !== 3 || shared) return
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + Math.random() * 18 + 6
      })
    }, 180)
    return () => clearInterval(interval)
  }, [step, shared])

  useEffect(() => {
    if (step === 3 && progress >= 100 && !shared) {
      const t = setTimeout(() => {
        addCreatedPost({
          id: `cp-${Date.now()}`,
          userId: 'u0',
          type: files.length > 1 ? 'carousel' : files[0]?.type === 'video' ? 'video' : 'image',
          media: files.map((f) =>
            f.type === 'video' ? { type: 'video', src: f.url, poster: '' } : { type: 'image', src: f.url },
          ),
          aspect,
          location: details.location,
          caption: details.caption,
          hashtags: [],
          likes: 0,
          timestamp: Date.now(),
          comments: [],
          totalComments: 0,
          hideLikes: details.hideLikes,
          disableComments: details.disableComments,
        })
        setShared(true)
      }, 400)
      return () => clearTimeout(t)
    }
  }, [step, progress, shared, files, aspect, details, addCreatedPost])

  const current = files[slide]
  const aspectCls = ASPECTS.find((a) => a.id === aspect)?.cls || 'aspect-square'

  const fitCls = fit === 'contain' ? 'object-contain' : 'object-cover'
  const preview = (cls = '') => (
    <div className={`relative bg-stone-950 overflow-hidden ${cls}`}>
      {current?.type === 'video' ? (
        <video src={current.url} controls muted playsInline className={`w-full h-full ${fitCls}`} />
      ) : (
        current && <img src={current.url} alt="Upload preview" className={`w-full h-full ${fitCls}`} />
      )}
      {files.length > 1 && (
        <>
          {slide > 0 && (
            <button type="button" onClick={() => setSlide((s) => s - 1)} aria-label="Previous slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 size-7 rounded-full bg-white/90 shadow flex items-center justify-center">
              <Icon name="chevronLeft" size={16} />
            </button>
          )}
          {slide < files.length - 1 && (
            <button type="button" onClick={() => setSlide((s) => s + 1)} aria-label="Next slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 size-7 rounded-full bg-white/90 shadow flex items-center justify-center">
              <Icon name="chevronRight" size={16} />
            </button>
          )}
          <div className="absolute bottom-2.5 inset-x-0 flex justify-center gap-1.5">
            {files.map((_, i) => (
              <span key={i} className={`size-1.5 rounded-full ${i === slide ? 'bg-white' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )

  return (
    <Modal open={open} onClose={close} label="Create new post" showClose={false}>
      <div className="bg-card sm:rounded-xl w-full h-full sm:h-auto sm:w-[min(92vw,680px)] flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-4 py-3 border-b border-line">
          {step > 0 && step < 3 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} aria-label="Back" className="p-1 text-ink hover:text-ink-soft">
              <Icon name="chevronLeft" size={22} />
            </button>
          ) : (
            <span className="w-8" />
          )}
          <h2 className="font-bold text-base">
            {step === 0 ? 'Create new post' : step === 1 ? 'Crop & edit' : step === 2 ? 'Post details' : shared ? 'Shared' : 'Sharing…'}
          </h2>
          {step < 3 ? (
            <div className="flex items-center gap-1">
              {step > 0 && (
                <button type="button" onClick={() => setStep((s) => s + 1)} className="text-sm font-semibold text-accent hover:text-accent-deep px-2 py-1">
                  Next
                </button>
              )}
              <button type="button" onClick={close} aria-label="Close" className="p-1 text-ink hover:text-ink-soft">
                <Icon name="close" size={22} />
              </button>
            </div>
          ) : (
            <span className="w-8" />
          )}
        </header>

        <div className="flex gap-1.5 px-4 pt-3" aria-label={`Step ${step + 1} of 4: ${STEPS[step]}`}>
          {STEPS.map((s, i) => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-accent' : 'bg-line'}`} />
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {step === 0 && (
            <div
              className={`m-4 rounded-xl border-2 border-dashed transition-colors flex flex-col items-center justify-center text-center px-6 py-16 sm:py-24 ${
                dragging ? 'border-accent bg-accent-soft' : 'border-line-strong'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
            >
              <Icon name="upload" size={44} className="text-ink-soft mb-4" />
              <p className="font-semibold">Drag photos and videos here</p>
              <p className="text-sm text-ink-faint mt-1 mb-5">Up to 10 items per post</p>
              <input
                ref={inputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="sr-only"
                onChange={(e) => { addFiles(e.target.files); e.target.value = '' }}
                aria-label="Select photos and videos"
              />
              <Button onClick={() => inputRef.current?.click()}>Select from device</Button>
              {fileError && <p className="text-sm text-danger mt-4" role="alert">{fileError}</p>}
            </div>
          )}

          {step === 1 && (
            <div className="p-4 animate-fade-in">
              {preview(`${aspectCls} w-full max-h-[52vh] rounded-lg mx-auto`)}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft mr-1">
                  <Icon name="crop" size={15} /> Aspect
                </span>
                {ASPECTS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAspect(a.id)}
                    aria-pressed={aspect === a.id}
                    className={`text-xs font-semibold rounded-lg px-3 py-1.5 border transition-colors ${
                      aspect === a.id ? 'bg-ink text-white border-ink' : 'border-line-strong hover:bg-stone-50'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
                <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
                {FITS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFit(f.id)}
                    aria-pressed={fit === f.id}
                    className={`text-xs font-semibold rounded-lg px-3 py-1.5 border transition-colors ${
                      fit === f.id ? 'bg-ink text-white border-ink' : 'border-line-strong hover:bg-stone-50'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-none">
                {files.map((f, i) => (
                  <div key={f.url} className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setSlide(i)}
                      aria-label={`Preview item ${i + 1}`}
                      className={`block size-16 rounded-lg overflow-hidden border-2 ${i === slide ? 'border-accent' : 'border-transparent'}`}
                    >
                      {f.type === 'video' ? (
                        <video src={f.url} muted className="w-full h-full object-cover" />
                      ) : (
                        <img src={f.url} alt="" className="w-full h-full object-cover" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      aria-label={`Remove item ${i + 1}`}
                      className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-ink text-white flex items-center justify-center hover:bg-stone-700"
                    >
                      <Icon name="close" size={11} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  aria-label="Add more media"
                  className="shrink-0 size-16 rounded-lg border-2 border-dashed border-line-strong flex items-center justify-center text-ink-faint hover:border-accent hover:text-accent transition-colors"
                >
                  <Icon name="plusSquare" size={22} />
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => { addFiles(e.target.files); e.target.value = '' }}
                  aria-label="Add more photos and videos"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-4 grid sm:grid-cols-[200px_1fr] gap-4 animate-fade-in">
              {preview(`${aspectCls} w-full rounded-lg self-start`)}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <Avatar src={profile.avatar} alt="" size="sm" />
                  <span className="text-sm font-semibold">{profile.username}</span>
                </div>
                <div>
                  <label htmlFor="cp-caption" className="sr-only">Caption</label>
                  <textarea
                    id="cp-caption"
                    rows={4}
                    maxLength={2200}
                    value={details.caption}
                    onChange={(e) => setDetails((d) => ({ ...d, caption: e.target.value }))}
                    placeholder="Write a caption…"
                    className="w-full border border-line-strong rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                  <p className="text-xs text-ink-faint text-right">{details.caption.length}/2,200</p>
                </div>
                {[
                  ['location', 'Add location', 'mapPin'],
                  ['tags', 'Tag people', 'user'],
                  ['altText', 'Accessibility alt text', 'eye'],
                ].map(([key, placeholder, icon]) => (
                  <div key={key} className="relative">
                    <Icon name={icon} size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
                    <input
                      type="text"
                      value={details[key]}
                      onChange={(e) => setDetails((d) => ({ ...d, [key]: e.target.value }))}
                      placeholder={placeholder}
                      aria-label={placeholder}
                      className="w-full border border-line-strong rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                    />
                  </div>
                ))}
                <div className="space-y-3 pt-1">
                  {[
                    ['disableComments', 'Turn off commenting'],
                    ['hideLikes', 'Hide like count on this post'],
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center justify-between gap-3 text-sm cursor-pointer">
                      {label}
                      <input
                        type="checkbox"
                        checked={details[key]}
                        onChange={(e) => setDetails((d) => ({ ...d, [key]: e.target.checked }))}
                        className="size-4 accent-accent"
                      />
                    </label>
                  ))}
                </div>
                <div className="flex justify-end pt-1">
                  <Button onClick={() => setStep(3)}>Share</Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center text-center px-6 py-16 sm:py-20 animate-fade-in">
              {!shared ? (
                <>
                  <div className="w-full max-w-[280px] h-1.5 rounded-full bg-line overflow-hidden mb-5" role="progressbar" aria-valuenow={Math.min(100, Math.round(progress))} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress">
                    <div className="h-full bg-accent transition-[width] duration-200" style={{ width: `${Math.min(100, progress)}%` }} />
                  </div>
                  <p className="font-semibold">Sharing your post…</p>
                  <p className="text-sm text-ink-faint mt-1">{Math.min(100, Math.round(progress))}%</p>
                </>
              ) : (
                <>
                  <span className="size-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-4 animate-like-pop">
                    <Icon name="check" size={32} strokeWidth={2.4} />
                  </span>
                  <p className="font-bold text-lg">Your post has been shared</p>
                  <p className="text-sm text-ink-faint mt-1 mb-6">It’s now visible at the top of your feed.</p>
                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={close}>Done</Button>
                    <Button onClick={() => { close(); navigate(`/profile/${profile.username}`) }}>View profile</Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
