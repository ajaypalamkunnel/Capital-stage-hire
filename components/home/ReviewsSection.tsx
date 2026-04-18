import { Quote } from 'lucide-react'
import StarRating from '@/components/ui/StarRating'
import SectionTitle from '@/components/ui/SectionTitle'
import type { Review } from '@/types/database'

const reviews: Review[] = [
  {
    name:     'Sarah Mitchell',
    location: 'Parramatta, Sydney',
    rating:   5,
    text:     'Capital Stage Hire made our wedding absolutely perfect. The Tiffany chairs and floral arch were stunning. Delivery was on time and the team was incredibly helpful.',
    event:    'Wedding Reception',
    date:     'March 2024',
  },
  {
    name:     'James Nguyen',
    location: 'Bankstown, Sydney',
    rating:   5,
    text:     'Used them for our corporate gala dinner. 200 chairs, 20 tables, full lighting setup — everything was flawless. Will definitely book again.',
    event:    'Corporate Gala',
    date:     'February 2024',
  },
  {
    name:     'Priya Sharma',
    location: 'Blacktown, Sydney',
    rating:   5,
    text:     "Booked the fairy lights and curtain backdrop for my daughter's 18th. The setup looked incredible. Very professional and affordable.",
    event:    'Birthday Party',
    date:     'January 2024',
  },
  {
    name:     'David Thompson',
    location: 'Liverpool, Sydney',
    rating:   5,
    text:     "Great range of products and super easy to deal with over WhatsApp. They helped me plan the whole setup for my wife's surprise party. Highly recommend.",
    event:    'Surprise Party',
    date:     'December 2023',
  },
  {
    name:     'Angela Russo',
    location: 'Campbelltown, Sydney',
    rating:   4,
    text:     'Really happy with the staging and podium hire for our community event. Solid quality, fair price. Pickup and return was straightforward.',
    event:    'Community Event',
    date:     'November 2023',
  },
]

export default function ReviewsSection(): JSX.Element {
  return (
    <section className="py-24 bg-surface2 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          eyebrow="Testimonials" 
          title="What Our Clients Say" 
          center 
        />

        <div className="flex overflow-x-auto hide-scrollbar pb-8 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:pb-0 md:mx-0 md:px-0 gap-6">
          {reviews.map((review, idx) => (
            <div 
              key={idx} 
              className="min-w-[300px] md:min-w-0 snap-center bg-[#1a1a1a] border border-[#2a2a2a] p-8 rounded-2xl flex flex-col relative"
            >
              <Quote className="absolute top-6 right-6 text-gold opacity-20" size={48} />
              
              <div className="mb-6 flex justify-between items-start">
                <StarRating rating={review.rating} size={18} />
                <span className="text-xs font-bold px-3 py-1 bg-[#252525] text-gold rounded-full">
                  {review.event}
                </span>
              </div>
              
              <p className="text-white italic leading-relaxed mb-8 flex-grow">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center font-bold text-black text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold">{review.name}</div>
                  <div className="text-muted text-sm">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
