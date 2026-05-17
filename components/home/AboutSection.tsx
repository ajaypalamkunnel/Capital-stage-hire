import { CalendarDays, MapPin, PackageOpen, Award } from 'lucide-react'
import GradientButton from '@/components/ui/GradientButton'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function AboutSection() {
  return (
    <section className="py-24 bg-black relative" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Featured Highlights Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[
              { icon: CalendarDays, title: 'Est. 2016', desc: 'Years of trust' },
              { icon: MapPin, title: 'Canberra Australia ACT Wide', desc: 'We deliver everywhere' },
              { icon: PackageOpen, title: '50+ Items', desc: 'Extensive inventory' },
              { icon: Award, title: '500+ Events', desc: 'Successfully completed' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-surface2 border border-border p-6 rounded-3xl group hover:border-gold/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-6 group-hover:gradient-bg transition-colors">
                  <feature.icon className="text-gold group-hover:text-black transition-colors" size={24} />
                </div>
                <h4 className="text-white font-bold text-xl mb-2">{feature.title}</h4>
                <p className="text-muted text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Right Column - Content */}
          <div>
            <span className="text-gold font-bold inline-block mb-3 uppercase tracking-wider text-sm">
              About Us
            </span>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
              Crafting Memorable Experiences Since 2016
            </h2>
            
            <p className="text-muted text-lg mb-6 leading-relaxed">
              Based in the heart of Canberra Australia ACT, Capital Stage Hire has grown from a humble chair rental service into one of Canberra Australia ACT's premier event suppliers. We understand that every event is unique and deeply personal.
            </p>
            
            <p className="text-muted text-lg mb-8 leading-relaxed">
              Whether you're planning an intimate backyard wedding, a milestone birthday party, or a large-scale corporate gala, our expanding inventory and dedicated team ensure your vision comes to life exactly as you imagined.
            </p>

            <ul className="mb-10 space-y-4">
              {[
                'Immaculately maintained equipment',
                'Punctual and professional delivery team',
                'Transparent pricing with no hidden fees',
                'Flexible booking and cancellation policies',
              ].map((value, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full gradient-bg flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">{value}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <GradientButton href="/#contact">Contact Our Team</GradientButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
