// ── Raw database row types ────────────────────────────────

export interface Category {
  id:            string
  name:          string
  slug:          string
  description:   string | null
  is_active:     boolean
  display_order: number
  created_at:    string
  updated_at:    string
}

export interface Product {
  id:            string
  category_id:   string | null
  name:          string
  slug:          string
  description:   string | null
  image_urls:    string[]
  is_visible:    boolean
  display_order: number
  created_at:    string
  updated_at:    string
}

// ── Joined types (when selecting with relations) ──────────

export interface ProductWithCategory extends Product {
  categories: Pick<Category, 'name' | 'slug'> | null
}

// ── Insert / Update payload types ─────────────────────────

export interface ProductInsert {
  name:          string
  slug:          string
  description:   string
  category_id:   string
  image_urls:    string[]
  is_visible:    boolean
  display_order: number
}

export interface CategoryInsert {
  name:          string
  slug:          string
  description:   string
  display_order: number
}

// ── Component prop types ───────────────────────────────────

export interface Review {
  name:     string
  location: string
  rating:   number
  text:     string
  event:    string
  date:     string
}

export interface Stat {
  value: string
  label: string
}

// ── Form state types ───────────────────────────────────────

export interface ProductFormState {
  name:          string
  slug:          string
  description:   string
  category_id:   string
  is_visible:    boolean
  display_order: number
}

export interface ContactFormState {
  name:       string
  email:      string
  phone:      string
  event_type: string
  message:    string
}

export type ContactFormStatus =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error'
