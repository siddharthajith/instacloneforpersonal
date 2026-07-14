import { useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthLayout, { authError } from './AuthLayout.jsx'
import Button from '../../components/ui/Button.jsx'

export default function VerifyPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || 'your email'
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const refs = useRef([])

  const setDigit = (i, value) => {
    const v = value.replace(/\D/g, '').slice(-1)
    setDigits((d) => {
      const next = [...d]
      next[i] = v
      return next
    })
    if (v && i < 5) refs.current[i + 1]?.focus()
  }

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus()
  }

  const submit = (e) => {
    e.preventDefault()
    if (digits.some((d) => !d)) {
      setError('Enter the full 6-digit code.')
      return
    }
    setError('')
    navigate('/reset-password')
  }

  return (
    <AuthLayout
      title="Enter the confirmation code"
      subtitle={`We sent a 6-digit code to ${email}. It expires in 10 minutes.`}
      footer={
        <Link to="/login" className="font-semibold text-accent hover:text-accent-deep">Back to login</Link>
      }
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        <div className="flex justify-center gap-2" role="group" aria-label="6-digit verification code">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el }}
              type="text"
              inputMode="numeric"
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              aria-label={`Digit ${i + 1}`}
              className="size-12 text-center text-lg font-bold border border-line-strong rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            />
          ))}
        </div>
        {error && <p className={`${authError} text-center`} role="alert">{error}</p>}
        <Button type="submit" size="lg" className="w-full">Verify</Button>
        <p className="text-center text-sm text-ink-faint">
          Didn’t get it?{' '}
          <button type="button" onClick={() => setDigits(['', '', '', '', '', ''])} className="font-semibold text-accent hover:text-accent-deep">
            Resend code
          </button>
        </p>
      </form>
    </AuthLayout>
  )
}
