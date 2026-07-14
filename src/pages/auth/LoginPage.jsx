import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout, { authField, authLabel, authError } from './AuthLayout.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { useApp } from '../../context/AppContext.jsx'

export default function LoginPage() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ identity: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.identity.trim()) errs.identity = 'Enter your username or email.'
    if (!form.password) errs.password = 'Enter your password.'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSubmitting(true)
    setTimeout(() => {
      login(form.identity)
      navigate('/')
    }, 700)
  }

  return (
    <AuthLayout
      footer={
        <>
          Don’t have an account?{' '}
          <Link to="/signup" className="font-semibold text-accent hover:text-accent-deep">Sign up</Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="space-y-4">
        <div>
          <label htmlFor="li-identity" className={authLabel}>Username or email</label>
          <input
            id="li-identity"
            type="text"
            autoComplete="username"
            value={form.identity}
            onChange={(e) => setForm((f) => ({ ...f, identity: e.target.value }))}
            className={authField}
            aria-invalid={!!errors.identity}
          />
          {errors.identity && <p className={authError} role="alert">{errors.identity}</p>}
        </div>
        <div>
          <label htmlFor="li-password" className={authLabel}>Password</label>
          <div className="relative">
            <input
              id="li-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className={`${authField} pr-11`}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
            >
              <Icon name={showPassword ? 'eyeOff' : 'eye'} size={19} />
            </button>
          </div>
          {errors.password && <p className={authError} role="alert">{errors.password}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Logging in…' : 'Log in'}
        </Button>

        <div className="flex items-center gap-3 text-xs text-ink-faint uppercase tracking-wide">
          <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
        </div>

        <div className="space-y-2.5">
          <Button variant="outline" className="w-full" onClick={() => {}}>
            <Icon name="globe" size={17} /> Continue with Google
          </Button>
          <Button variant="outline" className="w-full" onClick={() => {}}>
            <Icon name="smile" size={17} /> Continue with Apple
          </Button>
        </div>

        <p className="text-center">
          <Link to="/forgot-password" className="text-sm text-accent hover:text-accent-deep font-medium">
            Forgot password?
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
