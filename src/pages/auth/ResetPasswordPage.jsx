import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout, { authField, authLabel, authError } from './AuthLayout.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (form.password.length < 8) errs.password = 'Use at least 8 characters.'
    if (form.confirm !== form.password) errs.confirm = 'Passwords don’t match.'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setDone(true)
    setTimeout(() => navigate('/login'), 1400)
  }

  return (
    <AuthLayout
      title="Create a new password"
      subtitle="Your new password must be different from previous passwords."
      footer={
        <Link to="/login" className="font-semibold text-accent hover:text-accent-deep">Back to login</Link>
      }
    >
      {done ? (
        <div role="status" className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-800 text-sm font-medium rounded-xl px-4 py-3 animate-slide-up">
          <Icon name="check" size={18} /> Password updated. Taking you to login…
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4">
          <div>
            <label htmlFor="rp-password" className={authLabel}>New password</label>
            <div className="relative">
              <input
                id="rp-password"
                type={show ? 'text' : 'password'}
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className={`${authField} pr-11`}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
              >
                <Icon name={show ? 'eyeOff' : 'eye'} size={19} />
              </button>
            </div>
            {errors.password && <p className={authError} role="alert">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="rp-confirm" className={authLabel}>Confirm password</label>
            <input
              id="rp-confirm"
              type={show ? 'text' : 'password'}
              autoComplete="new-password"
              value={form.confirm}
              onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
              className={authField}
              aria-invalid={!!errors.confirm}
            />
            {errors.confirm && <p className={authError} role="alert">{errors.confirm}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full">Reset password</Button>
        </form>
      )}
    </AuthLayout>
  )
}
