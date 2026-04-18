'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageSquare, Loader2 } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import GradientButton from '@/components/ui/GradientButton'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import type { ContactFormState, ContactFormStatus } from '@/types/database'

const EVENT_TYPES = [
  'Wedding', 'Birthday', 'Corporate', 'Community', 'Other'
] as const

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormState>({
    name:       '',
    email:      '',
    phone:      '',
    event_type: '',
    message:    '',
  })

  const [status, setStatus] = useState<ContactFormStatus>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setStatus('submitting')
    // Simulate submission — show success message
    await new Promise(resolve => setTimeout(resolve, 800))
    setStatus('success')
  }

  return (
    <section className="py-24 bg-surface2 border-t border-border" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          eyebrow="Get In Touch" 
          title="Plan Your Next Event" 
          subtitle="Ready to hire? Have a question about our products? Reach out via WhatsApp for the fastest response, or use the email form below."
          center
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-border">
              <h3 className="text-white font-montserrat font-bold text-2xl mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#252525] flex items-center justify-center flex-shrink-0 text-gold">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">Phone / WhatsApp</div>
                    <a href="https://wa.me/+61493735612" className="text-muted hover:text-gold transition-colors">+61 493 735 612</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#252525] flex items-center justify-center flex-shrink-0 text-gold">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">Email</div>
                    <a href="mailto:info@capitalstagehire.com.au" className="text-muted hover:text-gold transition-colors">info@capitalstagehire.com.au</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#252525] flex items-center justify-center flex-shrink-0 text-gold">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">Location</div>
                    <a href="https://maps.app.goo.gl/4aMAoQ8fRKjixdoM6?g_st=aw" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold transition-colors">
                      Greater Sydney, NSW<br/>
                      <span className="text-xs text-gold">View on Maps</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#252525] flex items-center justify-center flex-shrink-0 text-gold">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">Business Hours</div>
                    <div className="text-muted">Mon - Sat: 9:00 AM - 6:00 PM<br/>Sun: By Appointment</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gradient-bg rounded-3xl p-8 shadow-xl flex flex-col items-center text-center">
              <MessageSquare size={40} className="text-black mb-4" />
              <h3 className="text-black font-montserrat font-black text-2xl mb-2">Fastest Response</h3>
              <p className="text-black/80 font-medium mb-6">Message us directly on WhatsApp for live support, quotes, and quick bookings.</p>
              <a 
                href="https://wa.me/+61493735612" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 w-full justify-center"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-border">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-montserrat font-bold text-white mb-4">Message Sent!</h3>
                <p className="text-muted text-lg max-w-sm mb-8">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <GradientButton onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', event_type: '', message: '' }) }}>
                  Send Another Message
                </GradientButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-white font-montserrat font-bold text-2xl mb-8">Send an Email Enquiry</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-muted">Full Name <span className="text-gold">*</span></label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted">Email Address <span className="text-gold">*</span></label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-muted">Phone Number <span className="text-gold">*</span></label>
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      placeholder="0400 000 000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="event_type" className="text-sm font-medium text-muted">Event Type</label>
                    <select
                      id="event_type"
                      name="event_type"
                      value={form.event_type}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none"
                    >
                      <option value="" disabled>Select event type</option>
                      {EVENT_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted">Message or Requirements <span className="text-gold">*</span></label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell us about your event and what you need..."
                  />
                </div>

                <GradientButton 
                  type="submit" 
                  fullWidth 
                  className={status === 'submitting' ? 'opacity-70 pointer-events-none' : ''}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    'Submit Enquiry'
                  )}
                </GradientButton>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
