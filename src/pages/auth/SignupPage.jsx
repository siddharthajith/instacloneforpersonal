import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout, { authField, authLabel, authError } from './AuthLayout.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { useApp } from '../../context/AppContext.jsx'

export default function SignupPage() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', fullName: '', username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (!form.fullName.trim()) errs.fullName = 'Enter your full name.'
    if (!form.username.trim()) errs.username = 'Choose a username.'
    else if (!/^[a-z0-9._]+$/i.test(form.username)) errs.username = 'Only letters, numbers, dots and underscores.'
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSubmitting(true)
    setTimeout(() => {
      login()
      navigate('/glimpse')
    }, 700)
  }

  return (
    <AuthLayout
      subtitle="Sign up to share the moments that matter with people who get it."
      footer={
        <>
          Have an account?{' '}
          <Link to="/login" className="font-semibold text-accent hover:text-accent-deep">Log in</Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="space-y-4">
        {[
          ['email', 'Email', 'email', 'email'],
          ['fullName', 'Full name', 'text', 'name'],
          ['username', 'Username', 'text', 'username'],
        ].map(([key, label, type, autoComplete]) => (
          <div key={key}>
            <label htmlFor={`su-${key}`} className={authLabel}>{label}</label>
            <input
              id={`su-${key}`}
              type={type}
              autoComplete={autoComplete}
              value={form[key]}
              onChange={update(key)}
              className={authField}
              aria-invalid={!!errors[key]}
            />
            {errors[key] && <p className={authError} role="alert">{errors[key]}</p>}
          </div>
        ))}
        <div>
          <label htmlFor="su-password" className={authLabel}>Password</label>
          <div className="relative">
            <input
              id="su-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={form.password}
              onChange={update('password')}
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

        <p className="text-xs text-ink-faint leading-relaxed">
          By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
        </p>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Sign up'}
        </Button>
      </form>
    </AuthLayout>
  )
}
