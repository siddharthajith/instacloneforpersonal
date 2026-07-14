import { useState, useRef } from 'react'
import Avatar from '../components/ui/Avatar.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import { useApp } from '../context/AppContext.jsx'

const field = 'w-full border border-line-strong rounded-lg px-3.5 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition'
const labelCls = 'block text-sm font-semibold mb-1.5'
const errCls = 'text-xs text-danger mt-1'

export default function EditProfilePage() {
  const { profile, setProfile } = useApp()
  const [form, setForm] = useState({
    fullName: profile.fullName,
    username: profile.username,
    bio: profile.bio || '',
    website: profile.website || '',
    pronouns: profile.pronouns || '',
    gender: profile.gender || 'Prefer not to say',
    avatar: profile.avatar,
  })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)
  const fileRef = useRef(null)

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setSaved(false)
  }

  const pickAvatar = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setForm((f) => ({ ...f, avatar: url }))
    setSaved(false)
  }

  const validate = () => {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Name is required.'
    if (!form.username.trim()) errs.username = 'Username is required.'
    else if (!/^[a-z0-9._]+$/i.test(form.username)) errs.username = 'Only letters, numbers, dots and underscores allowed.'
    if (form.bio.length > 150) errs.bio = 'Bio must be 150 characters or fewer.'
    if (form.website && !/^[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(form.website)) errs.website = 'Enter a valid website, e.g. example.com'
    return errs
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setProfile({ ...profile, ...form })
    setSaved(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-[640px] px-4 pt-5 md:pt-10 pb-10 animate-fade-in">
      <h1 className="text-xl font-bold mb-6">Edit profile</h1>

      {saved && (
        <div role="status" className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-800 text-sm font-medium rounded-xl px-4 py-3 mb-5 animate-slide-up">
          <Icon name="check" size={18} />
          Profile updated successfully.
        </div>
      )}

      <form onSubmit={submit} noValidate className="bg-card border border-line rounded-xl p-5 sm:p-7 space-y-6">
        <div className="flex items-center gap-4 bg-stone-50 rounded-xl p-4">
          <Avatar src={form.avatar} alt="Your profile photo" size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate">{form.username}</p>
            <p className="text-xs text-ink-faint truncate">{form.fullName}</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={pickAvatar} aria-label="Choose new profile photo" />
          <Button size="sm" onClick={() => fileRef.current?.click()}>Change photo</Button>
        </div>

        <div>
          <label htmlFor="ep-name" className={labelCls}>Name</label>
          <input id="ep-name" type="text" value={form.fullName} onChange={update('fullName')} className={field} aria-invalid={!!errors.fullName} />
          {errors.fullName && <p className={errCls} role="alert">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="ep-username" className={labelCls}>Username</label>
          <input id="ep-username" type="text" value={form.username} onChange={update('username')} className={field} aria-invalid={!!errors.username} />
          {errors.username && <p className={errCls} role="alert">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="ep-bio" className={labelCls}>Bio</label>
          <textarea id="ep-bio" value={form.bio} onChange={update('bio')} rows={3} className={`${field} resize-none`} aria-invalid={!!errors.bio} />
          <p className={`text-xs mt-1 ${form.bio.length > 150 ? 'text-danger' : 'text-ink-faint'}`}>{form.bio.length}/150</p>
          {errors.bio && <p className={errCls} role="alert">{errors.bio}</p>}
        </div>

        <div>
          <label htmlFor="ep-website" className={labelCls}>Website</label>
          <input id="ep-website" type="text" value={form.website} onChange={update('website')} placeholder="example.com" className={field} aria-invalid={!!errors.website} />
          {errors.website && <p className={errCls} role="alert">{errors.website}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="ep-pronouns" className={labelCls}>Pronouns</label>
            <input id="ep-pronouns" type="text" value={form.pronouns} onChange={update('pronouns')} placeholder="e.g. she/her" className={field} />
          </div>
          <div>
            <label htmlFor="ep-gender" className={labelCls}>Gender</label>
            <select id="ep-gender" value={form.gender} onChange={update('gender')} className={field}>
              <option>Prefer not to say</option>
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary</option>
              <option>Custom</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" size="lg">Save changes</Button>
        </div>
      </form>
    </div>
  )
}
