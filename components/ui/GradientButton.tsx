interface GradientButtonProps {
  children:  React.ReactNode
  href?:     string
  onClick?:  () => void
  type?:     'button' | 'submit' | 'reset'
  className?: string
  fullWidth?: boolean
  external?:  boolean
}

export default function GradientButton({
  children,
  href,
  onClick,
  type = 'button',
  className = '',
  fullWidth = false,
  external = false,
}: GradientButtonProps): JSX.Element {
  const base = `gradient-bg text-black font-bold rounded-full px-8 py-4 transition-transform hover:scale-105 inline-flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''} ${className}`

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
          {children}
        </a>
      )
    }
    // internal link handling would go here, maybe importing next/link
    // The spec just says use <a> but using next/link would be better for internal
    return (
      <a href={href} className={base}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {children}
    </button>
  )
}
