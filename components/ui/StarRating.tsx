import { Star } from 'lucide-react'

interface StarRatingProps {
  rating:  number   // 1–5
  size?:   number   // px, default 16
}

export default function StarRating({
  rating,
  size = 16,
}: StarRatingProps): JSX.Element {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'text-gold fill-gold' : 'text-gray-600'}
        />
      ))}
    </div>
  )
}
