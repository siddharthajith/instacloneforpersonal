import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout, { authField, authLabel, authError } from './AuthLayout.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter the email linked to your account.')
      return
    }
    setError('')
    setSent(true)
    setTimeout(() => navigate('/verify', { state: { email } }), 1200)
  }

  return (
    <AuthLayout
      title="Trouble logging in?"
      subtitle="Enter your email and we’ll send you a code to get back into your account."
      footer={
        <Link to="/login" className="font-semibold text-accent hover:text-accent-deep">Back to login</Link>
      }
    >
      {sent ? (
        <div role="status" className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-800 text-sm font-medium rounded-xl px-4 py-3 animate-slide-up">
          <Icon name="check" size={18} /> Code sent. Redirecting…
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4">
          <div>
            <label htmlFor="fp-email" className={authLabel}>Email</label>
            <input
              id="fp-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={authField}
              aria-invalid={!!error}
            />
            {error && <p className={authError} role="alert">{error}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full">Send reset code</Button>
        </form>
      )}
    </AuthLayout>
  )
}
