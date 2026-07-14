import { LogoMark, WordMark } from '../../components/ui/Logo.jsx'

export const authField =
  'w-full border border-line-strong rounded-lg px-3.5 py-2.5 text-sm bg-card placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition'
export const authLabel = 'block text-sm font-semibold mb-1.5'
export const authError = 'text-xs text-danger mt-1'

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-10 bg-canvas">
      <main className="w-full max-w-[400px] animate-slide-up">
        <div className="bg-card border border-line rounded-2xl px-6 sm:px-9 py-9">
          <div className="flex flex-col items-center mb-7">
            <LogoMark size={48} />
            <WordMark className="text-[28px] mt-3" />
            {title && <h1 className="text-base font-semibold mt-4 text-center">{title}</h1>}
            {subtitle && <p className="text-sm text-ink-faint text-center mt-1.5 leading-relaxed">{subtitle}</p>}
          </div>
          {children}
        </div>
        {footer && (
          <div className="bg-card border border-line rounded-2xl px-6 py-5 mt-3 text-center text-sm">
            {footer}
          </div>
        )}
        <p className="text-center text-[11px] text-ink-faint mt-6 uppercase tracking-wide">© 2026 Glimpse Labs</p>
      </main>
    </div>
  )
}
