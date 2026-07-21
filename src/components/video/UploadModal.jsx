import { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import { VIDEO_CATEGORIES } from '../../data/videoMockData.js'
import { useApp } from '../../context/AppContext.jsx'
import { useVideo } from '../../context/VideoContext.jsx'

const STEPS = ['Select file', 'Details', 'Elements', 'Checks', 'Visibility', 'Publish']

export default function UploadModal({ open, onClose }) {
  const { profile } = useApp()
  const { addUploadedVideo } = useVideo()
  const [step, setStep] = useState(0)
  const [preview, setPreview] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', tags: '', category: 'Technology',
    audience: 'not-kids', language: 'English', visibility: 'public',
    comments: 'all', location: '', recordingDate: '',
  })

  const reset = () => {
    setStep(0); setPreview(null); setUploadProgress(0)
    setProcessing(false); setError(''); setSuccess(false)
    setForm({ title: '', description: '', tags: '', category: 'Technology', audience: 'not-kids', language: 'English', visibility: 'public', comments: 'all', location: '', recordingDate: '' })
  }

  const handleClose = () => { reset(); onClose() }

  const selectFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith('video/')) { setError('Please select a video file.'); return }
    setPreview(URL.createObjectURL(f))
    setForm((prev) => ({ ...prev, title: f.name.replace(/\.[^.]+$/, '') }))
    setError('')
    setStep(1)
  }

  const simulateUpload = async () => {
    setError('')
    if (!form.title.trim()) { setError('Title is required.'); return }
    setUploadProgress(0)
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 120))
      setUploadProgress(i)
    }
    setProcessing(true)
    await new Promise((r) => setTimeout(r, 800))
    setProcessing(false)
    setSuccess(true)
    addUploadedVideo({
      id: `upload-${Date.now()}`,
      channelId: 'u0-channel',
      type: 'video',
      title: form.title,
      description: form.description,
      thumbnail: preview || `https://picsum.photos/seed/upload-${Date.now()}/1280/720`,
      poster: preview,
      src: preview || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: 180,
      views: 0,
      likes: 0,
      timestamp: Date.now(),
      category: form.category,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      comments: [],
      uploadedBy: profile.username,
    })
    setStep(5)
  }

  return (
    <Modal open={open} onClose={handleClose} full>
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Upload video</h2>
          <button type="button" onClick={handleClose} className="p-2 rounded-full hover:bg-stone-100" aria-label="Close">
            <Icon name="close" size={22} />
          </button>
        </div>

        <div className="flex gap-1 mb-6 overflow-x-auto scrollbar-none">
          {STEPS.map((s, i) => (
            <div key={s} className={`shrink-0 px-2 py-1 text-xs font-medium rounded-full ${i <= step ? 'bg-accent text-white' : 'bg-stone-100 text-ink-faint'}`}>
              {i + 1}. {s}
            </div>
          ))}
        </div>

        {error && <p className="text-sm text-danger mb-4" role="alert">{error}</p>}

        {step === 0 && (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-line-strong rounded-2xl p-12 cursor-pointer hover:bg-stone-50 transition-colors">
            <Icon name="upload" size={40} className="text-ink-faint mb-3" />
            <span className="font-semibold">Select a video file</span>
            <span className="text-sm text-ink-faint mt-1">MP4, MOV, or WebM</span>
            <input type="file" accept="video/*" className="sr-only" onChange={selectFile} />
          </label>
        )}

        {step === 1 && (
          <div className="space-y-4">
            {preview && <video src={preview} className="w-full aspect-video rounded-xl bg-black" controls />}
            <div>
              <label className="text-sm font-medium">Title</label>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-line rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4} className="w-full mt-1 px-3 py-2 border border-line rounded-xl text-sm resize-none" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-line rounded-xl text-sm">
                  {VIDEO_CATEGORIES.filter((c) => c !== 'All' && c !== 'Recently Uploaded').map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Tags</label>
                <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} placeholder="comma separated" className="w-full mt-1 px-3 py-2 border border-line rounded-xl text-sm" />
              </div>
            </div>
            <Button onClick={() => setStep(2)}>Continue</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-ink-soft">Add video elements — thumbnail, playlist, and end screen placeholders.</p>
            <div className="aspect-video rounded-xl bg-stone-100 flex items-center justify-center text-ink-faint text-sm">Thumbnail preview</div>
            <Button onClick={() => setStep(3)}>Continue</Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <p className="font-medium">Checks</p>
            {['Copyright scan — clear', 'Content guidelines — passed', 'Ad suitability — standard'].map((c) => (
              <div key={c} className="flex items-center gap-2 text-sm text-ink-soft">
                <Icon name="check" size={18} className="text-green-600" /> {c}
              </div>
            ))}
            <Button onClick={() => setStep(4)}>Continue</Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Visibility</label>
              <select value={form.visibility} onChange={(e) => setForm((f) => ({ ...f, visibility: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-line rounded-xl text-sm">
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="private">Private</option>
                <option value="scheduled">Schedule</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Comments</label>
              <select value={form.comments} onChange={(e) => setForm((f) => ({ ...f, comments: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-line rounded-xl text-sm">
                <option value="all">Allow all comments</option>
                <option value="moderate">Hold potentially inappropriate</option>
                <option value="off">Disable comments</option>
              </select>
            </div>
            <Button onClick={simulateUpload}>Publish</Button>
          </div>
        )}

        {step === 5 && (
          <div className="text-center py-8">
            {processing ? (
              <>
                <p className="font-medium mb-2">Processing video…</p>
                <div className="h-2 rounded-full bg-stone-100 overflow-hidden max-w-xs mx-auto"><div className="h-full bg-accent animate-pulse w-2/3" /></div>
              </>
            ) : success ? (
              <>
                <Icon name="check" size={48} className="text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold">Upload complete</h3>
                <p className="text-sm text-ink-soft mt-2">Your video is now live in Your Videos.</p>
                <Button className="mt-4" onClick={handleClose}>Done</Button>
              </>
            ) : null}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4 max-w-xs mx-auto">
                <p className="text-sm mb-2">Uploading… {uploadProgress}%</p>
                <div className="h-2 rounded-full bg-stone-100"><div className="h-full bg-accent transition-all" style={{ width: `${uploadProgress}%` }} /></div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  )
}
