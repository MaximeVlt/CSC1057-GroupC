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

const READ_KEY = 'smart-campus-read-announcements'

// Ids of the announcements this user has already opened (kept in the browser).
export function loadReadIds(): Set<string> {
  try {
    const saved = localStorage.getItem(READ_KEY)
    if (saved) return new Set(JSON.parse(saved) as string[])
  } catch {
    // storage unavailable, fall back to sample data flags
  }
  return new Set(sampleAnnouncements.filter((a) => a.read).map((a) => String(a.id)))
}

export function saveReadIds(ids: Set<string>) {
  try {
    localStorage.setItem(READ_KEY, JSON.stringify([...ids]))
  } catch {
    // ignore storage errors
  }
}

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

// Staff only: the API checks the Cognito access token and the "staff" group.
export async function createAnnouncement(input: NewAnnouncement, accessToken: string): Promise<Announcement> {
  if (!API_URL) throw new Error('The announcements API is not configured (VITE_ANNOUNCEMENTS_API_URL).')
  const res = await fetch(`${API_URL}/announcements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(input),
  })
  if (res.status === 401) throw new Error('Your session has expired. Please sign out and sign in again.')
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.error ?? `Request failed (HTTP ${res.status})`)
  return body as Announcement
}
