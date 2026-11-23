import { announcements as sampleAnnouncements } from '../data/announcements'

export type Announcement = {
  id: string
  title: string
  message: string
  source: string
  createdAt?: string
}

export type NewAnnouncement = {
  title: string
  message: string
  source: string
}

// Set in .env.local (dev) or Amplify environment variables (prod).
// Output "AnnouncementsApiUrl" of the backend/announcements stack.
const API_URL = import.meta.env.VITE_ANNOUNCEMENTS_API_URL?.replace(/\/$/, '')

export const isApiConfigured = Boolean(API_URL)

const fallback: Announcement[] = sampleAnnouncements.map((a) => ({
  id: String(a.id),
  title: a.title,
  message: a.message,
  source: a.source,
}))

// Returns the announcements from the API, or the sample data if the API
// is not configured or cannot be reached, so the page always shows something.
export async function fetchAnnouncements(): Promise<{ items: Announcement[]; live: boolean }> {
  if (!API_URL) return { items: fallback, live: false }
  try {
    const res = await fetch(`${API_URL}/announcements`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return { items: (await res.json()) as Announcement[], live: true }
  } catch (err) {
    console.error('Could not load announcements from the API', err)
    return { items: fallback, live: false }
  }
}

export async function createAnnouncement(input: NewAnnouncement): Promise<Announcement> {
  if (!API_URL) throw new Error('The announcements API is not configured (VITE_ANNOUNCEMENTS_API_URL).')
  const res = await fetch(`${API_URL}/announcements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.error ?? `Request failed (HTTP ${res.status})`)
  return body as Announcement
}
