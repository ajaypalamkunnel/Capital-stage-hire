export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function truncate(text: string | null | undefined, length: number = 100): string {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

export function getWhatsAppUrl(phone: string, productName?: string | null): string {
  const base = `https://wa.me/${phone}`
  if (!productName) {
    return `${base}?text=${encodeURIComponent("Hi, I'd like to get a quote for my event.")}`
  }
  return `${base}?text=${encodeURIComponent(`Hi, I'm interested in hiring "${productName}". Could you please share availability and pricing?`)}`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getImagePath(publicUrl: string): string {
  return publicUrl.split('/product-images/')[1] ?? ''
}
