interface StatItem {
  value: string
  label: string
}

const stats: StatItem[] = [
  { value: '500+', label: 'Events Completed'   },
  { value: '50+',  label: 'Products Available' },
  { value: '8+',   label: 'Years Experience'   },
  { value: '4.9★', label: 'Average Rating'     },
]

export default function StatsSection(): JSX.Element {
  return (
    <section className="bg-black py-16 relative z-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="relative bg-gradient-to-br from-[#1a1a1a]/60 to-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 text-center overflow-hidden group hover:border-[#f8be1e]/30 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-t from-[#f8be1e]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 font-montserrat font-black text-4xl md:text-5xl lg:text-5xl bg-gradient-to-br from-white to-white/60 text-transparent bg-clip-text mb-3 tracking-tight group-hover:scale-105 transition-transform duration-500">
                {stat.value}
              </div>
              <div className="relative z-10 text-white/50 font-bold text-xs md:text-sm uppercase tracking-[0.15em] group-hover:text-gold transition-colors duration-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
