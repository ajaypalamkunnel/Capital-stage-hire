interface SectionTitleProps {
  eyebrow?:  string
  title:     string
  subtitle?: string
  center?:   boolean
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
}: SectionTitleProps): JSX.Element {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className="text-gold font-bold inline-block mb-3 uppercase tracking-wider text-sm">
          {eyebrow}
        </span>
      )}
      <h2 className="font-montserrat font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-muted text-lg max-w-3xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
